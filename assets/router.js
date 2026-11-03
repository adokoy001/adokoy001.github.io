/**
 * Tsuzuri hybrid navigation.
 *
 * Every URL remains a real static HTML document.  This module only enhances
 * eligible same-origin links; any unsupported page or failed request falls
 * back to an ordinary document navigation.
 */

const DEFAULTS = Object.freeze({
  mainSelector: '[data-tsuzuri-main], main',
  prefetch: 'hover',
  cacheSize: 20,
  viewTransitions: true,
  focusSelector: '[data-tsuzuri-focus], h1, main',
});

const MANAGED_HEAD = [
  'meta[name="description"]',
  'meta[name="robots"]',
  'meta[property^="og:"]',
  'meta[name^="twitter:"]',
  'link[rel="canonical"]',
  'link[rel="alternate"]',
];

function pageSupportsHybrid(doc) {
  const meta = doc.querySelector('meta[name="tsuzuri:navigation"]');
  const mode = doc.documentElement.dataset.tsuzuriNavigation
    || doc.body?.dataset.tsuzuriNavigation
    || meta?.content;
  // Only pages generated for this protocol opt in. Ordinary same-origin HTML
  // (including raw games and static documents) must retain native navigation
  // so its own scripts and document lifecycle execute.
  return String(mode || '').toLowerCase() === 'hybrid';
}

function cloneNodeIntoDocument(node) {
  return document.importNode(node, true);
}

export function syncDocumentHead(nextDocument) {
  document.title = nextDocument.title;
  for (const selector of MANAGED_HEAD) {
    document.head.querySelectorAll(selector).forEach((node) => node.remove());
    nextDocument.head.querySelectorAll(selector).forEach((node) => {
      document.head.append(cloneNodeIntoDocument(node));
    });
  }
  document.documentElement.lang = nextDocument.documentElement.lang || '';
}

function copyPageBodyState(nextBody) {
  document.body.className = nextBody.className;
  for (const attribute of Array.from(document.body.attributes)) {
    if (attribute.name.startsWith('data-page-')) {
      document.body.removeAttribute(attribute.name);
    }
  }
  for (const attribute of Array.from(nextBody.attributes)) {
    if (attribute.name.startsWith('data-page-')) {
      document.body.setAttribute(attribute.name, attribute.value);
    }
  }
}

function connectionAllowsPrefetch() {
  const connection = navigator.connection
    || navigator.mozConnection
    || navigator.webkitConnection;
  if (!connection) return true;
  if (connection.saveData) return false;
  return !/^(?:slow-)?2g$/i.test(connection.effectiveType || '');
}

function normalClick(event) {
  return event.button === 0
    && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey;
}

function eligibleAnchor(anchor, currentURL = new URL(location.href)) {
  if (!anchor || anchor.hasAttribute('download')) return null;
  if (anchor.dataset.tsuzuriDocument !== undefined
      || anchor.dataset.tsuzuriRouter === 'off') return null;
  const target = (anchor.getAttribute('target') || '').toLowerCase();
  if (target && target !== '_self') return null;
  const raw = anchor.getAttribute('href');
  if (!raw || raw.startsWith('#')) return null;

  let url;
  try { url = new URL(raw, currentURL); } catch (_) { return null; }
  if (url.origin !== location.origin || !/^https?:$/.test(url.protocol)) return null;
  if (url.username || url.password) return null;
  if (url.pathname === currentURL.pathname
      && url.search === currentURL.search
      && url.hash) return null;
  return url;
}

function createAnnouncer() {
  let region = document.querySelector('[data-tsuzuri-announcer]');
  if (region) return region;
  region = document.createElement('div');
  region.dataset.tsuzuriAnnouncer = '';
  region.setAttribute('role', 'status');
  region.setAttribute('aria-live', 'polite');
  region.setAttribute('aria-atomic', 'true');
  Object.assign(region.style, {
    position: 'fixed', width: '1px', height: '1px', overflow: 'hidden',
    clipPath: 'inset(50%)', whiteSpace: 'nowrap',
  });
  document.body.append(region);
  return region;
}

export class HybridRouter {
  constructor(options = {}) {
    this.options = { ...DEFAULTS, ...options };
    this.cache = new Map();
    this.controller = null;
    this.navigationSequence = 0;
    this.started = false;
    this.announcer = null;
    this.onClick = this.onClick.bind(this);
    this.onPopState = this.onPopState.bind(this);
    this.onPrefetchIntent = this.onPrefetchIntent.bind(this);
  }

  start() {
    if (this.started) return this;
    this.started = true;
    this.announcer = createAnnouncer();
    history.scrollRestoration = 'manual';
    history.replaceState({
      ...(history.state || {}), tsuzuri: true, url: location.href,
      scrollX: scrollX, scrollY: scrollY,
    }, '', location.href);
    document.addEventListener('click', this.onClick);
    window.addEventListener('popstate', this.onPopState);
    if (this.options.prefetch !== 'none' && connectionAllowsPrefetch()) {
      document.addEventListener('pointerover', this.onPrefetchIntent, { passive: true });
      document.addEventListener('focusin', this.onPrefetchIntent);
      if (this.options.prefetch === 'visible' && 'IntersectionObserver' in window) {
        this.observeVisibleLinks();
      }
    }
    return this;
  }

  stop() {
    if (!this.started) return;
    this.started = false;
    this.navigationSequence += 1;
    this.controller?.abort();
    document.removeEventListener('click', this.onClick);
    window.removeEventListener('popstate', this.onPopState);
    document.removeEventListener('pointerover', this.onPrefetchIntent);
    document.removeEventListener('focusin', this.onPrefetchIntent);
    this.intersectionObserver?.disconnect();
  }

  onClick(event) {
    if (event.defaultPrevented || !normalClick(event)) return;
    const anchor = event.target.closest?.('a[href]');
    const url = eligibleAnchor(anchor);
    if (!url) return;
    event.preventDefault();
    this.navigate(url, { history: 'push' });
  }

  onPopState(event) {
    this.navigate(new URL(location.href), {
      history: 'none',
      restore: event.state && {
        x: Number(event.state.scrollX) || 0,
        y: Number(event.state.scrollY) || 0,
      },
    });
  }

  onPrefetchIntent(event) {
    const anchor = event.target.closest?.('a[href]');
    const url = eligibleAnchor(anchor);
    if (url) this.prefetch(url);
  }

  observeVisibleLinks() {
    this.intersectionObserver?.disconnect();
    this.intersectionObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const url = eligibleAnchor(entry.target);
        if (url) this.prefetch(url);
        this.intersectionObserver.unobserve(entry.target);
      }
    }, { rootMargin: '180px' });
    document.querySelectorAll('a[href]').forEach((anchor) => {
      if (eligibleAnchor(anchor)) this.intersectionObserver.observe(anchor);
    });
  }

  rememberScroll() {
    history.replaceState({
      ...(history.state || {}), tsuzuri: true, url: location.href,
      scrollX: scrollX, scrollY: scrollY,
    }, '', location.href);
  }

  async fetchDocument(url, signal) {
    const key = url.href;
    if (this.cache.has(key)) return this.cache.get(key);
    const response = await fetch(key, {
      signal,
      credentials: 'same-origin',
      headers: { 'X-Tsuzuri-Navigation': 'hybrid' },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const type = response.headers.get('content-type') || '';
    if (type && !/text\/html|application\/xhtml\+xml/i.test(type)) {
      throw new Error(`Not an HTML document: ${type}`);
    }
    const text = await response.text();
    const doc = new DOMParser().parseFromString(text, 'text/html');
    if (!doc.querySelector(this.options.mainSelector)) {
      throw new Error('Destination has no Tsuzuri main element');
    }
    this.cache.set(key, doc);
    while (this.cache.size > this.options.cacheSize) {
      this.cache.delete(this.cache.keys().next().value);
    }
    return doc;
  }

  prefetch(url) {
    if (!connectionAllowsPrefetch() || this.cache.has(url.href)) return;
    this.fetchDocument(url).catch(() => { this.cache.delete(url.href); });
  }

  async navigate(input, options = {}) {
    const sequence = ++this.navigationSequence;
    const url = input instanceof URL ? input : new URL(input, location.href);
    if (url.origin !== location.origin) {
      location.href = url.href;
      return;
    }
    if (options.history === 'push') this.rememberScroll();
    this.controller?.abort();
    this.controller = new AbortController();
    document.documentElement.dataset.tsuzuriLoading = '';
    document.dispatchEvent(new CustomEvent('tsuzuri:navigation-start', {
      detail: { url },
    }));

    try {
      const nextDocument = await this.fetchDocument(url, this.controller.signal);
      if (sequence !== this.navigationSequence) return;
      if (!pageSupportsHybrid(nextDocument)) {
        location.href = url.href;
        return;
      }
      const nextMain = nextDocument.querySelector(this.options.mainSelector);
      const currentMain = document.querySelector(this.options.mainSelector);
      if (!currentMain || !nextMain) throw new Error('Missing main element');

      const swap = () => {
        if (sequence !== this.navigationSequence) return;
        currentMain.replaceWith(cloneNodeIntoDocument(nextMain));
        syncDocumentHead(nextDocument);
        copyPageBodyState(nextDocument.body);
      };
      const canTransition = this.options.viewTransitions
        && !matchMedia('(prefers-reduced-motion: reduce)').matches
        && typeof document.startViewTransition === 'function';
      if (canTransition) {
        await document.startViewTransition(swap).finished;
      } else {
        swap();
      }
      if (sequence !== this.navigationSequence) return;

      if (options.history === 'push') {
        history.pushState({ tsuzuri: true, url: url.href, scrollX: 0, scrollY: 0 }, '', url);
      }
      this.afterNavigation(url, options.restore, sequence);
    } catch (error) {
      if (sequence !== this.navigationSequence) return;
      if (error?.name === 'AbortError') return;
      document.dispatchEvent(new CustomEvent('tsuzuri:navigation-error', {
        detail: { url, error },
      }));
      location.href = url.href;
    } finally {
      if (sequence === this.navigationSequence) {
        delete document.documentElement.dataset.tsuzuriLoading;
      }
    }
  }

  afterNavigation(url, restore, sequence) {
    if (this.options.prefetch === 'visible') this.observeVisibleLinks();
    requestAnimationFrame(() => {
      if (sequence !== this.navigationSequence) return;
      if (restore) {
        scrollTo(restore.x, restore.y);
      } else if (url.hash) {
        let identifier = url.hash.slice(1);
        try { identifier = decodeURIComponent(identifier); } catch (_) { /* Keep the literal hash. */ }
        const target = document.getElementById(identifier);
        target?.scrollIntoView();
      } else {
        scrollTo(0, 0);
      }
      const focus = document.querySelector(this.options.focusSelector);
      if (focus) {
        const hadTabindex = focus.hasAttribute('tabindex');
        if (!hadTabindex) focus.setAttribute('tabindex', '-1');
        focus.focus({ preventScroll: true });
        if (!hadTabindex) focus.addEventListener('blur', () => {
          focus.removeAttribute('tabindex');
        }, { once: true });
      }
      this.announcer.textContent = document.title;
    });
    document.dispatchEvent(new CustomEvent('tsuzuri:navigation-end', {
      detail: { url },
    }));
  }
}

export function bootHybridRouter(options = {}) {
  const router = new HybridRouter(options);
  return router.start();
}

function autoBoot() {
  const mode = document.documentElement.dataset.tsuzuriNavigation
    || document.body?.dataset.tsuzuriNavigation;
  if (mode === 'hybrid') window.tsuzuriRouter = bootHybridRouter();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', autoBoot, { once: true });
} else {
  autoBoot();
}

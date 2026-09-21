/** Optional static SPA route-data loader.  No server-side rewrite is needed:
 * each public route may still contain a small index.html shell. */

const DEFAULT_MANIFEST = '/_tsuzuri/routes.json';

function normalizePath(input) {
  const url = input instanceof URL ? input : new URL(input, location.href);
  let path = url.pathname;
  if (!path.endsWith('/')) path += '/';
  return path;
}

function announce(title) {
  let node = document.querySelector('[data-tsuzuri-spa-announcer]');
  if (!node) {
    node = document.createElement('span');
    node.dataset.tsuzuriSpaAnnouncer = '';
    node.setAttribute('role', 'status');
    node.setAttribute('aria-live', 'polite');
    node.hidden = true;
    document.body.append(node);
  }
  node.textContent = title;
}

export class StaticSPARouter {
  constructor(options = {}) {
    this.manifestURL = options.manifestURL || DEFAULT_MANIFEST;
    this.mainSelector = options.mainSelector || '[data-tsuzuri-main], main';
    this.routes = new Map();
    this.pages = new Map();
    this.navigationSequence = 0;
    this.started = false;
    this.onClick = this.onClick.bind(this);
    this.onPop = this.onPop.bind(this);
  }

  async start() {
    if (this.started) return this;
    this.started = true;
    const response = await fetch(this.manifestURL, { credentials: 'same-origin' });
    if (!response.ok) throw new Error(`Cannot load SPA manifest: ${response.status}`);
    const manifest = await response.json();
    const routes = manifest.routes || {};
    if (Array.isArray(routes)) {
      routes.forEach((route) => this.routes.set(normalizePath(route.path), route));
    } else {
      Object.keys(routes).forEach((path) => {
        const value = typeof routes[path] === 'string' ? { data: routes[path] } : routes[path];
        this.routes.set(normalizePath(path), value);
      });
    }
    document.addEventListener('click', this.onClick);
    window.addEventListener('popstate', this.onPop);
    const initial = this.routes.get(normalizePath(location.href));
    if (initial && document.documentElement.dataset.tsuzuriSpaHydrated !== 'true') {
      await this.navigate(new URL(location.href), { history: false, focus: false });
    }
    return this;
  }

  stop() {
    document.removeEventListener('click', this.onClick);
    window.removeEventListener('popstate', this.onPop);
    this.started = false;
  }

  onClick(event) {
    if (event.defaultPrevented || event.button !== 0
        || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = event.target.closest?.('a[href]');
    if (!anchor || anchor.hasAttribute('download') || anchor.dataset.tsuzuriDocument !== undefined) return;
    if (anchor.target && anchor.target !== '_self') return;
    const url = new URL(anchor.href, location.href);
    if (url.origin !== location.origin) return;
    const route = this.routes.get(normalizePath(url));
    if (!route || route.document) return;
    event.preventDefault();
    this.navigate(url, { history: true });
  }

  onPop() {
    this.navigate(new URL(location.href), { history: false });
  }

  async loadPage(route) {
    const source = route.data || route.url;
    if (!source) throw new Error('SPA route has no data URL');
    if (this.pages.has(source)) return this.pages.get(source);
    const response = await fetch(source, { credentials: 'same-origin' });
    if (!response.ok) throw new Error(`Cannot load SPA page: ${response.status}`);
    const page = await response.json();
    this.pages.set(source, page);
    return page;
  }

  async navigate(url, options = {}) {
    const sequence = ++this.navigationSequence;
    const route = this.routes.get(normalizePath(url));
    if (!route || route.document) {
      location.href = url.href;
      return;
    }
    document.documentElement.dataset.tsuzuriLoading = '';
    try {
      const page = await this.loadPage(route);
      if (sequence !== this.navigationSequence) return;
      const main = document.querySelector(this.mainSelector);
      if (!main) throw new Error('SPA shell has no main element');
      main.innerHTML = page.body_html || '';
      document.title = page.title || document.title;
      document.documentElement.lang = page.lang || document.documentElement.lang;
      const description = document.querySelector('meta[name="description"]');
      if (description && page.description !== undefined) description.content = page.description;
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical && page.canonical) canonical.href = page.canonical;
      document.body.className = page.body_class || '';
      if (options.history) history.pushState({ tsuzuri: true }, '', url);
      if (url.hash) {
        let identifier = url.hash.slice(1);
        try { identifier = decodeURIComponent(identifier); } catch (_) { /* Keep the literal hash. */ }
        document.getElementById(identifier)?.scrollIntoView();
      }
      else scrollTo(0, 0);
      if (options.focus !== false) {
        const focus = main.querySelector('[data-tsuzuri-focus], h1') || main;
        focus.setAttribute('tabindex', '-1');
        focus.focus({ preventScroll: true });
      }
      announce(document.title);
      document.dispatchEvent(new CustomEvent('tsuzuri:spa-page', { detail: { url, page } }));
    } catch (error) {
      if (sequence !== this.navigationSequence) return;
      document.dispatchEvent(new CustomEvent('tsuzuri:spa-error', { detail: { url, error } }));
      // A failed enhanced click can safely fall back to its complete static
      // document.  On initial shell hydration, reloading the same URL would
      // loop forever, so leave the shell's fallback content visible instead.
      if (options.history) location.href = url.href;
    } finally {
      if (sequence === this.navigationSequence) {
        delete document.documentElement.dataset.tsuzuriLoading;
      }
    }
  }
}

export async function bootStaticSPA(options = {}) {
  const router = new StaticSPARouter(options);
  await router.start();
  return router;
}

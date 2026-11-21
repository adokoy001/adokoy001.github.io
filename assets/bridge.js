/** Same-origin, capability-limited communication for framed applications. */

const CHANNEL = 'tsuzuri.bridge.v1';
let sequence = 0;

function parentOrigin() {
  try { return new URL(document.referrer).origin; } catch (_) { return location.origin; }
}

export class TsuzuriBridge {
  constructor(options = {}) {
    this.targetOrigin = options.parentOrigin || parentOrigin();
    this.token = options.token || '';
    this.timeout = Number(options.timeout || 5000);
    this.pending = new Map();
    this.listeners = new Map();
    this.onMessage = this.onMessage.bind(this);
    window.addEventListener('message', this.onMessage);
  }

  destroy() {
    window.removeEventListener('message', this.onMessage);
    for (const pending of this.pending.values()) pending.reject(new Error('Bridge closed'));
    this.pending.clear();
  }

  on(type, callback) {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type).add(callback);
    return () => this.listeners.get(type)?.delete(callback);
  }

  onMessage(event) {
    if (event.source !== window.parent) return;
    if (this.targetOrigin !== '*' && event.origin !== this.targetOrigin) return;
    const message = event.data;
    if (!message || message.channel !== CHANNEL || message.token !== this.token) return;
    if (message.kind === 'response' && this.pending.has(message.id)) {
      const pending = this.pending.get(message.id);
      this.pending.delete(message.id);
      clearTimeout(pending.timer);
      if (message.ok) pending.resolve(message.payload);
      else pending.reject(new Error(message.error || 'Bridge request failed'));
    } else if (message.kind === 'event') {
      this.listeners.get(message.type)?.forEach((callback) => callback(message.payload));
    }
  }

  request(type, payload = null) {
    if (window.parent === window) return Promise.reject(new Error('Not inside a frame'));
    const id = `${Date.now().toString(36)}-${(sequence += 1).toString(36)}`;
    const message = { channel: CHANNEL, kind: 'request', id, type, payload, token: this.token };
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`Bridge request timed out: ${type}`));
      }, this.timeout);
      this.pending.set(id, { resolve, reject, timer });
      window.parent.postMessage(message, this.targetOrigin);
    });
  }

  ready(details = {}) { return this.request('ready', details); }
  save(slot, data) { return this.request('save', { slot, data }); }
  load(slot) { return this.request('load', { slot }); }
  removeSave(slot) { return this.request('remove_save', { slot }); }
  fullscreen() { return this.request('fullscreen'); }
  exitFullscreen() { return this.request('exit_fullscreen'); }
  close() { return this.request('close'); }
  achievement(id, details = {}) { return this.request('achievement', { id, ...details }); }
  context() { return this.request('get_context'); }
}

function safeStorageKey(appId, slot) {
  const clean = String(slot ?? 'default').replace(/[^A-Za-z0-9_.-]/g, '_').slice(0, 80);
  return `tsuzuri:${appId}:save:${clean}`;
}

export function createBridgeHost(iframe, options = {}) {
  if (!iframe?.contentWindow) throw new Error('Bridge host requires an iframe');
  const appId = options.appId || iframe.dataset.tsuzuriApp || 'app';
  const expectedOrigin = options.origin || location.origin;
  const allowOpaque = Boolean(options.allowOpaqueOrigin);
  const token = options.token || iframe.dataset.tsuzuriBridgeToken || '';
  const maxSaveBytes = Number(options.maxSaveBytes || 1024 * 1024);

  async function handle(type, payload) {
    switch (type) {
      case 'ready': return { appId, version: 1 };
      case 'save': {
        const encoded = JSON.stringify(payload?.data ?? null);
        if (encoded.length > maxSaveBytes) throw new Error('Save data is too large');
        localStorage.setItem(safeStorageKey(appId, payload?.slot), encoded);
        return { saved: true };
      }
      case 'load': {
        const encoded = localStorage.getItem(safeStorageKey(appId, payload?.slot));
        return encoded === null ? null : JSON.parse(encoded);
      }
      case 'remove_save':
        localStorage.removeItem(safeStorageKey(appId, payload?.slot));
        return { removed: true };
      case 'fullscreen':
        if (!iframe.requestFullscreen) throw new Error('Fullscreen is unavailable');
        await iframe.requestFullscreen();
        return { fullscreen: true };
      case 'exit_fullscreen':
        if (document.fullscreenElement) await document.exitFullscreen();
        return { fullscreen: false };
      case 'close':
      case 'achievement':
        iframe.dispatchEvent(new CustomEvent(`tsuzuri:${type}`, { detail: payload }));
        return { accepted: true };
      case 'get_context':
        return {
          lang: document.documentElement.lang,
          theme: document.documentElement.dataset.theme || '',
          volume: Number(localStorage.getItem('tsuzuri:volume') ?? 1),
        };
      default:
        throw new Error(`Unsupported bridge request: ${type}`);
    }
  }

  async function onMessage(event) {
    if (event.source !== iframe.contentWindow) return;
    if (event.origin !== expectedOrigin && !(allowOpaque && event.origin === 'null')) return;
    const message = event.data;
    if (!message || message.channel !== CHANNEL || message.kind !== 'request'
        || message.token !== token) return;
    const response = { channel: CHANNEL, kind: 'response', id: message.id, token };
    try {
      response.payload = await handle(message.type, message.payload);
      response.ok = true;
    } catch (error) {
      response.ok = false;
      response.error = error instanceof Error ? error.message : String(error);
    }
    event.source.postMessage(response, event.origin === 'null' ? '*' : event.origin);
  }

  window.addEventListener('message', onMessage);
  return {
    destroy() { window.removeEventListener('message', onMessage); },
    send(type, payload) {
      iframe.contentWindow.postMessage({
        channel: CHANNEL, kind: 'event', type, payload, token,
      }, allowOpaque ? '*' : expectedOrigin);
    },
  };
}

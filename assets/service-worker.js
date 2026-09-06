/* Optional Tsuzuri offline worker.  The build emits the JSON manifest; this
 * source remains usable as-is and has no generated-code or npm step. */

const CACHE_PREFIX = 'tsuzuri-static-';
const params = new URL(self.location.href).searchParams;
const MANIFEST_URL = params.get('manifest') || '/_tsuzuri/sw-manifest.json';

async function loadManifest() {
  const response = await fetch(MANIFEST_URL, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Offline manifest HTTP ${response.status}`);
  return response.json();
}

function cacheName(manifest) {
  return CACHE_PREFIX + String(manifest.version || 'development').replace(/[^A-Za-z0-9_.-]/g, '_');
}

function responseAllowsRuntimeCache(response) {
  if (!response?.ok) return false;
  const directives = (response.headers.get('cache-control') || '')
    .toLowerCase().split(',').map((part) => part.trim());
  if (directives.some((part) => /^(?:no-store|no-cache|private)(?:\s|=|$)/.test(part))) {
    return false;
  }
  if (/\bno-cache\b/i.test(response.headers.get('pragma') || '')) return false;
  return (response.headers.get('vary') || '').trim() !== '*';
}

function isAuthoringURL(url) {
  const rawPath = url.pathname;
  if (rawPath === '/__tsuzuri' || rawPath.startsWith('/__tsuzuri/')) return true;

  let path = rawPath;
  // Tsuzuri's preview server URL-decodes the request path before routing, so
  // encoded spellings of the editor namespace must be excluded as well.
  try {
    path = decodeURIComponent(path);
  } catch (_) {
    // The Perl preview server replaces malformed UTF-8 after decoding %XX.
    // Decode the ASCII bytes needed to recognise the route even when a later
    // byte is malformed; non-ASCII bytes cannot form the reserved prefix.
    path = rawPath.replace(/%([0-9A-Fa-f]{2})/g, (match, hex) => {
      const byte = parseInt(hex, 16);
      return byte < 0x80 ? String.fromCharCode(byte) : '\uFFFD';
    });
  }
  return path === '/__tsuzuri' || path.startsWith('/__tsuzuri/');
}

async function activeCacheName() {
  const names = (await caches.keys()).filter((name) => name.startsWith(CACHE_PREFIX)).sort();
  return names[names.length - 1] || null;
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const manifest = await loadManifest();
    const cache = await caches.open(cacheName(manifest));
    const assets = Array.from(new Set([...(manifest.assets || []), manifest.offline].filter(Boolean)));
    await cache.addAll(assets);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const manifest = await loadManifest();
    const keep = cacheName(manifest);
    await Promise.all((await caches.keys())
      .filter((name) => name.startsWith(CACHE_PREFIX) && name !== keep)
      .map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  // The preview editor uses token-bearing URLs and explicitly marks every
  // response no-store. Leave the complete authoring namespace on the network:
  // cached keys and bodies are visible to other same-origin pages.
  if (url.origin === self.location.origin && isAuthoringURL(url)) return;
  if (request.method !== 'GET') return;
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        const name = await activeCacheName();
        if (name && responseAllowsRuntimeCache(response)) {
          const cache = await caches.open(name);
          cache.put(request, response.clone());
        }
        return response;
      } catch (_) {
        const cached = await caches.match(request, { ignoreSearch: false });
        if (cached) return cached;
        try {
          const manifest = await loadManifest();
          if (manifest.offline) {
            const offline = await caches.match(manifest.offline);
            if (offline) return offline;
          }
        } catch (_) { /* The network is already unavailable. */ }
        return new Response('Offline', {
          status: 503,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    const response = await fetch(request);
    if (responseAllowsRuntimeCache(response)) {
      const name = await activeCacheName();
      if (name) {
        const cache = await caches.open(name);
        cache.put(request, response.clone());
      }
    }
    return response;
  })());
});

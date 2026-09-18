# Tsuzuri browser runtime

These files are plain, standards-based ECMAScript. They require no npm,
transpiler, bundler, CDN, or third-party code.

- `router.js` progressively enhances complete HTML documents. Mark an internal
  link `data-tsuzuri-document`, or a destination document with
  `<meta name="tsuzuri:navigation" content="document">`, to force a normal
  navigation. Failed fetches also fall back to a normal navigation.
- `spa.js` optionally loads generated page JSON from
  `/_tsuzuri/routes.json`. A manifest route with `"document": true` leaves the
  SPA and opens its static HTML normally.
- `search.js` powers forms marked `data-tsuzuri-search` (and the default
  `.search-form`) from `/search-index.json`; it never injects index text as
  HTML.
- `bridge.js` offers an opt-in, capability-limited `postMessage` bridge between
  a framed bundle and its Tsuzuri page.
- `service-worker.js` reads `/_tsuzuri/sw-manifest.json` and provides optional
  versioned offline caching.

Hybrid mode is the default recommendation because every URL remains readable,
indexable, shareable, and usable without JavaScript.

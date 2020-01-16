// hack
declare var self: any; export {};

const APP_CACHE_NAME = "app-v1";
const CONTENTS_CACHE_NAME = "contents-v1";
const CONTENT_ASSETS_CACHE_NAME = "content-assets-v1";

const ACTIVE_CACHE_NAMES = [
  APP_CACHE_NAME,
  CONTENTS_CACHE_NAME,
  CONTENT_ASSETS_CACHE_NAME,
];

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (e: any) => {
  e.waitUntil((async () => {
    await self.clients.claim();

    const cacheNames = await caches.keys();

    await Promise.all(cacheNames.map(async cacheName => {
      if (ACTIVE_CACHE_NAMES.includes(cacheName)) return;
  
      await caches.delete(cacheName);
    }));
  })());
});

self.addEventListener("fetch", (e: any) => {
  const url = new URL(e.request.url);

  if (url.origin === location.origin) {
    // redirect "/" and "/posts/:id" to index.html
    // because these are on the same HTML file
    if (/^\/(posts\/[0-9a-z\-]+)?$/.test(url.pathname)) {
      return e.respondWith(networkFirst(new Request("/index.html"), APP_CACHE_NAME));
    }

    if (url.pathname.startsWith("/sockjs-node")) {
      return e.respondWith(fetch(e.request));
    }

    return e.respondWith(networkFirst(e.request, APP_CACHE_NAME));
  }

  if (url.origin === "https://cdn.contentful.com") {
    return e.respondWith(networkFirst(e.request, CONTENTS_CACHE_NAME));
  }

  if (url.origin === "https://images.ctfassets.net") {
    return e.respondWith(networkFirst(e.request, CONTENT_ASSETS_CACHE_NAME));
  }

  return e.respondWith(fetch(e.request));
});

async function networkFirst(request: Request, cacheName: string): Promise<Response> {
  const cache = await caches.open(cacheName);
  let response: Response | null = null;

  try {
    response = await fetch(request);

    await cache.put(request, response.clone());

    return response;
  } catch (err) {
    const cachedResponse = await cache.match(request);

    if (!cachedResponse) {
      throw new TypeError("Failed to fetch");
    }

    return cachedResponse;
  }
}



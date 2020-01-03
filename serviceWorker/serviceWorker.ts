// hack
declare var self: ServiceWorkerGlobalScope; export {};

const APP_CACHE_NAME = "app-v1";
const CONTENTS_CACHE_NAME = "contents-v1";
const CONTENT_ASSETS_CACHE_NAME = "content-assets-v1";

const SUPPORTED_CACHE_NAMES = [
  APP_CACHE_NAME,
  CONTENTS_CACHE_NAME,
  CONTENT_ASSETS_CACHE_NAME,
];

const APP_MODULE_URLS = [
  "/index.html",
  "/main.js",
  "/favicon.png",
  "/profile.jpg",
];

// TODO:
// this whitelist should be defined somewhere and shared with the webpack config
const CDN_MODULE_URLS = [
  "https://unpkg.com/contentful@7.10.0/dist/contentful.browser.min.js",
  "https://unpkg.com/intl-messageformat@5.4.3/dist/umd/intl-messageformat.min.js",
  "https://unpkg.com/react@16.12.0/umd/react.production.min.js",
  "https://unpkg.com/react-dom@16.12.0/umd/react-dom.production.min.js",
  "https://unpkg.com/react-markdown@4.2.2/umd/react-markdown.js",
  "https://unpkg.com/react-router-dom@5.1.2/umd/react-router-dom.min.js",
];

const WEB_FONT_URLS = [
  "https://fonts.googleapis.com/css?family=Source+Code+Pro:500&display=swap",
  "https://fonts.googleapis.com/css?family=Montserrat:400,400i,600,600i|Open+Sans:400,400i,700,700i&display=swap",
];

self.addEventListener("install", e => {
  self.skipWaiting();

  e.waitUntil((async () => {
    console.info("Installing the service worker...");

    // const cache = await caches.open(APP_CACHE_NAME);

    // console.info("Caching application files...");

    // await cache.addAll([
    //   ...APP_MODULE_URLS,
    //   ...CDN_MODULE_URLS,
    // ]);

    // fetching and caching JavaScript chunk files
    // trying to fetch from 0.js until the server responds 404
    // because the number of chunk files depend on how many import() are used in the application code
    // not using cache.add() because you cannot tell apart it failed by 404 or device's offline
    // for (let i = 0; i < 100; ++i) {
    //   const url = `/${i}.js`;
    //   const response = await fetch(url);

    //   if (!response.ok) break;

    //   cache.put(url, response);
    // }

    // for (const url of WEB_FONT_URLS) {
    //   const response = await fetch(url);
    //   const body = await response.clone().text();
    //   const match = /url\((https:\/\/.+\.com\/.+\..+)\)/g.exec(body);

    //   console.log(match);

    //   cache.put(url, response);
    // }

    // console.log("Retrieving");

    // console.info(`Cached application files!`);
    console.info("Completed installing the service worker!");
  })());
});

self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    console.info("Activating the service worker...");
    console.info("Deleting old-version caches...");

    for (const cacheName of await caches.keys()) {
      if (SUPPORTED_CACHE_NAMES.includes(cacheName)) continue;
  
      caches.delete(cacheName);
    }

    console.info("Completed activating the service worker!");
  })());
});

self.addEventListener("fetch", e => {
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

  if (url.origin === "https://unpkg.com") {
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



// https://developers.google.com/web/fundamentals/getting-started/your-first-progressive-web-app/?hl=en
// https://github.com/GoogleChrome/sw-precache
// https://github.com/GoogleChrome/samples
// http://stackoverflow.com/questions/34160509/options-for-testing-service-workers-via-http

// cacheName should be replaced with new one to get new files
const cacheName = 'narr?' + Date.now();
const filesToCache = 'SW_CACHE_TARGET'; // 'SW_CACHE_TARGET' will be replace by webpack

// install
self.addEventListener('install', e => {
  console.log('[ServiceWorker] ' + new Date().toString());

  e.waitUntil(self.caches.open(cacheName).then(cache => {
    console.log('[ServiceWorker] Caching app');
    return cache.addAll(filesToCache);
  }));

  if (typeof self.skipWaiting === 'function') {
    console.log('self.skipWaiting() is supported.');
    e.waitUntil(self.skipWaiting());
  } else {
    console.log('self.skipWaiting() is not supported.');
  }
});

// activate
self.addEventListener('activate', e => {
  console.log('[ServiceWorker] Activate');

  e.waitUntil(self.caches.keys().then(keyList => {
    return Promise.all(keyList.map(key => {
      if (key !== cacheName) {
        console.log('[ServiceWorker] Removing old cache', key);
        return self.caches.delete(key);
      }
    }));
  }));

  if (self.clients && typeof self.clients.claim === 'function') {
    console.log('self.clients.claim() is supported.');
    e.waitUntil(self.clients.claim());
  } else {
    console.log('self.clients.claim() is not supported.');
  }
});

// fetch
self.addEventListener('fetch', e => {
  console.log('[ServiceWorker] Fetch', e.request.url);

  const mainBundleUrl = '/js/main.bundle.js';
  if (e.request.url.indexOf(mainBundleUrl) > -1) {
    e.respondWith(self.fetch(e.request) // to get the latest service-worker.js
      .then(response => {
        return self.caches.open(cacheName).then(cache => {
          cache.put(e.request.url, response.clone());
          console.log('[ServiceWorker] Fetched&Cached Data');
          return response;
        });
      })
      .catch(err => {
        console.log('fetch error..!! and retrieve from cache..!!');
        // console.log(err);
        return self.caches.match(e.request).then(response => {
          return response || self.fetch(e.request); // if no cache, try fetching one more
        });
      })
    );
  } else {
    e.respondWith(self.caches.match(e.request).then(response => {
      return response || self.fetch(e.request);
    }));
  }
});

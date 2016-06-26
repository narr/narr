// https://developers.google.com/web/fundamentals/getting-started/your-first-progressive-web-app/?hl=en
// https://github.com/GoogleChrome/sw-precache
// https://github.com/GoogleChrome/samples
// http://stackoverflow.com/questions/34160509/options-for-testing-service-workers-via-http
// cacheName should be replaced with new one to get new files
var cacheName = 'narr?' + Date.now();
var filesToCache = [ '/narr/',
'/narr/asset/img/bg.jpg?3abf34b9f4f18da480ceb9fd4444d1fa',
'/narr/asset/img/ic/ics-skill-language.png?09d53db3bb6891c4bb6e394ca7f7b6ac',
'/narr/asset/img/ic/ics-skill-framework&library.png?4475ef0030b74221691718b1d04e136e',
'/narr/asset/img/ic/ics-skill-etc.png?f452a319446d2684984fa8cd54e2b5f7',
'/narr/asset/font/fontawesome-webfont.eot?25a32416abee198dd821b0b17a198a8f',
'/narr/asset/font/fontawesome-webfont.woff2?e6cf7c6ec7c2d6f670ae9d762604cb0b',
'/narr/asset/font/fontawesome-webfont.woff?c8ddf1e5e5bf3682bc7bebf30f394148',
'/narr/asset/font/fontawesome-webfont.ttf?1dc35d25e61d819a9c357074014867ab',
'/narr/asset/font/fontawesome-webfont.svg?d7c639084f684d66a1bc66855d193ed8',
'/narr/asset/img/event.github.jpg?bd18569dcffa8e9442f8cf9472dcd6e8',
'/narr/asset/img/event.innorix.jpg?ee01052affea0012565cf7d2b01169ae',
'/narr/asset/img/event.usoftation.jpg?329c314161a126994ed4733f2b549ba7',
'/narr/asset/img/event.cps-telecom.jpg?ba42b338f5ff828451d16832e25127d3',
'/narr/asset/img/ic/angular.png?cc593e1f662e467528ca87a7f40a491d',
'/narr/asset/img/ic/ic.narr.128x128.png?a583a9322c211144dde7384af3b38454',
'/narr/asset/img/ic/ic.narr.144x144.png?f11a4a7b8bb6d0dbad03f6706a30c331',
'/narr/asset/img/ic/ic.narr.152x152.png?a57be3a49d7bc6c753bed2eb473146aa',
'/narr/asset/img/ic/ic.narr.192x192.png?2b4e607a0375e1620b849200d2d0c72a',
'/narr/asset/img/ic/ic.narr.256x256.png?5e76e023ef7c724a60943e61b9237f7a',
'/narr/js/main.bundle.js?4f93b53481f108684e11',
'/narr/js/polyfills.bundle.js?809369a5e0952c967fad',
'/narr/js/vendor.bundle.js?0bcf218e4dd1cc79fd12',
'/narr/css/main.bundle.css?bd5c126a6137db44db599b471d94c8a9',
'/narr/css/vendor.bundle.css?34b5da880dc41623f3c6fe24818feb1c',
'/narr/index.html',
 ]; // 'SW_CACHE_TARGET' will be replace by webpack
// install
self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] ' + new Date().toString());
    e.waitUntil(self.caches.open(cacheName).then(function (cache) {
        console.log('[ServiceWorker] Caching app');
        return cache.addAll(filesToCache);
    }));
    if (typeof self.skipWaiting === 'function') {
        console.log('self.skipWaiting() is supported.');
        e.waitUntil(self.skipWaiting());
    }
    else {
        console.log('self.skipWaiting() is not supported.');
    }
});
// activate
self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(self.caches.keys().then(function (keyList) {
        return Promise.all(keyList.map(function (key) {
            if (key !== cacheName) {
                console.log('[ServiceWorker] Removing old cache', key);
                return self.caches.delete(key);
            }
        }));
    }));
    if (self.clients && typeof self.clients.claim === 'function') {
        console.log('self.clients.claim() is supported.');
        e.waitUntil(self.clients.claim());
    }
    else {
        console.log('self.clients.claim() is not supported.');
    }
});
// fetch
self.addEventListener('fetch', function (e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    var mainBundleUrl = '/js/main.bundle.js';
    if (e.request.url.indexOf(mainBundleUrl) > -1) {
        e.respondWith(self.fetch(e.request) // to get the latest service-worker.js
            .then(function (response) {
            return self.caches.open(cacheName).then(function (cache) {
                cache.put(e.request.url, response.clone());
                console.log('[ServiceWorker] Fetched&Cached Data');
                return response;
            });
        })
            .catch(function (err) {
            console.log('fetch error..!! and retrieve from cache..!!');
            // console.log(err);
            return self.caches.match(e.request).then(function (response) {
                return response || self.fetch(e.request); // if no cache, try fetching one more
            });
        }));
    }
    else {
        e.respondWith(self.caches.match(e.request).then(function (response) {
            return response || self.fetch(e.request);
        }));
    }
});

// 1466927165210
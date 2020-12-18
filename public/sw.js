var STATIC_CACHE_VERSION = 'static-v2'; 
var DYNAMIC_CACHE_VERSION = 'dynamic-v2'; 
// self = the service worker
self.addEventListener('install', function (event) {
    console.log('[Service Worker] Installing service worker ...'); 
    // this makes the code waits till the cache proccess reach the end.
    event.waitUntil(
        caches.open(STATIC_CACHE_VERSION) // creates the cache if not exists
        .then(function(cache) {
            console.log('[Server worker] precaching App Shell ...');
            cache.addAll([
                '/',
                '/index.html',
                '/src/js/app.js',
                '/src/js/feed.js',
                '/src/js/material.min.js',
                '/src/css/app.css',
                '/src/css/feed.css',
                '/src/images/main-image.jpg',
                'https://fonts.googleapis.com/css?family=Roboto:400,700',
                'https://fonts.googleapis.com/icon?family=Material+Icons',
                'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
            ]);
        })
    );
});
// A comment one
self.addEventListener('activate', function (event) {
    event.waitUntil( // wait untill async code is resolved
        caches
            .keys() // Get all the cache names.
            .then(keylist => {
                return Promise.all(keylist.map( key => {
                    // Check if the cache is current version.
                    if (key !== STATIC_CACHE_VERSION && key !== DYNAMIC_CACHE_VERSION) {
                        console.log('SW: removing old cache', key);
                        // Delete old cache.
                        caches.delete(key);
                    }
                }));
            })
    );
    // mybe will not be needed in future!!
    return self.clients.claim();
});
// None lifesycle event
self.addEventListener('fetch', function (event) {
    // we can control the response to each request using this method
   event.respondWith(
       caches
        .match(event.request)
        .then(response => {
            if (response) {
                return response;
            } else {
                return fetch(event.request)
                .then((res) => {
                    // Save the dynamic fetches in dynamic cache, not in static/basic one.
                    return caches.open(DYNAMIC_CACHE_VERSION).
                    then(cache => {
                        // res.clone(), use because the response can be consumed  once only.
                        cache.put(event.request.url, res.clone());
                        return res;
                    })
                })
                .catch(err => {
                    // Handling errors.
                });
            }
        })
    );
});
// self = the service worker
self.addEventListener('install', function (event) {
    console.log('[Service Worker] Installing service worker ...'); 
    // this makes the code waits till the cache proccess reach the end.
    event.waitUntil(
        caches.open('static') // creates the cache if not exists
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

self.addEventListener('activate', function (event) {
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
                    return caches.open('dynamic').
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
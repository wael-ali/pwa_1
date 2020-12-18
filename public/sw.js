// self = the service worker
self.addEventListener('install', function (event) {
    console.log('[Service Worker] Installing service worker ...'); 
    // this makes the code waits till the cache proccess reach the end.
    event.waitUntil(
        caches.open('static') // creates the cache if not exists
        .then(cache => {
            console.log('[Server worker] precaching App Shell ...');
            cache.add('/src/js/app.js');
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
                return fetch(event.request);
            }
        })
    );
});
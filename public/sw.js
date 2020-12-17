// self = the service worker
self.addEventListener('install', function (event) {
    console.log('[Service Worker] Installing service worker ...', event);
});

self.addEventListener('activate', function (event) {
    console.log('[Service Worker] Activating service worker ...', event);
    // mybe will not be needed in future!!
    return self.clients.claim();
});
// None lifesycle event
self.addEventListener('fetch', function (event) {
   console.log('[Service Worker] Fetching some data ....', event); 
    // we can control the response to each request using this method
   event.respondWith(fetch(event.request));
});
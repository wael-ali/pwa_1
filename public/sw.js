// self = the service worker
self.addEventListener('install', function (event) {
    console.log('[Service Worker] Installing service worker ...', event);
});

self.addEventListener('activate', function (event) {
    console.log('[Service Worker] Installing service worker ...', event);
    // mybe will not be needed in future!!
    return self.clients.claim();
});
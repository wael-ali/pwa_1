// Check if the service worker feature is supported by the browser.
// navigator simply is the browser
if('serviceWorker' in navigator){
    navigator
        .serviceWorker
        .register('/sw.js') // the path of the service worker sw.js in the root folder
        .then(function () {
            console.log('Service worker registered!');
        })
    ;
}
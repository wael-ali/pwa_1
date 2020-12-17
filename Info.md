PWA:

# Core Building Blocks
	1. Service Worker: 
		* its js running in a background process evenif our application is closed.
		* it enables us to offline access and cache some files and give us access to other pwa relative features.
			1. Background Sync, 
			2. Web push
	2. Application manifest: 
		* Allows addtition to homescreen.(installable).
	3. Responsive design:
		* App/Layout should work and look good across devices.
	4. Geolocation API:
	5. Camera API:

# PWA outline:
	1. Application Manifest.
	2. Service Worker.
	3. Server Worker Caching(Offline Access).
	4. Advanced Caching Strategies.
	5. Caching Dynamic data with idexedDB.
	6. Responsive Design.
	7. Background Sync.
	8. Web Push Notifications.
	9. Medial API (Camera & Geolocation).
	10. Automated SW Management.
# *** #
## 1. Using an App Manifest to Make your App installable.

create the manifest.json file in the root of the project (in the same directory of the entry file).
now  add a link tag to all the html pages, in our case index.html in src and in help:
```
  <link rel="manifest" href="/manifest.json">
```
### Manifest.json Content:
---
```
{
    "name": "App long Name and appears on the splash screen",
    "short_name": "App name shown under the app icon",
    "start_url": "/index.html", // url for the page that should start with when we tab the app icon
    "scope": ".", // which pages are included in our PWA experience normaly the whole app.
    "display": "standalone", // should it look like a standalone app?
    "background_color": "#fff", // this the color of the app when it is loading for the splashcreen.
    "theme_color": "#eee", // controls the toolbars color of the app.
    "description": "whenever the browser need description for your app it finds it here",
    "dir": "ltr", // Read direction of your app.
    "lang": "en-US", // Sets the Main language of your app.
    "orientation": "portrait-primary", // Set and inforce default orientation. [protrait, protrait-primary, landscape, any]
    "icons": [], // configure icons e.g. on homescreen.
    "icons": [
        {
            "src": "/src/images/icons/app-icon-48x48.png", // Icon path.
            "size": "48x48",
            "type": "image/png"
        },
        .
        .
    ],
    .
    .
    "related_applications": [], // List of Native applications of your app.
    "related_applications": [
        {
            "platform": "play",
            "url": "https://paly.google.com/store/apps/details?id=com.example.app1",
            "id": "com.example.app1"
        }
    ],



}
```
### Safari support 
to make sure that our app is also supporting Apple (safari)
in all html files or (all html file should have these meta prooerties)
```
</head>
.
.
  <link rel="manifest" href="/manifest.json">
  <!-- Apple support for pwa -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="apple-mobile-web-app-title" content="PWAGram">
  <link rel="apple-touch-icon" href="/src/images/icons/apple-icon-57x57.png" sizes="57x57">
  <link rel="apple-touch-icon" href="/src/images/icons/apple-icon-60x60.png" sizes="60x60">
  <link rel="apple-touch-icon" href="/src/images/icons/apple-icon-72x72.png" sizes="72x72">
  <link rel="apple-touch-icon" href="/src/images/icons/apple-icon-76x76.png" sizes="76x76">
  <link rel="apple-touch-icon" href="/src/images/icons/apple-icon-114x114.png" sizes="114x114">
  <link rel="apple-touch-icon" href="/src/images/icons/apple-icon-120x120.png" sizes="120x120">
  <link rel="apple-touch-icon" href="/src/images/icons/apple-icon-144x144.png" sizes="144x144">
  <link rel="apple-touch-icon" href="/src/images/icons/apple-icon-152x152.png" sizes="152x152">
  <link rel="apple-touch-icon" href="/src/images/icons/apple-icon-180x180.png" sizes="180x180">
</head>
```
### Explorer support
you need to add these meta data tags for all html files too:
```
<head>
    .
    .
    <!-- Explorer -->
    <meta name="msapplication-TileImage" content="/src/icons/app-icon-144x144.png">
    <meta name="msapplication-TileColor" content="#fff">
    <meta name="theme-color" content="#3f51b5">
</head>
```
## 2. Service Workers
#
1. Loaded js: 
    1. Runs on one single thread, attached to individual HTML pages.
2. Service Worker: 
    1. Runs on additional thread, decoupled from HTML pages.
    2. Manages  All pages of given scope(e.g. all pages of a domain).
    3. Lives on even after pages have been closed. (in the background).
    4. Good at reacting to events
### Listenable Events in Server workers
1. Fetch: Browser of page-related js initates a fetch (Htttp request) vip: ajax or axios cannt triger a fetch event.
2. Push Notifications: Service Workers receives web push notification (from server).
3. Notification Interaction: User interacts with desplayed notification.
4. Background Sync: Service Worker receives Backgground Sync Event (e.g. Internet connection was restored).
5. Service Worker Lifecycle: Service wroker phase changes.
### Createing first service worker
_**(1)-- create sw.js in the public folder and let it be empty.**_
``` 
$ touch sw.js
``` 
_**(2)-- register the new service worker but how?!**_ 

in your normal js code we can do it in the index.html inside a script tag and then add the same code to every html page but this is not ideal, so the best way is to write the registration code in app.js as we import it in all html pages.
```
// app.js

// Check if the service worker feature is supported by the browser.
// navigator simply is the browser.
// the .register('/sw.js', {scope: '/help'}) method,
// takes an other argument which is an object with scope property,
// but we will not use it here.
if('serviceWorker' in navigator){
    navigator
        .serviceWorker
        .register('/sw.js') // the path of the service worker sw.js in the root folder
        .then(function () {
            console.log('Service worker registered!');
        })
    ;
}
```
##### *Note:*
* sw.js and manifest.json are not related.
* service workers work only with pages served with https, _loclahost is an exception for developers_.
* service workers does not have access to dom events.
* we allways attach event listners to the service worker, refering to it with the self keyword.

_**(3)-- Reaction to incomming events:**_ 

In the sw.js add the following:
```
// self = the service worker
self.addEventListener('install', function (event) {
    console.log('[Service Worker] Installing service worker ...', event);
});

self.addEventListener('activate', function (event) {
    console.log('[Service Worker] Installing service worker ...', event);
    // mybe will not be needed in future!!
    return self.clients.claim();
});
// After reloading the page we see the first log but not the second one !!.
// you have to close all tabs for the app, or go to devtools => application => serviceworker => ///// skip waiting the new service worker to be activated.
```
## Connecting Chrome Developer Tools to a Real/ Emulated Device
It's easy to connect your Chrome Developer Tools with a Real or Emulated Android Device (event though the latter unfortunately never worked for me).

The following article explains it step-by-step and by using helpful images: https://developers.google.com/web/tools/chrome-devtools/remote-debugging/

Make sure you enabled "Developer Mode" on your Device! You do that by tapping your Android Build Number (in the Settings) 7 times. Yes, this is no joke ;-)



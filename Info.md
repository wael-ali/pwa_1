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


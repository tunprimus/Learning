//@ts-check

const staticCacheName = 'site-static';
const assets = [
	'./',
	'./index.html',
	'./js/app.js',
	'./js/ui.js',
	'./js/materialize.min.js',
	'./css/style.css',
	'./css/materialize.min.css',
	'./img/dish.png',
	'./img/icons/icon-72x72.png',
	'./img/icons/icon-96x96.png',
	'./img/icons/icon-128x128.png',
	'./img/icons/icon-144x144.png',
	'./img/icons/icon-152x152.png',
	'./img/icons/icon-192x192.png',
	'./img/icons/icon-384x384.png',
	'./img/icons/icon-512x512.png',
	'./pages/about.html',
	'./pages/contact.html',
];


// Install service worker
self.addEventListener('install', evt => {
	// console.log('service worker has been installed');
	evt.waitUntil(
		caches.open(staticCacheName)
			.then(cache => {
				console.log('caching shell assets');
				cache.addAll(assets)
		})
	);
});

// Activate event
self.addEventListener('activate', evt => {
	// console.log('service worker has been activated');
});

// Fetch event
self.addEventListener('fetch', evt => {
	// console.log('fetch event', evt);
});

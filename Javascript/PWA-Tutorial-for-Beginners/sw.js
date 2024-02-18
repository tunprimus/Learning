//@ts-check

const staticCacheName = 'site-static-v2';
const dynamicCache = 'site-dynamic-v1';
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
	evt.waitUntil(
		caches.keys().then(keys => {
			// console.log(keys);
			return Promise.all(keys
				.filter(key => key !== staticCacheName)
				.map(key => caches.delete(key)));
		})
	);
});

// Fetch event
self.addEventListener('fetch', evt => {
	// console.log('fetch event', evt);
	evt.respondWith(
		caches.match(evt.request).then(cacheRes => {
			return cacheRes || fetch(evt.request).then(fetchRes => {
				return caches.open(dynamicCache).then(cache => {
					cache.put(evt.request.url, fetchRes.clone());
					return fetchRes;
				});
			});
		})
	);
});

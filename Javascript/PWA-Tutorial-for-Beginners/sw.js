//@ts-check

const staticCacheName = 'site-static-v2';
const dynamicCacheName = 'site-dynamic-v1';
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
	'./pages/fallback.html',
];

// Cache size limit function
const limitCacheSize = (name, size) => {
	caches.open(name).then(cache => {
		cache.keys().then(keys => {
			if(keys.length > size){
				cache.delete(keys[0]).then(limitCacheSize(name, size));
			}
		});
	});
};

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
				.filter(key => key !== staticCacheName && key !== dynamicCacheName)
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
				return caches.open(dynamicCacheName).then(cache => {
					cache.put(evt.request.url, fetchRes.clone());
					limitCacheSize(dynamicCacheName, 15);
					return fetchRes;
				});
			});
		}).catch(() => {
			if (evt.request.url.indexOf('.html') > -1) {
				return caches.match('/pages/fallback.html');
			}
		})
	);
});

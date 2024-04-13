//@ts-check

const CACHE_NAME = 'calculator-v1';
const CACHE_ASSET = [
	'index.html',
	'style.css',
	'main.js',
];

/**
 * Sevice worker installation
 * @param {*} event
 */
self.addEventListener('install', (event) => {
	console.log('Service worker installed');
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then((cache) => {
				console.log('Service worker: caching files');
				cache.addAll(CACHE_ASSET);
			})
			.then(() => self.skipWaiting())
	)
});

/**
 * Service worker activation
 * @param {*} evt
 */
self.addEventListener('activate', (evt) => {
	console.log('Service worker activated');

	// Remove unwanted caches
	evt.waitUntil(
		caches.keys().then((CACHE_NAME) => {
			return Promise.all(
				CACHE_NAME.map((cache) => {
					if (cache !== CACHE_NAME) {
						console.log('Service worker: clear old caches');
						return caches.delete(cache);
					}
				})
			);
		})
	);
});


self.addEventListener('fetch', (evt) => {
	console.log('Service worker: fetching');
	// Check if the live site is available and if not, respond with the cached version
	evt.respondWith(fetch(evt.request).catch(() => caches.match(evt.request)));
});

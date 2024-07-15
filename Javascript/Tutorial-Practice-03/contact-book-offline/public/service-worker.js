//@ts-check

const CACHE_NAME = 'contact-book-v1'

const resourcesToCache = [
	'./',
	'./index.html',
	'./css/style.css',
	'./js/ext/babel.min.js',
	'./js/ext/pouchdb.min.js',
	'./js/register-service-worker.js',
	'./js/store.js',
	'./js/app.js',
	'./pages/404.html',
];

self.addEventListener('install', function (evt) {
	console.info('Installing service worker')
	evt.waitUntil(
		// Open the app browser cache
		caches
			.open(CACHE_NAME)
			.then(function (cache) {
				console.info('Cache open');
				// Add all the app assets to the cache
				return cache.addAll(resourcesToCache);
			})
	);
});

self.addEventListener('activate', function (evt) {
	console.info('Service worker activated');
});

self.addEventListener('fetch', function (evt) {
	console.info('Fetch event for ', evt.request.url);
	evt.respondWith(
		// Try to finc the corresponding in the cache
		caches
			.match(evt.request)
			.then(function (response) {
				console.info('Request ', evt.request);
				if (response) {
					// Cache hit: return cached response
					console.info('Response from cache');
					return response;
				}

				console.info('No response from cache, fetching ');
				// Not found: fetch resource from the server
				return fetch(evt.request);
			})
	);
});

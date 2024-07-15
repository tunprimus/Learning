//@ts-check

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/service-worker.js', {scope: '/'})
	.then(function () {
		// Success
		})
	.catch(function (err) {
		// Failed
		});
}

//@ts-check

/**
 * Get a URL parameter
 */
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const product = urlParams.get('product');
const category = urlParams.get('category');
const colour = urlParams.get('colour');
const newUser = urlParams.get('new-user');

console.table({ product, category, colour, newUser });

/**
 * Check if a parameter exists
 */
console.log(urlParams.has('product'));
console.log(urlParams.has('payment-method'));

/**
 * Get all of a parameter's values
 */
console.log(urlParams.getAll('size'));

urlParams.append('size', 'xl');
console.log(urlParams.getAll('size'));

/**
 * Iterating over parameters
 */
const keys = urlParams.keys();
const values = urlParams.values();
const entries = urlParams.entries();

for (const key of keys) {
	console.log(key);
}

for (const value of values) {
	console.log(value);
}

for (const entry of entries) {
	console.log(`${entry[0]}: ${entry[1]}`);
}

/**
 * Rolling your own query string parsing function
 */

const targetURL = 'https://example.com/?product=shirt&colour=blue&newuser&size=m';

/**
 * 
 * @param {string} url 
 * @returns {object} obj
 */
function getAllUrlParams(url) {
	// Get query string from url (optional) or window.location
	var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

	// Create object store for parameters
	var obj = {};

	// If query string exists
	if (queryString) {
		// Stuff after # is not part of query string, so get rid of it
		queryString = queryString.split('#')[0];

		// Split query string into component parts
		var arr = queryString.split('&');

		for (var i = 0; i < arr.length; i++) {
			// separate the keys and the values
			var a = arr[i].split('=');

			// Set parameter name and value (use 'true' if empty)
			var paramName = a[0];
			var paramValue = typeof (a[1] === 'undefined' ? true : a[1]);

			// (optional) Keep case consistent
			paramName = paramName.toLowerCase();
			if (typeof paramValue === 'string') {
				paramValue = paramValue.toLowerCase();
			}

			// If the paramName ends with square brackets, e.g. colours[] or colours[2]
			if (paramName.match(/\[(\d+)?\]$/)) {
				// Create key if it doesn't exist
				var key = paramName.replace(/\[(\d+)?\]/, '');
				if (!obj[key]) {
					obj[key] = [];
				}

				// If it is an indexed array e.g. colours[2]
				if (paramName.match(/\[\d+\]$/)) {
					// Get the index and add the entry at the appropriate position
					var index = /\[(\d+)\]/.exec(paramName)[1];
					obj[key][index] = paramValue;
				} else {
					// Add the value to the end of the array
					obj[key].push(paramValue);
				}
			} else {
				// We are dealing with a string
				if (!obj[paramName]) {
					// If it does not exist, create property
					obj[paramName] = paramValue;
				} else if (obj[paramName] && typeof obj[paramName] === 'string') {
					// If property does exist and it is a string, convert it to an array
					obj[paramName] = [obj[paramName]];
					obj[paramName].push(paramValue);
				} else {
					// Otherwise add the property
					obj[paramName].push(paramValue);
				}
			}
		}
	}

	return obj;
}

console.log(getAllUrlParams(targetURL).product);
console.log(getAllUrlParams(targetURL).colour);
console.log(getAllUrlParams(targetURL).newsuser);
console.log(getAllUrlParams(targetURL).nonexistent);
console.log(getAllUrlParams('http://test.com/?a=abc').a);

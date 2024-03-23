//@ts-check

/**
 * Convert all the keys to uppercase
 * @param {object} obj 
 * @returns {object}
 */
function convertKeysToUpper(obj) {
	return Object.keys(obj).reduce((acc, key) => {
		acc[key.toUpperCase()] = obj[key];
		return acc;
	}, {});
}

console.log(convertKeysToUpper({Name: 'John', Age: 22}));

/**
 * Convert all the keys to lowercase
 * @param {object} obj 
 * @returns {object}
 */
function convertKeysToLower(obj) {
	return Object.keys(obj).reduce((acc, key) => {
		acc[key.toLowerCase()] = obj[key];
		return acc;
	}, {});
}

console.log(convertKeysToLower({Name: 'John', Age: 22}));

//@ts-check

/**
 * 
 * @param {string} str 
 * @returns {object}
 */
function parseCookie(str) {
	return str
		.split(';')
		.map(v => v.split('='))
		.reduce((acc, v) => {
			acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
			return acc;
		}, {});
}

console.log(parseCookie('foo=bar;equation=E%3Dmc%5E2'));

/**
 * 
 * @param {string} name 
 * @param {string | number} val 
 * @returns {string}
 */
function serialiseCookie(name, val) {
	return `${encodeURIComponent(name)}=${encodeURIComponent(val)}`;
}

console.log(serialiseCookie('foo', 'bar'));

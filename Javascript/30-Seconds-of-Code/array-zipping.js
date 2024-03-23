//@ts-check

/**
 * @description Zipping requires creating an array with the length of the 
 * longest array from the arguments
 * Math.max() with the spread operator (...) get the length of the longest
 * subarray
 * Array.from() creates new array of appropriate length
 * Array.prototype.map() creates an array for each element of the new array;
 * with the length of each array passed as number of arguments
 * Using the last argument in Array.from() will be used to map over the
 * indices of the original array and create a new array with the elements
 * at that index
 * @param  {...any} arrays 
 * @returns {array}
 */
function zipArrays(...arrays) {
	const maxLength = Math.max(...arrays.map(x => x.length));

	return Array.from({ length: maxLength }).map((_, i) => {
		return Array.from({ length: arrays.length }, (_, k) => arrays[k][i]);
	});
}

console.log(zipArrays(['a', 'b',], [1, 2,], [true, false]));
console.log(zipArrays(['a',], [1, 2,], [true, false]));


const unzipArrays = arr => arr.reduce((acc, val) => (val.forEach((v, i) => acc[i].push(v)), acc), Array.from({length: Math.max(...arr.map(x => x.length))}).map(x => []));


console.log(unzipArrays([['a', 1, true], ['b', 2, false]]));
console.log(unzipArrays([['a', 1, true], ['b', 2,]]));


function zipArraysIntoObject(props, values) {
	return props.reduce((obj, prop, index) => ((obj[prop] = values[index], obj)), {})
}

console.log(zipArraysIntoObject(['a', 'b', 'c',], [1, 2,]));
console.log(zipArraysIntoObject(['a', 'b',], [1, 2, 3,]));


function unzipObjectIntoArray(obj) {
	return [Object.keys(obj), Object.values(obj)];
}

console.log(unzipObjectIntoArray({ a: 1, b: 2, c: 3 }));
console.log(unzipObjectIntoArray({ a: 1, b: 2 }));

/**
 * 
 * @param {Array} collection 
 * @param {number | string} item 
 * @returns {number} index position in collection if found, otherwise -1
 * 
 * @example
 * let data1 = [5, 8, 6, 9, 1, 7, 3, 2, 4];
 * let result1 = linearSearch(data, 3);
 * console.log(result1); // 6
 * 
 * let result2 = linearSearch(data1, 'koala');
 * console.log(result2); // -1
 * 
 * @abstract O(n) linear time complexity
 */
function linearSearch(collection, item) {
	for (let i = 0; i < collection.length; i++) {
		if (collection[i] === item) {
			return i;
		}
	}
	return -1;
}

/**
 * 
 * @param {Array} collection 
 * @param {number | string} item 
 * @returns {Array | number} index positions in collection if found, otherwise -1
 * 
 * @example
 * let data2 = [5, 8, 3, 9, 1, 7, 3, 2, 4, 3, 6];
 * let result2 = globalLinearSearch(data2, 3);
 * console.log(result2); // [2, 6, 9]
 * 
 * let result2 = linearSearch(data2, 'koala');
 * console.log(result2); // -1
 * 
 * @abstract O(n) linear time complexity
 */
function globalLinearSearch(collection, item) {
	let foundPositions = [];

	for (let i = 0; i < collection.length; i++) {
		if (collection[i] === item) {
			foundPositions.push(i);
		}
	}

	if (foundPositions.length > 0) {
		return foundPositions;
	} else {
		return -1;
	}
}

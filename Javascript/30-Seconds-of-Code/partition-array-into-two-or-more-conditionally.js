//@ts-check

/**
 * Two-way array partitioning
 * @param {array} arr 
 * @param {function} fn 
 * @returns {array}
 */
function partitionArray(arr, fn) {
	return arr.reduce((acc, val, index, arr) => {
		acc[fn(val, index, arr) ? 0 : 1].push(val);
		return acc;
	}, [[], []]);
}

const users = [
	{user: 'barney', age: 36, active: false,},
	{user: 'fred', age: 40, active: true,},
];
console.log(partitionArray(users, o => o.active));

/**
 * Partition array into multiple parts
 * @description Map object is used as the accumulator to 
 * 1. group elements into as many arrays as needed 
 * 2. check if partition already exist using Map.prototype.has()
 * Map.prototype.values() gets an iterator over the Map object while
 * the spread operator(...) converts it into an array
 * @param {array} arr 
 * @param {function} fn 
 * @returns {array}
 */
function partitionArrayIntoMultiple(arr, fn) {
	return [...arr.reduce((acc, val, index, arr) => {
		const current = fn(val, index, arr);
		if (acc.has(current)) {
			acc.get(current).push(val);
		} else {
			acc.set(current, [val]);
		}
		return acc;
	}, new Map()).values(),];
}

const numbers = [1, 1, 3, 3, 4, 5, 5, 5,];

console.log(partitionArrayIntoMultiple(numbers, n => n % 3));

console.log(partitionArrayIntoMultiple(numbers, n => n));

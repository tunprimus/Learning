
/**
 * 
 * @param {Array} arr 
 * @param {number} val 
 * @returns {number}
 * 
 * @abstract O(log n) time complexity
 */
function binarySearchIterative(arr, val) {
	let start = 0;
	let end = arr.length - 1;

	while (start <= end) {
		let middleIndex = Math.floor((start + end) / 2);

		if (arr[middleIndex] === val) {
			return middleIndex;
		} else if (arr[middleIndex] < val) {
			start = middleIndex + 1;
		} else {
			end = middleIndex - 1;
		}
	}
	return -1;
}

function binarySearchRecursive(arr, val, start = 0, end = arr.length - 1) {
	const middleIndex = Math.floor((start + end) / 2);

	if (val === arr[middleIndex]) {
		return middleIndex;
	}

	if (start >= end) {
		return -1;
	}

	if (val < arr[middleIndex]) {
		binarySearchRecursive(arr, val, start, middleIndex -1);
	} else {
		binarySearchRecursive(arr, val, middleIndex + 1, end);
	}
}
const numbers = [1, 3, 5, 10, 32, 40, 60, 71, 80, 99,];
let foundIndex1 = binarySearchIterative(numbers, 60);
console.log(foundIndex1);
let foundIndex2 = binarySearchRecursive(numbers, 60);
console.log(foundIndex2);

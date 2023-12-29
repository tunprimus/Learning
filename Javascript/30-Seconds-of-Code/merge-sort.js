//@ts-check

/*
General purpose comparison-based sorting algorithm that uses divide and conquer

Implementation
- Use recursion
- if length of array is less than 2, return array
- use Math.floor() to calculate the mid point of the array
- use Array.prototype.slice() to slice array in two and recursively call mergeSort() on each subarray
- finally use Array.from() and Array.prototype.shift() to combine two sorted arrays into one

Complexity: O(n log n)
*/

const mergeSort = arr => {
	if (arr.length < 2) {
		return arr;
	}

	const mid = Math.floor(arr.length / 2);
	const left = mergeSort(arr.slice(0, mid));
	const right = mergeSort(arr.slice(mid, arr.length));

	return Array.from({ length: left.length + right.length }, () => {
		if (!left.length) {
			return right.shift();
		} else if (!right.length) {
			return left.shift();
		} else {
			return left[0] > right[0] ? right.shift() : left.shift();
		}
	});
};

console.log(mergeSort([5, 1, 4, 2, 3]));

//@ts-check

/*
Simple algorithm that repeatedly swaps adjacent elements of an array

Implementation
- Declare a flag variable swapped that indicates of a swap took place in the current iteration
- use the spread operator to clone the original array
- use for loop to iterate over all elements of the clone array, except the last element
- use nested for loop to iterate over the segment of the array between 0 and i, swapping any adjacent out of order elements and setting swapped to true
- if swapped is false after an iteration, no more changes are needed; return the cloned array

Complexity: O(n^2)
*/

const bubbleSort = arr => {
	let swapped = false;
	const arrClone = [...arr];
	const arrLength = arrClone.length;

	for (let i = 0; i < arrLength; i++) {
		swapped = false;
		for (let j = 0; j < arrLength - i; j++) {
			if (arrClone[j + 1] < arrClone[j]) {
				[arrClone[j], arrClone[j + 1]] = [arrClone[j + 1], arrClone[j]];
				swapped = true;
			}
		}
		if (!swapped) {
			return arrClone;
		}
	}
	return arrClone;
};

console.log(bubbleSort([2, 1, 4, 3]));

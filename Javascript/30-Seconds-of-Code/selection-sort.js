//@ts-check

/*
In-place comparison sorting algorithm

Implementation
- Use the spread operator to clone the original array
- use for loop to iterate over element in the array
- use Array.prototype.slice() and Array.prototype.reduce() to find the index of the minimum element in the subarray to the right of the current index. Perform a swap, if necessary

Complexity O(n^2)
*/

/**
 * 
 * @param {number[]} arr Array of numbers
 * @returns {number[]} Array of numbers
 */
const selectionSort = arr => {
	const arrClone = [...arr];
	for (let i = 0; i < arrClone.length; i++) {
		const min = arrClone
			.slice(i + 1)
			.reduce((acc, val, j) => (val < arrClone[acc] ? j + i + 1 : acc), i);
		if (min !== i) {
			[arrClone[i], arrClone[min]] = [arrClone[min], arrClone[i]];
		}
	}
	return arrClone;
};

console.log(selectionSort([5, 1, 4, 2, 3]));

//@ts-check


/*
Implementation
- Use recursion
- use the spread operator to clone the original array
- if length is less than 2, return original array
- use Math.floor to calculate index of pivot element
- use Array.prototype.reduce() and Array.prototype.push()
to split the array into two subarray. The firs one one contains element lesser than pivot while the second contains element greater than pivot. Destructure the result into two arrays
- recursively call quickSort() on the created subarray

Complexity O(n log n)
*/

/**
 * 
 * @param {number[]} arr The array of number to sort
 * @returns {number[]}
 */
const quickSort = arr => {
	const arrClone = [...arr];

	if (arrClone.length < 2) {
		return arr;
	}

	const pivotIndex =  Math.floor(arr.length / 2);
	const pivot = arrClone[pivotIndex];
	const [low, high] = arrClone.reduce((acc, value, index) => {
		if (value < pivot || (value === pivot && index !== pivotIndex)) {
			acc[0].push(value);
		} else if (value > pivot) {
			acc[1].push(value);
		}
		return acc;
	}, [[], []]);
	return [...quickSort(low), pivot, ...quickSort(high)];
};

console.log(quickSort([1, 6, 1, 5, 3, 2, 1, 4]));

//@ts-check

/*
Simple comparison sorting algorithm

Implementation
- Use Array.prototype.reduce() to iterate over all the elements of the array
- if length of accumulator is 0, add the current element to it
- use Array.prototype.some() to iterate over the results in the accumulator until the correct position is found
- use Array.prototype.splice() to insert the current element into accumulator

Complexity: O(n^2)
*/

const insertionSort = arr => {
	arr.reduce((acc, cur) => {
		if (!acc.length) {
			return [cur];
		}
		acc.some((item, j) => {
			if (cur <= item) {
				acc.splice(j, 0, cur);
				return true;
			}

			if (cur > item && j === acc.length - 1) {
				acc.splice(j + 1, 0, cur);
				return true;
			}
			return false;
		});
		return acc;
	}, []);
};

console.log(insertionSort([6, 3, 4, 1]));

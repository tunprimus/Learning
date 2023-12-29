//@ts-check

/*
Comparison based sorting algorithm that uses the heap data structure to find the min and max values

Implementation
- Use recursion
- use the spread operator to clone the original array
- use closures to declare a variable and a heapify function
- use for loop and Math.floor() in combination with the heapify function to create a max heap from the array
- use for loop to repeatedly narrow down the considerable range, using the heapify function and swapping values as necessary

Complexity: 
*/

const heapSort = arr => {
	const arrClone = [...arr];
	let arrLength = arrClone.length;

	const heapify = (arrClone, i) => {
		const left = 2 * i + 1;
		const right = 2 * i + 2;
		let max = i;

		if (left < arrLength && arrClone[left] > arrClone[max]) {
			max = left;
		}

		if (right < arrLength && arrClone[right] > arrClone[max]) {
			max = right;
		}

		if (max !== arrLength) {
			[arrClone[max], arrClone[i]] = [arrClone[i], arrClone[max]];
			heapify(arrClone, max);
		}
	};

	for (let i = Math.floor(arrLength / 2); i >= 0; i -= 1) {
		heapify(arrClone, i);
	}

	for (i = arrClone.length - 1; i > 0; i--) {
		[arrClone[0], arrClone[i]] = [arrClone[i], arrClone[0]];
		arrLength--;
		heapify(arrClone, 0);
	}

	return arrClone;
};

console.log(heapSort([6, 3, 4, 1]));

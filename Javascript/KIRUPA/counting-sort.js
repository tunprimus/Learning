//@ts-check

function countingSort(input) {
	// Find the maximum element in the array
	const max = Math.max(...input);

	// Create a count array to store the frequency of each element
	const count = new Array(max + 1).fill(0);

	// Count the occurrences of each element
	for (const num of input) {
		count[num]++;
	}

	// Calculate the prefix sum to store the position of each element in the sorted array
	for (let i = 1; i <= max; i++) {
		count[i] += count[i - 1];
	}

	// Create an output array to store the sorted elements
	const output = new Array(input.length);

	// Place elements in the output array based on counts
	for (let i = input.length - 1; i >= 0; i--) {
		output[count[input[i]] - 1] = input[i];
		count[input[i]]--;
	}

	// Return the sorted array
	return output;
}

let unsortedArray = [5, 2, 1, 3, 4, 1, 0, 0, 4, 7, 2];
let sortedArray = countingSort(unsortedArray);

console.log(sortedArray);

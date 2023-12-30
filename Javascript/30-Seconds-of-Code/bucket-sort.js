//@ts-check


/*
Implementation
- Use Math.min(), Math.max(), and the spread operator to find the minimum and maximum values of the array
- use Array.from() and Math.floor() to create buckets
- use Array.prototype.reduce(), the spread operator and Array.prototype.sort() to sort each bucket and append the result

Complexity: O(n + k) n = input size, k = number of buckets
*/

const bucketSort = (arr, size = 5) => {
	const min = Math.min(...arr);
	const max = Math.max(...arr);
	const buckets = Array.from({ length: Math.floor((max - min) / size) + 1 }, () => []);

	arr.forEach(value => {
		buckets[Math.floor((value - min) / size)].push(value);
	});

	return buckets.reduce((acc, b) => [...acc, ...b.sort((a, b) => a - b)], []);
};

console.log(bucketSort([6, 3, 4, 1]));

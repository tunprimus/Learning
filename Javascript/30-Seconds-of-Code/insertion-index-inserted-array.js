

const insertionIndex = (arr, num) => {
	const isDescending = arr[0] > arr[arr.length - 1];
	const index = arr.findIndex(el => (isDescending ? num >= el : num <= el));
	return index === -1 ? arr.length : index;
};

console.log(insertionIndex([5, 3, 2, 1], 4));
console.log(insertionIndex([30, 50], 40));

const lastInsertionIndex = (arr, num) => {
	const isDescending = arr[0] > arr[arr.length - 1];
	const index = arr.findLastIndex(el => (isDescending ? num <= el : num >= el));
	return index === -1 ? arr.length : index;
};

console.log(lastInsertionIndex([10, 20, 30, 30, 40], 30));

const insertionIndexBy = (arr, num, comparatorFn) => {
	const index = arr.findIndex(el => comparatorFn(num, el) < 0);
	return index === -1 ? arr.length : index;
};

console.log(insertionIndexBy([{x: 4}, {x: 6}], {x: 5}, (a, b) => a.x - b.x));
console.log(insertionIndexBy([{x: 6}, {x: 4}], {x: 5}, (a, b) => b.x - a.x));

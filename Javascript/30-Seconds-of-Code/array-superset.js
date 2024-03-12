

const superset = (a, b) => {
	const sA = new Set(a);
	const sB = new Set(b);
	return [...sB].every(v => sA.has(v));
};

const subset = (a, b) => superset(b, a);

console.log(superset([1, 2, 3, 4], [1, 2, 2]));
console.log(superset([1, 2, 3, 4], [1, 3, 5]));

console.log(subset(new Set([1, 2]), new Set([1, 2, 3, 4])));
console.log(subset(new Set([1, 5]), new Set([1, 2, 3, 4])));

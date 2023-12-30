//@ts-check

/*
Euclidean distance between 2 points is the length of the line segment connecting them. It is equal to the hypothenuse of a right triangle, given by the Pythagorean theorem
This can be extended to any number of dimensions by sequential solving

Implementation
- Use Math.hypot() to calculate the Euclidean distance between two points in 2 dimensions
- represent each point as an array in 3 dimensions and calculate the Euclidean distance
- use Object.keys() and Array.prototype.map() to map each coordinate to its difference between the two points
- use the spread operator to pass the resulting values to Math.hypot()

Complexity: O(n) n = number of dimensions
*/

const euclideanDistance = (coord1, coord2) => {
	return Math.hypot(...Object.keys(coord1).map(k => coord2[k] - coord1[k]));
};

console.log(euclideanDistance([1, 1], [2, 3]));
console.log(euclideanDistance([1, 1, 1], [2, 3, 2]));
console.log(euclideanDistance([1, 1, 1, 1], [2, 3, 2, 3]));

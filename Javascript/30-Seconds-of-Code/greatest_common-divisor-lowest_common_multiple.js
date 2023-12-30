//@ts-check

/**
 * GCD of two or more integers is the largest positive integer that divides each of the integers.
 * The Euclidean algorithm is an efficient method to solve for two numbers using recursion
 * @param {number} num1 - The first number
 * @param {number} num2 - The second number
 * @returns {number} The result
 */
const gcd = (num1, num2) => {
	if (num1 < 0 || num2 < 0) {
		throw RangeError('Negative number not supported');
	} else {
		return (!num2 ? num1 : gcd(num2, num1 % num2));
	}
};

console.log(gcd(8, 36));
/* console.log(gcd(-8, 36));
console.log(gcd(8, -36));
console.log(gcd(-8, -36)); */

/**
 * The GCD of more than two numbers is calculated by calculating the GCD of each pair and using Array.prototype.reduce() to apply the operation to multiple numbers
 * @param  {...any} arr - Array of numbers
 * @returns {number}
 */
const gcdMultiple = (...arr) => [...arr].reduce((num1, num2) => gcd(num1, num2));

console.log(gcdMultiple(8, 36));
console.log(gcdMultiple(...[12, 8, 32]));

/**
 * The least common multiple (LCM) of two numbers can be calculated by using the GCD due to the fact that lcm(x, y) = x * y / gcd(x, y)
 * @param {number} num1 - First element
 * @param {number} num2 - Second element
 * @returns {number}
 */
const lcm = (num1, num2) => (num1 * num2) / gcd(num1, num2);

console.log(lcm(12, 7));

/**
 * The LCM of more than two numbers is calculated by calculating the LCM of each pair and using Array.prototype.reduce() to apply the operation to multiple numbers
 * @param  {...any} arr - Array of numbers
 * @returns {number}
 */
const lcmMultiple = (...arr) => [...arr].reduce((num1, num2) => lcm(num1, num2));

console.log(lcmMultiple(12, 7));
console.log(lcmMultiple(...[1, 3, 4, 5]));

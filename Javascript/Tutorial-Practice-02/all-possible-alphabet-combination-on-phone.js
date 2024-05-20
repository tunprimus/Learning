//@ts-check

/**
 * @description Find all possible combination of alphabets from a phone dial pad using javascript
 * @author Velu S Gautam
 * @link https://www.hectane.com/blog/dial-pad-problem-javascript-interview
 * @question Generate all combination of words that can possibly created using a 0-9 dial pad of a phone
 */

/**
 * 
 * @param {string} digitString 
 * @returns {array}
 */
function telephoneNumberWords(digitString) {
	// Hashmap of phone dialpad to letters
	/** @type {object} */
	const phoneDigitsToLetters = {
		0: '0',
		1: '1',
		2: 'ABC',
		3: 'DEF',
		4: 'GHI',
		5: 'JKL',
		6: 'MNO',
		7: 'PQRS',
		8: 'TUV',
		9: 'WXYZ',
	};

	// Make results an array
	/** @type {Array<string>} */
	const words = [];

	/**
	 * Make inner recursive function (word, digitsLeft)
	 * @param {string} word 
	 * @param {string} digits 
	 */
	function lettersForDigits(word, digits) {
		// Base case: if no digit is left, push word to result
		if (digits.length === 0) {
			return words.push(word);
		}

		// Grab current digit from digitsLeft
		// For each letter option, add letter to word and recurse
		phoneDigitsToLetters[digits[0]].split('').forEach(function (letter) {
			lettersForDigits(word + letter, digits.slice(1));
		});
	}

	// Invoke recursive function
	lettersForDigits('', digitString.split(''));

	// Return results array
	return words;
}

const result = telephoneNumberWords('23');

console.log(result);

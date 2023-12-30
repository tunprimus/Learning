//@ts-check

/*
Simple substitution cipher with alphabets replaced by another in a fixed manner

Implementation
- Based on the mode, add or subtract the shift from the character code of each letter, wrapping around the alphabet as needed
- use the modulo and ternary operators
- use the spread operator and Array.prototype.map() to iterate over the string, converts its character code using String.prototype.charCodeAt(), apply the shift and convert it back to a letter using String.fromCharCode()
- if character code is not in range 65(A) to 90(Z) or 97(a) to 122(z), ignore
- finally combine letters into string with Array.prototype.join()
*/

/**
 * Simple Caesar's cipher algorithm with encryption and decryption (for English alphabets)
 * @param {string} str The message to encrypt or decrypt
 * @param {number} shift The key / number of characters to shift
 * @param {boolean} decrypt False is to encrypt message, true is to decrypt it
 * @returns {string}
 */
const caesarCipher = (str, shift, decrypt = false) => {
	const shifter = decrypt ? (26 - shift) % 26 : shift;
	const pos = shifter > 0 ? shifter : 26 + (shifter % 26);

	return [...str]
		.map((letter, index) => {
			const ch = str.charCodeAt(index);
			if (ch >= 65 && ch <= 90) {
				return String.fromCharCode(((ch - 65 + pos) % 26) + 65);
			}

			if (ch >= 97 && ch <= 122) {
				return String.fromCharCode(((ch - 97 + pos) % 26) + 97);
			}
			return letter;
		}).join('');
};

console.log(caesarCipher('Hello World!', 23));
console.log(caesarCipher('Hello World!', -3));
console.log(caesarCipher('Ebiil Tloia!', 23, true));
console.log(caesarCipher('Ebiil Tloia!', -3, true));

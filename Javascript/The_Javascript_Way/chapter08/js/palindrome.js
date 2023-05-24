// Improve the previous programme to check if the word is a palindrome.

function palindromeCheck() {
    let word = prompt("Enter a word:");
    const vowels = ["a", "e", "i", "o", "u"];
    let counter = 0;

    for (let letter of word.toLowerCase()) {
        if (vowels.includes(letter)) {
            counter++;
        }
    }

    let reverse = word.split("").reverse().join("");

    let palindrome = false;

    if (word.toLowerCase() === reverse.toLowerCase()) {
        palindrome = true;
        // return palindrome;
    } 

    return `Your word has a length of ${word.length} with ${counter} vowel(s), the lowercase form is ${word.toLowerCase()}, the uppercase is ${word.toUpperCase()}, reversed is ${reverse} and palindrome nature is ${palindrome}.`;
}

palindromeCheck();

console.log(palindromeCheck());

// Improve programme to show number of vowels in the word.

function vowelCount() {
    let word = prompt("Enter a word:");
    const vowels = ["a", "e", "i", "o", "u"];
    let counter = 0;

    for (let letter of word.toLowerCase()) {
        if (vowels.includes(letter)) {
            counter++;
        }
    }

    return `Your word has a length of ${word.length} with ${counter} vowel while lowercase form is ${word.toLowerCase()} and uppercase is ${word.toUpperCase()}.`;
}

vowelCount();

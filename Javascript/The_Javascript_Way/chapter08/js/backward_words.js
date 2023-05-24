// Improve the programme so that is shows the word written backwards.

function wordReverse() {
    let word = prompt("Enter a word:");
    const vowels = ["a", "e", "i", "o", "u"];
    let counter = 0;

    for (let letter of word.toLowerCase()) {
        if (vowels.includes(letter)) {
            counter++;
        }
    }

    let reverse = word.split("").reverse().join("");

    return `Your word has a length of ${word.length} with ${counter} vowel while lowercase form is ${word.toLowerCase()}, uppercase is ${word.toUpperCase()} and reversed is ${reverse}.`;
}

wordReverse();

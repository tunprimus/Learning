// Write a programme that asks the user for a word until the user types "stop". The programme then shows each of theses words, except "stop".

function listOfWords() {
    let words = [];
    let buffer = "";
    while (buffer !== "stop") {
        buffer = prompt("Enter a word:");
        // Needed to filter out "stop" from array
        if (buffer !== "stop") {
            words.push(buffer);
        }
        // console.log(words);
    }
    return words;
}

listOfWords();

console.log(listOfWords());

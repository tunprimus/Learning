// Write a programme that asks you for a word then shows its length, lowercase and uppercase values.

function wordFunction() {
    let word = prompt("Enter a word:");
    
    return `Your word length is ${word.length} while lowercase is ${word.toLowerCase()} and uppercase is ${word.toUpperCase()}.`;
}

wordFunction();

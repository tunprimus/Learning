let getPhrase = secretPhrase();
console.log(getPhrase);
const phraseElement = document.getElementById('insert-phrase');

function showPhrase() {
	phraseElement.textContent = getPhrase;
}

showPhrase();

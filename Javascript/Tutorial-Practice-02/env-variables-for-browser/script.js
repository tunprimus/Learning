let getPhrase = secretPhrase();

const phraseElement = document.getElementById('insert-phrase');

function showPhrase() {
	phraseElement.textContent = getPhrase;
}

showPhrase();

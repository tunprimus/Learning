//@ts-check

const words = [
	'HTML',
	'CSS',
	'JAVASCRIPT',
	'WEB COMPONENTS',
	'VUE',
	'SVELTE',
	'NODE',
	'REACT',
	'ANGULAR',
	'JQUERY',
	'VANJS',
	'LIT',
	'HTMX',
	'REEF',
];

let wordToGuess = '';
let guessedLetters = [];
let wrongGuesses = 0;
let imageCount = 1;

const WORDS_LENGTH = words.length;
const MAX_WRONG_GUESSES = 4;

function selectRandomWord() {
	return words[Math.floor(Math.random() * WORDS_LENGTH)];
}

function initialiseGame() {
	wordToGuess = selectRandomWord();
	guessedLetters = Array(wordToGuess.length).fill('_');
	wrongGuesses = 0;

	// Update the word display
	updateWordDisplay();

	updateMeltingSnowmanGraphic();

	// Remove any previously generated buttons
	const lettersContainer = document.querySelector('#letters');
	while (lettersContainer.firstChild) {
		lettersContainer.removeChild(lettersContainer.firstChild);
	}

	// Generate the letter buttons
	for (let i = 0; i < 26; i++) {
		const letter = String.fromCharCode(65 + i);
		const button = document.createElement('button');
		button.innerText = letter;
		button.setAttribute('class', 'letters__button')
		button.addEventListener('click', function () {
			handleGuess(letter);
		});
		lettersContainer.appendChild(button);
	}

	// Clear any previous win/lose message
	const messageContainer = document.querySelector('#message');
	messageContainer.innerText = '';
}

function updateWordDisplay() {
	const wordContainer = document.querySelector('#word');
	wordContainer.innerText = guessedLetters.join(' ');
}

function handleGuess(letter) {
	// If the letter has already been guessed, do nothing
	if (guessedLetters.includes(letter)) {
		return;
	}

	// Add the letter to the list of guessed letters
	guessedLetters.forEach((guessedLetter, index) => {
		if (wordToGuess[index] === letter) {
			guessedLetters[index] = letter;
		}
	});

	// If the letter is not in the hidden word, increment the wrong guess count and update the Melting Snowman graphic
	if (!wordToGuess.includes(letter)) {
		wrongGuesses++;
		updateMeltingSnowmanGraphic();
	}

	// Update the word display
	updateWordDisplay();

	// Check if the game has been won or lost
	checkWinOrLose();
}

function updateMeltingSnowmanGraphic() {
	const meltingSnowmanContainer = document.querySelector('#melting-snowman');
	let imageHolder = `<img src="images/MeltingSnowman${imageCount}.png" alt="MeltingSnowman ${imageCount}" class="melting-snowman__img">`;
	let imgUrl = `images/MeltingSnowman${imageCount}.png`;
	// console.log(imgUrl);
	// console.log(isImageExistXhr(imgUrl));
	if (isImageExistXhr(imgUrl)) {
		meltingSnowmanContainer.innerHTML = imageHolder;
		imageCount++;
	} else {
		meltingSnowmanContainer.innerHTML += '';
		imageCount++;
	}
	// imageCount++;
}

function checkWinOrLose() {
	if (guessedLetters.join('') === wordToGuess) {
		const messageContainer = document.querySelector('#message');
		messageContainer.innerText = 'You win!';
		const letterButtons = document.querySelectorAll('.letters button');
		letterButtons.forEach(button => {
			button.disabled = true;
			button.removeEventListener('click', handleGuess);
		});
	} else if (wrongGuesses >= MAX_WRONG_GUESSES) {
		const messageContainer = document.querySelector('#message');
		messageContainer.innerText = `You lose! The word was "${wordToGuess}".`;
		const meltingSnowmanContainer = document.querySelector('#melting-snowman');
		meltingSnowmanContainer.innerHTML = `<img src="images/gameover.png" alt="game over" class="gameover">`;
		const letterButtons = document.querySelectorAll('.letters button');
		letterButtons.forEach(button => {
			button.disabled = true;
			button.removeEventListener('click', handleGuess);
		});
	}
}

function isImageAtUrl(url) {
	return fetch(url, {method: 'HEAD'})
		.then(res => {
			return res.headers.get('Content-Type').startsWith('image');
		});
}

function isImageExist(url) {
	return fetch(url, { method: 'HEAD' })
		.then(res => {
			if (res.ok) {
				return true;
			} else {
				return false;
			}
		})
		.catch(err => console.error('Error:', err));
}

function isImageExistXhr(url) {
	const xhr = new XMLHttpRequest();

	xhr.open('HEAD', url, false);
	xhr.send();

	return xhr.status != 404;
}


// Initialise the game when the page loads
window.addEventListener('load', initialiseGame);

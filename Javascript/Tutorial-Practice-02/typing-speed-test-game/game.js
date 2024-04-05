//@ts-check

const TIME_LIMIT = 60;

const quotesWordsArray = [
	'Push yourself, because no one else is going to do it for you.',
	'One dollar and eighty-seven cents. That was all. And sixty cents of it was in pennies. Pennies saved one and two at a time by bulldozing the grocer and the vegetable man and the butcher until one’s cheeks burned with the silent imputation of parsimony that such close dealing implied. One dollar and eighty-seven cents. And the next day would be Christmas...',
	'Failure is the condiment that gives success its flavour.',
	'There was a leak in the boat. Nobody had yet noticed it, and nobody would for the next couple of hours. This was a problem since the boat was heading out to sea and while the leak was quite small at the moment, it would be much larger when it was ultimately discovered. John had planned it exactly this way.',
	'Wake up with determination. Go to bed with satisfaction.',
	'The paper was blank. It should not have been. There should have been writing on the paper, at least a paragraph if not more. The fact that the writing was not there was frustrating. Actually, it was even more than frustrating. It was downright distressing. The coin hovered in the air, spinning over and over again. It reached its peak and began to descend. Both boys were pleading with it to land a certain way but the coin had already made up its mind on what it was going to do.',
	'It is going to be hard, but hard does not mean impossible.',
	'I will talk to you tomorrow in more detail at our meeting, but I think I have found a solution to our problem. It is not exactly legal, but it would not land us in jail for the rest of our lives either. Are you willing to take the chance? Monroe asked his partner over the phone.',
	'Learning never exhausts the mind.',
	'There was a time when he would have embraced the change that was coming. In his youth, he sought adventure and the unknown, but that had been years ago. He wished he could go back and learn to find the excitement that came with change but it was useless. That curiosity had long left him to where he had come to loathe anything that put him out of his comfort zone.',
	'The only way to do great work is to love what you do.',
];

const wpmText = document.querySelector('#wpm-current-wpm');
const cpmText = document.querySelector('#cpm-current-cpm');
const errorText = document.querySelector('#errors-current-errors');
const timerText = document.querySelector('#timer-current-timer');
const accuracyText = document.querySelector('#accuracy-current-accuracy');

const quoteText = document.querySelector('#quote');
const inputArea = document.querySelector('#input-area');

const restartBtn = document.querySelector('#restart-btn');

const wpmGroup = document.querySelector('#wpm');
const cpmGroup = document.querySelector('#cpm');
const errorGroup = document.querySelector('#errors');
const accuracyGroup = document.querySelector('#accuracy');

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let totalErrors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let currentQuote = '';
let quoteNum = 0;
let timer = null;

/**
 * function updateQuote() to handle getting the text and splitting the characters into elements
 */
function updateQuote() {
	quoteText.textContent = null;
	currentQuote = quotesWordsArray[quoteNum];

	/**
	 * Separate each character and make an element out of each to style them
	 */
	currentQuote.split('').forEach(char => {
		const charSpan = document.createElement('span');
		charSpan.innerText = char;
		quoteText.appendChild(charSpan);
	});

	/**
	 * Roll over to the first quote
	 */
	if (quoteNum < quotesWordsArray.length - 1) {
		quoteNum++;
	} else {
		quoteNum = 0;
	}
}

/**
 * function processCurrentText() to get the current value of the input box, colour the characters of the quote text, calculate errors plus accuracy and moving to the next quote
 */
function processCurrentText() {
	// Get the current input and split it
	let currentInput = inputArea.value;
	let currentInputArray = currentInput.split('');

	// Increment total characters typed
	characterTyped++;

	errors = 0;

	const quoteSpanArray = quoteText.querySelectorAll('span');
	quoteSpanArray.forEach((char, index) => {
		let typedChar = currentInputArray[index];

		// Character typed checking
		if (typedChar === null) {
			char.classList.remove('correct__char');
			char.classList.remove('incorrect__char');
		} else if (typedChar === char.innerText) {
			char.classList.add('correct__char');
			char.classList.remove('incorrect__char');
		}else {
			char.classList.add('incorrect__char');
			char.classList.remove('correct__char');

			errors++;
		}
	});

	// Display the number of errors
	errorText.textContent = String(totalErrors + errors);

	// Update accuracy text
	let correctCharacters = (characterTyped - (totalErrors + errors));
	let accuracyVal = ((correctCharacters / characterTyped) * 100);
	accuracyText.textContent = String(Math.round(accuracyVal));

	// If the current text is completely typed free of errors
	if (currentInput.length  === currentQuote.length) {
		updateQuote();

		// Update total errors
		totalErrors += errors;

		// Clear the input area
		inputArea.value = '';
	}
}

/**
 * function startGame() resets all values, update the quote text and creates a new timer
 */
function startGame() {
	resetValues();
	updateQuote();

	// Clear old and start a new timer
	clearInterval(timer);
	timer = setInterval(updateTimer, 1000);
}

/**
 * function resetValues() resets all values
 */
function resetValues() {
	timeLeft = TIME_LIMIT;
	timeElapsed = 0;
	errors = 0;
	totalErrors = 0;
	accuracy = 0;
	characterTyped = 0;
	quoteNum = 0;
	inputArea.disabled = false;

	inputArea.value = '';
	quoteText.textContent = 'Click on the area below to start the game.';
	accuracyText.textContent = '100';
	timerText.textContent = timeLeft + 's';
	errorText.textContent = '0';
	restartBtn.style.display = 'none';
	cpmGroup.style.display = 'none';
	wpmGroup.style.display = 'none';
}

/**
 * function updateTimer() updates the time values and finishes the game
 */
function updateTimer() {
	if (timeLeft > 0) {
		timeLeft--;
		timeElapsed++;

		timerText.textContent = timeLeft + 's';
	} else {
		finishGame();
	}
}

/**
 * function finishGame() deletes the timer, displays the restart game text plus button and calculates the CPM plus WPM of the current session
 */
function finishGame() {
	clearInterval(timer);
	inputArea.disabled = true;
	quoteText.textContent = 'Click on restart to start a new game.';
	restartBtn.style.display = 'block';

	// Calculate cpm and wpm
	let cpm = Math.round((characterTyped / timeElapsed) * 60);
	let wpm = Math.round(((characterTyped / 5) / timeElapsed) * 60);

	cpmText.textContent = String(cpm);
	wpmText.textContent = String(wpm);

	// Display the cpm and wpm
	cpmGroup.style.display = 'block';
	wpmGroup.style.display = 'block';
}

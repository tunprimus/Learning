//@ts-check

import myQuestions from './questions.js';

(function() {

	function buildQuiz() {
		const output = [];
	
		myQuestions.forEach((currentQuestion, questionNumber) => {
			// Variable to store the list of possible answers
			const answers = [];
		
			// And for each available answer...
			for (const letter in currentQuestion.answers) {
				// ...Add an HTML radio button
				answers.push(
					`<label class="answers__label">
						<input type="radio" name="question${questionNumber}" value="${letter}">
						${letter}:
						${currentQuestion.answers[letter]}
					</label>`
				);
			}
		
			// Add this question and its answers to the output
			output.push(
				`<div id="slide" class="slide">
					<div class="question">${currentQuestion.question}</div>
					<div class="answers">${answers.join('')}</div>
				</div>`
			);
		});
	
		// Finally combine our output
		quizContainer.innerHTML = output.join('');
	}
	
	function showResults() {
		// Gather answer containers from our quiz
		const answerContainers = quizContainer.querySelectorAll('.answers');
		// Keep track of user's answers
		let numCorrect = 0;
	
		myQuestions.forEach((currentQuestion, questionNumber) => {
			// Find selected answer
			const answerContainer = answerContainers[questionNumber];
			const selector = `input[name=question${questionNumber}]:checked`;
			const userAnswer = (answerContainer.querySelector(selector) || {}).value;
		
			// If answer is correct
			if (userAnswer === currentQuestion.correctAnswer) {
				// Add to the number of correct answers
				numCorrect++;
			
				// Colour the answers green
				answerContainers[questionNumber].style.color = 'lightgreen';
			} else {
				// Colour the answers red if answer is wrong or blank
				answerContainers[questionNumber].style.color = 'red';
			}
		});
	
		// Show number of correct answers out of total
		resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
	}
	
	// Pagination
	function showSlide(n) {
		slides[currentSlide].classList.remove('active-slide');
		slides[n].classList.add('active-slide');
		currentSlide = n;
	
		if (currentSlide === 0) {
			previousButton.style.display = 'none';
		} else {
			previousButton.style.display = 'inline-block';
		}
	
		if (currentSlide === slides.length - 1) {
			nextButton.style.display = 'none';
			submitButton.style.display = 'inline-block';
		} else {
			nextButton.style.display = 'inline-block';
			submitButton.style.display = 'none';
		}
	}
	
	function showNextSlide() {
		showSlide(currentSlide + 1);
	}
	
	function showPreviousSlide() {
		showSlide(currentSlide - 1);
	}
	
	const quizContainer = document.getElementById('quiz');
	const resultsContainer = document.getElementById('results');
	const submitButton = document.getElementById('submit');
	
	buildQuiz();
	
	const previousButton = document.getElementById('previous');
	const nextButton = document.getElementById('next');
	const slides = document.querySelectorAll('.slide');
	let currentSlide = 0;
	
	showSlide(currentSlide);
	
	submitButton.addEventListener('click', showResults);
	previousButton.addEventListener('click', showPreviousSlide);
	nextButton.addEventListener('click', showNextSlide);

})();
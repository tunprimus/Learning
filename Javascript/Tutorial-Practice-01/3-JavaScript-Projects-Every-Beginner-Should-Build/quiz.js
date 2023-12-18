const data = [
  {
    id: 1,
    question: 'Which of these fish is actually a fish?',
    answers: [
      {answer: 'swordfish', isCorrect: true},
      {answer: 'jellyfish', isCorrect: false},
      {answer: 'starfish', isCorrect: false},
      {answer: 'crayfish', isCorrect: false},
    ],
  },
  {
    id: 2,
    question: 'A flutter is a group of:',
    answers: [
      {answer: 'bees', isCorrect: false},
      {answer: 'penguins', isCorrect: false},
      {answer: 'butterflies', isCorrect: true},
      {answer: 'camels', isCorrect: false},
    ],
  },
  {
    id: 3,
    question: 'A group of which animals is referred to as a wake?',
    answers: [
      {answer: 'bats', isCorrect: false},
      {answer: 'vultures', isCorrect: true},
      {answer: 'ants', isCorrect: false},
      {answer: 'dragonflies', isCorrect: false},
    ],
  },
  {
    id: 4,
    question: 'Which groups of creatures form schools?',
    answers: [
      {answer: 'penguins', isCorrect: false},
      {answer: 'termites', isCorrect: false},
      {answer: 'frogs', isCorrect: false},
      {answer: 'fish', isCorrect: true},
    ],
  },
];

const gameScreenElem = document.querySelector('.game');
const resultScreenElem = document.querySelector('.result');
const questionElem = document.querySelector('.question');
const answerContainerElem = document.querySelector('.answer');
const submitElem = document.querySelector('.submit');
const playElem = document.querySelector('.play');
const correctElem = document.querySelector('.correct');
const wrongElem = document.querySelector('.wrong');
const scoreElem = document.querySelector('.score');

let questIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let total = 0;
let selectedAnswer;
const END_OF_QUESTIONS = data.length;

const playAgain = () => {
  questIndex = 0;
  correctCount = 0;
  wrongCount = 0;
  total = 0;
  showQuestion(questIndex);
};

playElem.addEventListener('click', () => {
  resultScreenElem.classList.toggle('hide');
  gameScreenElem.classList.toggle('hide');
  playAgain();
});

/* 
const showResult = () => {
  resultScreenElem.classList.toggle('hide');
  gameScreenElem.classList.toggle('hide');

  correctElem.textContent = `Correct Answers: ${correctCount}`;
  wrongElem.textContent = `Wrong Answers: ${wrongCount}`;
  scoreElem.textContent = `Score: ${(total) * 10}`;
};
 */

const showQuestion = (qNumber) => {
  if (questIndex === END_OF_QUESTIONS) {
    return showResult();
  }
  selectedAnswer = null;
  questionElem.textContent = data[qNumber].question;
  answerContainerElem.innerHTML = data[qNumber].answers.map((item, index) =>
    `
      <input class="answer__input answer__input--radio" type="radio" name="answer" id="${index}" value="${item.isCorrect}">
      <label class="answer__input" for="${index}">${item.answer}</label>
      <span class="break"></span>
    `
  ).join('');

  selectAnswer();
};

const selectAnswer = () => {
  answerContainerElem.querySelectorAll('input').forEach(el => {
    el.addEventListener('click', (evt) => {
      selectedAnswer = evt.target.value;
    });
  });
};

const submitAnswer = () => {
  submitElem.addEventListener('click', () => {
    if (selectedAnswer !== null) {
      selectedAnswer === 'true' ? correctCount++ : wrongCount++;
      questIndex++;
      showQuestion(questIndex);
    } else {
      alert('Please select an answer!');
    }
    // total = correctCount - wrongCount;
  });
};

showQuestion(questIndex);
submitAnswer();

const showResult = () => {
  resultScreenElem.classList.toggle('hide');
  gameScreenElem.classList.toggle('hide');

  correctElem.textContent = `Correct Answers: ${correctCount}`;
  wrongElem.textContent = `Wrong Answers: ${wrongCount}`;
  scoreElem.textContent = `Score: ${(correctCount - wrongCount) * 10}`;
};


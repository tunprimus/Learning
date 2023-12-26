//@ts-check

const GRID_SIZE = 20;
const board = document.getElementById('game-board');

let snake = [{x: 10, y: 10}];
let food = generateFood();
let direction = 'right';
let gameInterval;
let gameSpeedDelay = 200;

function draw() {
	board.innerHTML = '';
	drawSnake();
	drawFood();
}

function drawSnake() {
	snake.forEach((segment) => {
		const snakeElement = createGameElement('div', 'snake');
		setPosition(snakeElement, segment);
		board.appendChild(snakeElement);
	});
}

function createGameElement(tag, className) {
	const element = document.createElement('tag');
	element.classList.add(className);
	return element;
}

function setPosition(element, position) {
	element.style.gridColumn = position.x;
	element.style.gridRow = position.y;
}

function drawFood() {
	const foodElement = createGameElement('div', 'food');
	setPosition(foodElement, food);
	board.appendChild(foodElement);
}

function generateFood() {
	const x = Math.floor(Math.random() * GRID_SIZE) + 1;
	const y = Math.floor(Math.random() * GRID_SIZE) + 1;
	return { x, y };
}

function move() {
	const head = { ...snake[0] };
	switch(direction) {
		case 'right':
			head.x++;
			break;
		case 'left':
			head.x--;
			break;
		case 'up':
			head.y--;
			break;
		case 'down':
			head.y++;
			break;
		default:
			break;
	}
	snake.unshift(head);
	
	if (head.x === food.x && head.y === food.y) {
		food = generateFood();
		clearInterval();
		gameInterval = setInterval(() => {
			move();
			draw();
		}, gameSpeedDelay);
	} else {
		snake.pop();
	}
}

draw();
/* 
let timeInterval = setInterval(() => {
	move();
	draw();
}, 200);
 */
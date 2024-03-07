//@ts-check

const WIDTH = 8;

const gameBoard = document.querySelector('#gameboard');
const playerDisplay = document.querySelector('#player');
const infoDisplay = document.querySelector('#info-display');
let playerGo = 'black';
playerDisplay.textContent = 'black';


const startPieces = [
	blackRook, blackKnight, blackBishop, blackQueen, blackKing, blackBishop, blackKnight, blackRook,
	blackPawn, blackPawn, blackPawn, blackPawn, blackPawn, blackPawn, blackPawn, blackPawn,
	'', '', '', '', '', '', '', '',
	'', '', '', '', '', '', '', '',
	'', '', '', '', '', '', '', '',
	'', '', '', '', '', '', '', '',
	whitePawn, whitePawn, whitePawn, whitePawn, whitePawn, whitePawn, whitePawn, whitePawn,
	whiteRook, whiteKnight, whiteBishop, whiteQueen, whiteKing, whiteBishop, whiteKnight, whiteRook,
];

function createBoard() {
	const fragment = new DocumentFragment();
	startPieces.forEach((startPiece, index) => {
		const square = document.createElement('div');
		square.classList.add('square');
		// @ts-ignore
		let pieceBuffer = String.fromCodePoint(`${startPiece}`);
		square.innerHTML = `<span class="piece" id="piece-${index}">${pieceBuffer}</span>`;
		// @ts-ignore
		square.firstChild && square.firstChild.setAttribute('draggable', true);
		square.setAttribute('square-id', index);
		const row = Math.floor((63 - index) / 8) + 1;
		if (row % 2 === 0) {
			square.classList.add(index % 2 === 0 ? 'beige' : 'brown');
		} else {
			square.classList.add(index % 2 === 0 ? 'brown' : 'beige');
		}
		fragment.append(square);
	});
	// @ts-ignore
	gameBoard.append(fragment);
}
createBoard();

const allSquares = document.querySelectorAll('.square');

allSquares.forEach(square => {
	square.addEventListener('dragstart', dragStart);
	square.addEventListener('dragover', dragOver);
	square.addEventListener('drop', dragDrop);
});

let startPositionId;
let EndPositionId;
let draggedElement;

function dragStart(evt) {
	draggedElement = evt.target;
	startPositionId = evt.target.parentNode.getAttribute('square-id');
}

function dragOver(evt) {
	evt.preventDefault();
}

function dragDrop(evt) {
	evt.stopPropagation();
	/* console.log('playerGo', playerGo);
	console.log('evt.target', evt.target);
	console.log(draggedElement); */
	// const correctGo = draggedElement.firstChild.classList.contains(playerGo);
	const correctGo = draggedElement.classList.contains(playerGo);
	const taken = evt.target.classList.contains('piece');
	const opponentGo = playerGo === 'white' ? 'black' : 'white';
	// console.log('opponentGo', opponentGo);
	// const takenByOpponent = evt.target.firstChild && evt.target.firstChild.classList.contains(opponentGo);
	const takenByOpponent = evt.target && evt.target.classList.contains(opponentGo);

	if (correctGo) {
		if (takenByOpponent && valid) {
			evt.target.parentNode.append(draggedElement);
			evt.target.remove();
		}
	}
	
	changePlayer();
}

function changePlayer() {
	if (playerGo === 'black') {
		playerGo = 'white';
		playerDisplay.textContent = 'white';
	} else {
		playerGo = 'black';
		playerDisplay.textContent = 'black';
	}
}

function reverseIds() {
	const allSquaresForReverse = document.querySelectorAll('.square');
	allSquaresForReverse.forEach((square, index) => square.setAttribute('square-id', (WIDTH * WIDTH - 1) - index));
}

function revertIds() {
	const allSquaresForRevert = document.querySelectorAll('.square');
	allSquaresForRevert.forEach((square, index) => square.setAttribute('square-id', index));
}

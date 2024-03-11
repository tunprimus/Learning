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
	const correctGo = draggedElement.classList.contains(playerGo);
	const taken = evt.target.classList.contains('piece');
	const valid = checkIfValid(evt.target);
	const opponentGo = playerGo === 'white' ? 'black' : 'white';
	const takenByOpponent = evt.target && evt.target.classList.contains(opponentGo);

	if (correctGo) {
		if (takenByOpponent && valid) {
			evt.target.parentNode.append(draggedElement);
			evt.target.remove();
			checkForWin();
			changePlayer();
			return;
		}

		if (taken && !takenByOpponent) {
			infoDisplay.textContent = 'You cannot go here!';
			setTimeout(() => infoDisplay.textContent = '', 2000);
			return;
		}

		if (valid) {
			evt.target.append(draggedElement);
			checkForWin();
			changePlayer();
			return;
		}
	}
}

function checkIfValid(target) {
	const targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'));
	const startId = Number(startPositionId);
	const piece = draggedElement.id;
	console.log(targetId, startId, piece);

	switch(piece) {
		case 'pawn':
			const starterRow = [8, 9, 10, 11, 12, 13, 14, 15];
			if (
					starterRow.includes(startId) && startId + WIDTH * 2 === targetId || 
					startId + WIDTH === targetId || 
					startId + WIDTH - 1 === targetId && !document.querySelector(`[square-id="${startId + WIDTH - 1}"]`).firstChild || 
					startId + WIDTH + 1 === targetId && !document.querySelector(`[square-id="${startId + WIDTH + 1}"]`).firstChild
				) {
					return true;
				}
			break;
		case 'knight':
			if (
				startId + WIDTH * 2 - 1 === targetId ||
				startId + WIDTH * 2 + 1 === targetId ||
				startId + WIDTH - 2 === targetId ||
				startId + WIDTH + 2 === targetId ||
				startId - WIDTH * 2 - 1 === targetId ||
				startId - WIDTH * 2 + 1 === targetId ||
				startId - WIDTH - 2 === targetId ||
				startId - WIDTH + 2 === targetId
				) {
				return true;
			}
			break;
		case 'bishop':
			if (
				startId + WIDTH + 1 === targetId ||
				startId + WIDTH * 2 + 2 && !document.querySelector(`[square-id="${startId + WIDTH + 1}"]`).firstChild ||
				startId + WIDTH * 3 + 3 && !document.querySelector(`[square-id="${startId + WIDTH + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2 + 2}"]`).firstChild ||
				startId + WIDTH * 4 + 4 && !document.querySelector(`[square-id="${startId + WIDTH + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 3 + 3}"]`).firstChild ||
				startId + WIDTH * 5 + 5 && !document.querySelector(`[square-id="${startId + WIDTH + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 4 + 4}"]`).firstChild ||
				startId + WIDTH * 6 + 6 && !document.querySelector(`[square-id="${startId + WIDTH + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 5 + 5}"]`).firstChild ||
				startId + WIDTH * 6 + 6 && !document.querySelector(`[square-id="${startId + WIDTH + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 6 + 6}"]`).firstChild ||
				// --
				startId - WIDTH - 1 === targetId ||
				startId - WIDTH * 2 - 2 && !document.querySelector(`[square-id="${startId - WIDTH - 1}"]`).firstChild ||
				startId - WIDTH * 3 - 3 && !document.querySelector(`[square-id="${startId - WIDTH - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2 - 2}"]`).firstChild ||
				startId - WIDTH * 4 - 4 && !document.querySelector(`[square-id="${startId - WIDTH - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 3 - 3}"]`).firstChild ||
				startId - WIDTH * 5 - 5 && !document.querySelector(`[square-id="${startId - WIDTH - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 4 - 4}"]`).firstChild ||
				startId - WIDTH * 6 - 6 && !document.querySelector(`[square-id="${startId - WIDTH - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 5 - 5}"]`).firstChild ||
				startId - WIDTH * 6 - 6 && !document.querySelector(`[square-id="${startId - WIDTH - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 6 - 6}"]`).firstChild ||
				// --
				startId - WIDTH + 1 === targetId ||
				startId - WIDTH * 2 + 2 && !document.querySelector(`[square-id="${startId - WIDTH + 1}"]`).firstChild ||
				startId - WIDTH * 3 + 3 && !document.querySelector(`[square-id="${startId - WIDTH + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2 + 2}"]`).firstChild ||
				startId - WIDTH * 4 + 4 && !document.querySelector(`[square-id="${startId - WIDTH + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 3 + 3}"]`).firstChild ||
				startId - WIDTH * 5 + 5 && !document.querySelector(`[square-id="${startId - WIDTH + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 4 + 4}"]`).firstChild ||
				startId - WIDTH * 6 + 6 && !document.querySelector(`[square-id="${startId - WIDTH + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 5 + 5}"]`).firstChild ||
				startId - WIDTH * 6 + 6 && !document.querySelector(`[square-id="${startId - WIDTH + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 6 + 6}"]`).firstChild ||
				// --
				startId + WIDTH - 1 === targetId ||
				startId + WIDTH * 2 - 2 && !document.querySelector(`[square-id="${startId + WIDTH - 1}"]`).firstChild ||
				startId + WIDTH * 3 - 3 && !document.querySelector(`[square-id="${startId + WIDTH - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2 - 2}"]`).firstChild ||
				startId + WIDTH * 4 - 4 && !document.querySelector(`[square-id="${startId + WIDTH - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 3 - 3}"]`).firstChild ||
				startId + WIDTH * 5 - 5 && !document.querySelector(`[square-id="${startId + WIDTH - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 4 - 4}"]`).firstChild ||
				startId + WIDTH * 6 - 6 && !document.querySelector(`[square-id="${startId + WIDTH - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 5 - 5}"]`).firstChild ||
				startId + WIDTH * 6 - 6 && !document.querySelector(`[square-id="${startId + WIDTH - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 6 - 6}"]`).firstChild
				) {
				return true;
			}
			break;
		case 'rook':
			if (
				startId + WIDTH === targetId ||
				startId + WIDTH * 2 === targetId && !document.querySelector(`[square-id="${startId + WIDTH}"]`).firstChild ||
				startId + WIDTH * 3 === targetId && !document.querySelector(`[square-id="${startId + WIDTH}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2}"]`).firstChild ||
				startId + WIDTH * 4 === targetId && !document.querySelector(`[square-id="${startId + WIDTH}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 3}"]`).firstChild ||
				startId + WIDTH * 5 === targetId && !document.querySelector(`[square-id="${startId + WIDTH}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 4}"]`).firstChild ||
				startId + WIDTH * 6 === targetId && !document.querySelector(`[square-id="${startId + WIDTH}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 5}"]`).firstChild ||
				startId + WIDTH * 7 === targetId && !document.querySelector(`[square-id="${startId + WIDTH}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 4}"]`).firstChild  && !document.querySelector(`[square-id="${startId + WIDTH * 6}"]`).firstChild ||
				// --
				startId - WIDTH === targetId ||
				startId - WIDTH * 2 === targetId && !document.querySelector(`[square-id="${startId - WIDTH}"]`).firstChild ||
				startId - WIDTH * 3 === targetId && !document.querySelector(`[square-id="${startId - WIDTH}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2}"]`).firstChild ||
				startId - WIDTH * 4 === targetId && !document.querySelector(`[square-id="${startId - WIDTH}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 3}"]`).firstChild ||
				startId - WIDTH * 5 === targetId && !document.querySelector(`[square-id="${startId - WIDTH}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 4}"]`).firstChild ||
				startId - WIDTH * 6 === targetId && !document.querySelector(`[square-id="${startId - WIDTH}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 5}"]`).firstChild ||
				startId - WIDTH * 7 === targetId && !document.querySelector(`[square-id="${startId - WIDTH}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 4}"]`).firstChild  && !document.querySelector(`[square-id="${startId - WIDTH * 6}"]`).firstChild ||
				// --
				startId + 1 === targetId ||
				startId + 2 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild ||
				startId + 3 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild ||
				startId + 4 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild ||
				startId + 5 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild ||
				startId + 6 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 5}"]`).firstChild ||
				startId + 7 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild  && !document.querySelector(`[square-id="${startId + 6}"]`).firstChild ||
				// --
				startId - 1 === targetId ||
				startId - 2 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild ||
				startId - 3 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild ||
				startId - 4 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild ||
				startId - 5 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild ||
				startId - 6 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 5}"]`).firstChild ||
				startId - 7 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild  && !document.querySelector(`[square-id="${startId - 6}"]`).firstChild
				) {
				
				return true;
			}
			break;
		case 'queen':
			if (
				startId + WIDTH + 1 === targetId ||
				startId + WIDTH * 2 + 2 && !document.querySelector(`[square-id="${startId + WIDTH + 1}"]`).firstChild ||
				startId + WIDTH * 3 + 3 && !document.querySelector(`[square-id="${startId + WIDTH + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2 + 2}"]`).firstChild ||
				startId + WIDTH * 4 + 4 && !document.querySelector(`[square-id="${startId + WIDTH + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 3 + 3}"]`).firstChild ||
				startId + WIDTH * 5 + 5 && !document.querySelector(`[square-id="${startId + WIDTH + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 4 + 4}"]`).firstChild ||
				startId + WIDTH * 6 + 6 && !document.querySelector(`[square-id="${startId + WIDTH + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 5 + 5}"]`).firstChild ||
				startId + WIDTH * 6 + 6 && !document.querySelector(`[square-id="${startId + WIDTH + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 6 + 6}"]`).firstChild ||
				// --
				startId - WIDTH - 1 === targetId ||
				startId - WIDTH * 2 - 2 && !document.querySelector(`[square-id="${startId - WIDTH - 1}"]`).firstChild ||
				startId - WIDTH * 3 - 3 && !document.querySelector(`[square-id="${startId - WIDTH - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2 - 2}"]`).firstChild ||
				startId - WIDTH * 4 - 4 && !document.querySelector(`[square-id="${startId - WIDTH - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 3 - 3}"]`).firstChild ||
				startId - WIDTH * 5 - 5 && !document.querySelector(`[square-id="${startId - WIDTH - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 4 - 4}"]`).firstChild ||
				startId - WIDTH * 6 - 6 && !document.querySelector(`[square-id="${startId - WIDTH - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 5 - 5}"]`).firstChild ||
				startId - WIDTH * 6 - 6 && !document.querySelector(`[square-id="${startId - WIDTH - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 6 - 6}"]`).firstChild ||
				// --
				startId - WIDTH + 1 === targetId ||
				startId - WIDTH * 2 + 2 && !document.querySelector(`[square-id="${startId - WIDTH + 1}"]`).firstChild ||
				startId - WIDTH * 3 + 3 && !document.querySelector(`[square-id="${startId - WIDTH + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2 + 2}"]`).firstChild ||
				startId - WIDTH * 4 + 4 && !document.querySelector(`[square-id="${startId - WIDTH + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 3 + 3}"]`).firstChild ||
				startId - WIDTH * 5 + 5 && !document.querySelector(`[square-id="${startId - WIDTH + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 4 + 4}"]`).firstChild ||
				startId - WIDTH * 6 + 6 && !document.querySelector(`[square-id="${startId - WIDTH + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 5 + 5}"]`).firstChild ||
				startId - WIDTH * 6 + 6 && !document.querySelector(`[square-id="${startId - WIDTH + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 6 + 6}"]`).firstChild ||
				// --
				startId + WIDTH - 1 === targetId ||
				startId + WIDTH * 2 - 2 && !document.querySelector(`[square-id="${startId + WIDTH - 1}"]`).firstChild ||
				startId + WIDTH * 3 - 3 && !document.querySelector(`[square-id="${startId + WIDTH - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2 - 2}"]`).firstChild ||
				startId + WIDTH * 4 - 4 && !document.querySelector(`[square-id="${startId + WIDTH - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 3 - 3}"]`).firstChild ||
				startId + WIDTH * 5 - 5 && !document.querySelector(`[square-id="${startId + WIDTH - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 4 - 4}"]`).firstChild ||
				startId + WIDTH * 6 - 6 && !document.querySelector(`[square-id="${startId + WIDTH - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 5 - 5}"]`).firstChild ||
				startId + WIDTH * 6 - 6 && !document.querySelector(`[square-id="${startId + WIDTH - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 6 - 6}"]`).firstChild
				) {
				return true;
			}
			break;
		case 'rook':
			if (
				startId + WIDTH === targetId ||
				startId + WIDTH * 2 === targetId && !document.querySelector(`[square-id="${startId + WIDTH}"]`).firstChild ||
				startId + WIDTH * 3 === targetId && !document.querySelector(`[square-id="${startId + WIDTH}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2}"]`).firstChild ||
				startId + WIDTH * 4 === targetId && !document.querySelector(`[square-id="${startId + WIDTH}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 3}"]`).firstChild ||
				startId + WIDTH * 5 === targetId && !document.querySelector(`[square-id="${startId + WIDTH}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 4}"]`).firstChild ||
				startId + WIDTH * 6 === targetId && !document.querySelector(`[square-id="${startId + WIDTH}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 5}"]`).firstChild ||
				startId + WIDTH * 7 === targetId && !document.querySelector(`[square-id="${startId + WIDTH}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 4}"]`).firstChild  && !document.querySelector(`[square-id="${startId + WIDTH * 6}"]`).firstChild ||
				// --
				startId - WIDTH === targetId ||
				startId - WIDTH * 2 === targetId && !document.querySelector(`[square-id="${startId - WIDTH}"]`).firstChild ||
				startId - WIDTH * 3 === targetId && !document.querySelector(`[square-id="${startId - WIDTH}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2}"]`).firstChild ||
				startId - WIDTH * 4 === targetId && !document.querySelector(`[square-id="${startId - WIDTH}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 3}"]`).firstChild ||
				startId - WIDTH * 5 === targetId && !document.querySelector(`[square-id="${startId - WIDTH}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 4}"]`).firstChild ||
				startId - WIDTH * 6 === targetId && !document.querySelector(`[square-id="${startId - WIDTH}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 5}"]`).firstChild ||
				startId - WIDTH * 7 === targetId && !document.querySelector(`[square-id="${startId - WIDTH}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 4}"]`).firstChild  && !document.querySelector(`[square-id="${startId - WIDTH * 6}"]`).firstChild ||
				// --
				startId + 1 === targetId ||
				startId + 2 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild ||
				startId + 3 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild ||
				startId + 4 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild ||
				startId + 5 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild ||
				startId + 6 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 5}"]`).firstChild ||
				startId + 7 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild  && !document.querySelector(`[square-id="${startId + 6}"]`).firstChild ||
				// --
				startId - 1 === targetId ||
				startId - 2 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild ||
				startId - 3 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild ||
				startId - 4 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild ||
				startId - 5 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild ||
				startId - 6 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 5}"]`).firstChild ||
				startId - 7 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild  && !document.querySelector(`[square-id="${startId - 6}"]`).firstChild ||
				// --
				startId + WIDTH === targetId ||
				startId + WIDTH * 2 === targetId && !document.querySelector(`[square-id="${startId + WIDTH}"]`).firstChild ||
				startId + WIDTH * 3 === targetId && !document.querySelector(`[square-id="${startId + WIDTH}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2}"]`).firstChild ||
				startId + WIDTH * 4 === targetId && !document.querySelector(`[square-id="${startId + WIDTH}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 3}"]`).firstChild ||
				startId + WIDTH * 5 === targetId && !document.querySelector(`[square-id="${startId + WIDTH}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 4}"]`).firstChild ||
				startId + WIDTH * 6 === targetId && !document.querySelector(`[square-id="${startId + WIDTH}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 5}"]`).firstChild ||
				startId + WIDTH * 7 === targetId && !document.querySelector(`[square-id="${startId + WIDTH}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 4}"]`).firstChild  && !document.querySelector(`[square-id="${startId + WIDTH * 6}"]`).firstChild ||
				// --
				startId - WIDTH === targetId ||
				startId - WIDTH * 2 === targetId && !document.querySelector(`[square-id="${startId - WIDTH}"]`).firstChild ||
				startId - WIDTH * 3 === targetId && !document.querySelector(`[square-id="${startId - WIDTH}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2}"]`).firstChild ||
				startId - WIDTH * 4 === targetId && !document.querySelector(`[square-id="${startId - WIDTH}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 3}"]`).firstChild ||
				startId - WIDTH * 5 === targetId && !document.querySelector(`[square-id="${startId - WIDTH}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 4}"]`).firstChild ||
				startId - WIDTH * 6 === targetId && !document.querySelector(`[square-id="${startId - WIDTH}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 5}"]`).firstChild ||
				startId - WIDTH * 7 === targetId && !document.querySelector(`[square-id="${startId - WIDTH}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 4}"]`).firstChild  && !document.querySelector(`[square-id="${startId - WIDTH * 6}"]`).firstChild ||
				// --
				startId + 1 === targetId ||
				startId + 2 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild ||
				startId + 3 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild ||
				startId + 4 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild ||
				startId + 5 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild ||
				startId + 6 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 5}"]`).firstChild ||
				startId + 7 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild  && !document.querySelector(`[square-id="${startId + 6}"]`).firstChild ||
				// --
				startId - 1 === targetId ||
				startId - 2 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild ||
				startId - 3 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild ||
				startId - 4 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild ||
				startId - 5 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild ||
				startId - 6 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 5}"]`).firstChild ||
				startId - 7 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild  && !document.querySelector(`[square-id="${startId - 6}"]`).firstChild
				) {
				
				return true;
			}
			break;
		case 'queen':
			if (
				startId + WIDTH + 1 === targetId ||
				startId + WIDTH * 2 + 2 && !document.querySelector(`[square-id="${startId + WIDTH + 1}"]`).firstChild ||
				startId + WIDTH * 3 + 3 && !document.querySelector(`[square-id="${startId + WIDTH + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2 + 2}"]`).firstChild ||
				startId + WIDTH * 4 + 4 && !document.querySelector(`[square-id="${startId + WIDTH + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 3 + 3}"]`).firstChild ||
				startId + WIDTH * 5 + 5 && !document.querySelector(`[square-id="${startId + WIDTH + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 4 + 4}"]`).firstChild ||
				startId + WIDTH * 6 + 6 && !document.querySelector(`[square-id="${startId + WIDTH + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 5 + 5}"]`).firstChild ||
				startId + WIDTH * 6 + 6 && !document.querySelector(`[square-id="${startId + WIDTH + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 6 + 6}"]`).firstChild ||
				// --
				startId - WIDTH - 1 === targetId ||
				startId - WIDTH * 2 - 2 && !document.querySelector(`[square-id="${startId - WIDTH - 1}"]`).firstChild ||
				startId - WIDTH * 3 - 3 && !document.querySelector(`[square-id="${startId - WIDTH - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2 - 2}"]`).firstChild ||
				startId - WIDTH * 4 - 4 && !document.querySelector(`[square-id="${startId - WIDTH - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 3 - 3}"]`).firstChild ||
				startId - WIDTH * 5 - 5 && !document.querySelector(`[square-id="${startId - WIDTH - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 4 - 4}"]`).firstChild ||
				startId - WIDTH * 6 - 6 && !document.querySelector(`[square-id="${startId - WIDTH - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 5 - 5}"]`).firstChild ||
				startId - WIDTH * 6 - 6 && !document.querySelector(`[square-id="${startId - WIDTH - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 6 - 6}"]`).firstChild ||
				// --
				startId - WIDTH + 1 === targetId ||
				startId - WIDTH * 2 + 2 && !document.querySelector(`[square-id="${startId - WIDTH + 1}"]`).firstChild ||
				startId - WIDTH * 3 + 3 && !document.querySelector(`[square-id="${startId - WIDTH + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2 + 2}"]`).firstChild ||
				startId - WIDTH * 4 + 4 && !document.querySelector(`[square-id="${startId - WIDTH + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 3 + 3}"]`).firstChild ||
				startId - WIDTH * 5 + 5 && !document.querySelector(`[square-id="${startId - WIDTH + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 4 + 4}"]`).firstChild ||
				startId - WIDTH * 6 + 6 && !document.querySelector(`[square-id="${startId - WIDTH + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 5 + 5}"]`).firstChild ||
				startId - WIDTH * 6 + 6 && !document.querySelector(`[square-id="${startId - WIDTH + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 6 + 6}"]`).firstChild ||
				// --
				startId + WIDTH - 1 === targetId ||
				startId + WIDTH * 2 - 2 && !document.querySelector(`[square-id="${startId + WIDTH - 1}"]`).firstChild ||
				startId + WIDTH * 3 - 3 && !document.querySelector(`[square-id="${startId + WIDTH - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2 - 2}"]`).firstChild ||
				startId + WIDTH * 4 - 4 && !document.querySelector(`[square-id="${startId + WIDTH - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 3 - 3}"]`).firstChild ||
				startId + WIDTH * 5 - 5 && !document.querySelector(`[square-id="${startId + WIDTH - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - WIDTH * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 4 - 4}"]`).firstChild ||
				startId + WIDTH * 6 - 6 && !document.querySelector(`[square-id="${startId + WIDTH - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 5 - 5}"]`).firstChild ||
				startId + WIDTH * 6 - 6 && !document.querySelector(`[square-id="${startId + WIDTH - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + WIDTH * 6 - 6}"]`).firstChild
			) {
				return true;
			}
			break;
		case 'king':
			if (
				startId + 1 === targetId ||
				startId - 1 === targetId ||
				startId + WIDTH === targetId ||
				startId - WIDTH === targetId ||
				startId + WIDTH + 1 === targetId ||
				startId - WIDTH - 1 === targetId ||
				startId + WIDTH - 1 === targetId ||
				startId - WIDTH + 1 === targetId
			) {
				return true;
			}
			break;
		default:
			break;
	}
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

function getKeyByValue(obj, value) {
	for (const key of Object.keys(obj)) {
		if (obj[key] === value) {
			return key;
		}
	}
}

function checkForWin() {
	const kings = Array.from(document.querySelectorAll('#king'));
	if (!kings.some(king => king.firstChild.classList.contains('white'))) {
		infoDisplay.textContent = 'Black player wins!';
		const allSquares = document.querySelectorAll('.square');
		allSquares.forEach(square => square.firstChild && square.firstChild.setAttribute('draggable', 'false'));
	}

	if (!kings.some(king => king.firstChild.classList.contains('black'))) {
		infoDisplay.textContent = 'White player wins!';
		const allSquares = document.querySelectorAll('.square');
		allSquares.forEach(square => square.firstChild && square.firstChild.setAttribute('draggable', 'false'));
	}
}

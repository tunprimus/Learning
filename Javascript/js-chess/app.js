//@ts-check

const WIDTH = 8;

const gameBoard = document.querySelector('#gameboard');
const playerDisplay = document.querySelector('#player');
const infoDisplay = document.querySelector('#info-display');


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

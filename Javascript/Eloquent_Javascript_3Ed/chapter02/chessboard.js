/* Write a programme that creates a string that represents an 8 x 8 grid, using newline characters to separate lines. At each position of the grid there is either a space or a "#" character. The characters should form a chessboard.
Passing the string to console.log should show something like this:
 # # # #
# # # #
 # # # #
# # # #
 # # # #
# # # #
 # # # #
# # # #

When you have a working programme, then modify to define a binding size to make it more versatile
*/

const boardSize = 8;
let boardPattern = "";

if (boardSize % 2 !== 0) {
    console.log("Only even numbers are allowed in the board!");
} else {
    let spacer = " ";
    let marker = "#";
    // let boardPattern = "";
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if ((i + j) % 2 === 0) {
                boardPattern += spacer;
            } else {
                boardPattern += marker;
            }
        }
        boardPattern += "\n";
        // console.log(boardPattern);
    }
}
console.log(boardPattern);

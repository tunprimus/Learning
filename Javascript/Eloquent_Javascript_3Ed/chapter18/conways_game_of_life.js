/* Conway’s Game of Life is a simple simulation that creates artificial “life” on a grid, each cell of which is either alive or not. Each generation (turn), the following rules are applied:
• Any live cell with fewer than two or more than three live neighbors dies.
• Any live cell with two or three live neighbors lives on to the next generation.
• Any dead cell with exactly three live neighbors becomes a live cell.
A neighbour is defined as any adjacent cell, including diagonally adjacent ones.
Note that these rules are applied to the whole grid at once, not one square at a time. That means the counting of neighbors is based on the situation at the start of the generation, and changes happening to neighbour cells during this generation should not influence the new state of a given cell.
Implement this game using whichever data structure you find appropriate. Use Math.random to populate the grid with a random pattern
initially. Display it as a grid of checkbox fields, with a button next to it to advance to the next generation. When the user checks or unchecks the checkboxes, their changes should be included when computing the next generation.
*/

/* Probable Steps
- Create button to run simulation
- Create button to stop simulation
- Define minimum cell alive constant
- Define maximum cell alive constant
- May use array, object or Map data structure
- Generate grid
- Generate checkboxes of inputs and append to grid
- Randomly check some of the inputs at outset
- Check state of the game regularly
*/


/* Variables and constants */
const GRID_WIDTH = 19;
const GRID_HEIGHT = 11;
const GRID_AREA = GRID_WIDTH * GRID_HEIGHT;
const MIN_NEIGHBOURS_ALIVE = 2;
const MAX_NEIGHBOURS_ALIVE = 3;

const gridElement = document.getElementById("grid");
const nextElement = document.getElementById("next");
const runElement = document.getElementById("run");
const stopElement = document.getElementById("stop");

/* Grid Generation */

// Create checkboxes towards grid making
const checkboxes = [];
for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
        let cell = document.createElement("input");
        cell.type = "checkbox";
        gridElement.appendChild(cell);
        checkboxes.push(cell);
    }
    // Need to split the  arrays at the end of each row
    gridElement.appendChild(document.createElement("br"));
}

// Function to generate random values to mark checkboxes
function randomMarker() {
    let checkMark = [];
    for (let i = 0; i < GRID_AREA; i++) {
        // checkMark.push((Math.random() < 0.3) || (Math.random() > 0.7));
        checkMark.push(Math.random() > 0.8);
    }
    return checkMark;
}

function checkboxesToGrid() {
    return checkboxes.map(cell => cell.checked);
}

function gridToCheckboxes(grid) {
    grid.forEach((value, index) => checkboxes[index].checked = value);
}

gridToCheckboxes(randomMarker());


/* Handling Neighbours' Situation State */

// Count the total number of adjacent/touching neighbours around a cell
function countNeighbours(grid, x, y) {
    let counter = 0;
    // Loop through within the inner boundary of the whole array of grid
    for (let yp = Math.max(0, y -1); yp <= Math.min(GRID_HEIGHT - 1, y + 1); yp++) {
        for (let xp = Math.max(0, x - 1); xp <= Math.min(GRID_WIDTH - 1, xp + 1); xp++) {
            // Check to make sure that cell is within the boundary but not the index cell
            if ((xp != x || yp != y) && grid[xp + yp * GRID_WIDTH]) {
                counter++;
            }
        }
    }
    return counter;
}

// 
function nextGeneration(grid) {
    let newGrid = new Array(GRID_AREA);
    for (let y = 0; y < GRID_HEIGHT; y++) {
        for (let x = 0; x < GRID_WIDTH; x++) {
            let neighbours = countNeighbours(grid, x, y);
            let offset = x + y * GRID_WIDTH;
            if (neighbours < MIN_NEIGHBOURS_ALIVE || neighbours > MAX_NEIGHBOURS_ALIVE) {
                newGrid[offset] = false;
            } else if (neighbours === MIN_NEIGHBOURS_ALIVE) {
                newGrid[offset] = grid[offset];
            } else {
                newGrid[offset] = true;
            }
        }
    }
    return newGrid;
}

function updateGridForNextTurn() {
    gridToCheckboxes(nextGeneration(checkboxesToGrid()));
}


/* Handling The Simulation */

let simulate = null;

function runSimulation() {
    simulate = setInterval(() => {
        // Function to update the grid
        updateGridForNextTurn();
    }, 997);
    runElement.disabled = true;
    nextElement.disabled = true;
    stopElement.style.display = "inline-block";
}

function stopSimulation() {
    clearInterval(simulate);
    runElement.disabled = false;
    nextElement.disabled = false;
    stopElement.style.display = "none";
}

nextElement.addEventListener("click", updateGridForNextTurn);

runElement.addEventListener("click", runSimulation);

stopElement.addEventListener("click", stopSimulation);


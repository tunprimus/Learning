// Write a programme to show the 10 even and odd numbers within a range. Use both for and while loops.

function parityForLoop(startNum) {
    for (let i = startNum; i < (startNum + 10); i++) {
        if (i % 2 === 0) {
            console.log(`${i} is even.`);
        } else {
            console.log(`${i} is odd.`);
        }
    }
}

console.log(parityForLoop(1));
console.log(parityForLoop(5));
console.log(parityForLoop(10));


function parityWhileLoop(startNum) {
    let counter = 0;
    while (counter < 10) {
        if ((counter + startNum) % 2 === 0) {
            console.log(`${counter + startNum} is even.`);
        } else {
            console.log(`${counter + startNum} is odd.`);
        }
        counter++;
    }
}

console.log(parityWhileLoop(1));
console.log(parityWhileLoop(4));
console.log(parityWhileLoop(12));

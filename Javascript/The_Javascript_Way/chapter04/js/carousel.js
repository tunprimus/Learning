// Write a programme that launches a carousel for 10 turns, showing the turn number each time. When it is done, improve it so that the number of turns is given by the user.
// Use both a while loop and a for loop.

function carouselWhileLoop(option) {
    let counter = 0;
    while (counter < option) {
        console.log(`This is turn ${counter + 1}.`);
        counter++;
    }
}

console.log(carouselWhileLoop(10));

function carouselForLoop(option) {
    for (let i = 0; i < option; i++) {
        console.log(`This turn is number ${i + 1}.`);
    }
}

console.log(carouselForLoop(5));

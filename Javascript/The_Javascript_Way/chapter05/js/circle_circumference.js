// Write a programme containing two functions to calculate the circumference and area of a circle defined by its radius. Test it using user input.
// Use Math.PI and possibly the exponential operator ** to perform computations.

function calcCircleCircumference() {
    const radius = Number(prompt("What is the radius of your circle?"));
    return 2 * Math.PI * radius;
}

calcCircleCircumference();

// console.log(calcCircleCircumference());

function calcCircleArea() {
    const radius = Number(prompt("What is the radius of your circle?"));
    return Math.PI * radius ** 2;
}

calcCircleArea();

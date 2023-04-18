/* Write a programme that draws the following shapes on a canvas:
1. A trapezoid (a rectangle that is wider on one side);
2. A red diamond (a rectangle rotated 45 degrees or 1/4PI radians);
3. A zigzagging line;
4. A spiral made up of 100 straight line segments;
5. A yellow star.

Use the Math.cos and Math.sin functions to get coordinates on a circle.

Recommended to create a function for each shape while passing the position, size, number of points and other properties as parameters.
*/

let ctx0 = document.querySelectorAll("canvas")[0].getContext("2d");

const trapezoidMaker = (ctx, x, y, side1, side2, side3, fillColour) => {
    // ctx = ctx;
    ctx.strokeStyle = fillColour;
    ctx.fillStyle = fillColour;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + side1, y);
    ctx.lineTo(x + side1, y + side2);
    ctx.lineTo(x + side1 - side3, y + side2);
    ctx.stroke();
    ctx.fill();
}
trapezoidMaker(ctx0, 10, 10, 100, 50, 80, "yellow");

let ctx1 = document.querySelectorAll("canvas")[1].getContext("2d");

// Centre to rotate function that is similar to the flipHorizontally function in the chapter example
const centreToRotate = (originX, originY, sideX, sideY) => {
    let newX = (originX + sideX) / 2;
    let newY = (originY + sideY) / 2;
    return {newX, newY};
};

const diamondMaker = (ctx, x, y, rotation, side1, side2, fillColour) => {
    ctx.fillStyle = fillColour;
    
    const { newX, newY } = centreToRotate(x, y, side1, side2);
    
    ctx.translate(newX, newY);
    ctx.rotate(rotation * Math.PI / 180);
    ctx.translate(-newX, -newY);
    ctx.fillRect(newX, y, side1, side2);
};
diamondMaker(ctx1, 10, 10, 45, 80, 80, "red");


let ctx2 = document.querySelectorAll("canvas")[2].getContext("2d");

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomIntExclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

const zigZagLineMaker = (ctx, startX, startY, numberOfLines) => {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    for (let i = startX, j = startY; i < numberOfLines, j < numberOfLines; i++, j++) {
        // ctx.moveTo(startX, startY);
        ctx.lineTo((i + getRandomInt(numberOfLines * 5)), (j+ getRandomInt(numberOfLines * 7)));
    }
    ctx.stroke();
};
zigZagLineMaker(ctx2, 15, 15, 50);


let ctx3 = document.querySelectorAll("canvas")[3].getContext("2d");

const spiralMaker = (ctx, centreX, centreY, startRadius, numberOfLines) => {
    ctx.beginPath();
    // ctx.moveTo(centreX, centreY);

    let startSpiral = 0;
    let endSpiral = 0.1;
    for (let i = 0; i < numberOfLines; i++) {
        // ctx.beginPath();
        ctx.arc(centreX, centreY, startRadius, startSpiral, endSpiral);
        startRadius += 5;
        // startSpiral++;
        endSpiral++;
        ctx.moveTo(centreX + startRadius, centreY);
    }
    ctx.stroke();
};
spiralMaker(ctx3, 525, 525, 10, 100);

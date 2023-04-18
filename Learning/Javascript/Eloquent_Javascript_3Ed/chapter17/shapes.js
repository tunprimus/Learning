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

const trapezoidMaker = (ctx, x, y, side1, side2, side3, side4, fillColour) => {
    // ctx = ctx;
    ctx.strokeStyle = fillColour;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + side1, y);
    ctx.lineTo(x + side1, y + side2);
    ctx.lineTo(x + side1 - side3, y + side2);
    // ctx.lineTo();
    // ctx.lineTo();
    // ctx.lineTo();
    ctx.stroke();
    ctx.fill();
}

trapezoidMaker(ctx0, 10, 10, 100, 50, 80, 50, "yellow");

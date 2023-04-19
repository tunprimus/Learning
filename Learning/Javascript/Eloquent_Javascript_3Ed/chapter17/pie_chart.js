/* Earlier in the chapter, we saw an example programme that drew a pie chart. Modify this programme so that the name of each category is shown next to the slice that represents it.
Try to find a pleasing-looking way to automatically position this text that would work for other data sets as well. You may assume that categories are big enough to leave ample room for their labels.
You might need Math.sin and Math.cos again, which are described in Chapter 14.
*/

const results = [
    {name: "Satisfied", count: 1043, color: "lightblue"},
    {name: "Neutral", count: 563, color: "lightgreen"},
    {name: "Unsatisfied", count: 510, color: "pink"},
    {name: "No comment", count: 175, color: "silver"}
];

let ctx0 = document.querySelectorAll("canvas")[0].getContext("2d");

/* 
let total = results.reduce((sum, {count}) => sum + count, 0);
// Start at the top
let currentAngle = -0.5 * Math.PI;
for (let result of results) {
    let sliceAngle = (result.count / total) * 2 * Math.PI;
    cx7.beginPath();
    // centre = 100, 100, radius = 100
    // from current angle, clockwise by slice's angle
    cx7.arc(100, 100, 100, currentAngle, currentAngle + sliceAngle);
    currentAngle += sliceAngle;
    cx7.lineTo(100, 100);
    cx7.fillStyle = result.color;
    cx7.fill();
}
 */


const pieChartMaker = (objectsArray, ctx, xCoord, yCoord, radius) => {
    let centreX = xCoord + (radius / 2);
    let centreY = yCoord + (radius / 2);
    let total = objectsArray.reduce((sum, {count}) => sum + count, 0);
    let currentAngle = -0.5 * Math.PI;
    for (let object of objectsArray) {
        let sliceAngle = (object.count / total) * 2 * Math.PI;
        ctx.beginPath();
        ctx.arc(centreX, centreY, radius, currentAngle, currentAngle + sliceAngle);
        currentAngle += sliceAngle;
        ctx.lineTo(centreX, centreY);
        ctx.fillStyle = object.color;
        ctx.fill();
    }
};
pieChartMaker(results, ctx0, 100, 100, 100);

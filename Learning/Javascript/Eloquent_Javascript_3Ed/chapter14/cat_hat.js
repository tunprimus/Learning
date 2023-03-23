/* Extend the cat animation defined earlier so that both the cat and his hat (<img src="img/hat.png">) orbit at opposite sides of the ellipse.
Or make the hat circle around the cat. Or alter the animation in some other interesting way.
To make positioning multiple objects easier, it is probably a good idea to switch to absolute positioning. This means that top and left are counted relative to the top left of the document. To avoid using negative coordinates, which would cause the image to move outside of the visible page, you can add a fixed number of pixels to the position values.
*/

let cat = document.querySelector("#cat");
let hat = document.querySelector("#hat");

let angle = 0;
// let angle = Math.PI / 2;
let angle2 = 0;
let lastTime = null;

function animate(time) {
    if (lastTime != null) {
        angle += (time - lastTime) * 0.001;
        angle2 -= (time - lastTime) * 0.001;
    }
    lastTime = time;
    // y-coordinate with unit
    cat.style.top = (Math.sin(angle) * 40 + 40) + "px";
    // x-coordinate with unit
    cat.style.left = (Math.cos(angle) * 200 + 230) + "px";

    // Your extensions here.
    // y-coordinate with unit
    hat.style.top = (Math.sin(angle2) * 80 + 80) + "px";
    // x-coordinate with unit
    hat.style.right = (Math.cos(angle2) * 200 + 230) + "px";

    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);


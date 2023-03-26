/* One of these was the mouse trail — a series of elements that would follow the mouse pointer as you moved it across the page.
In this exercise, I want you to implement a mouse trail. Use absolutely positioned <div> elements with a fixed size and background colour (refer to the code in the “Mouse Clicks” section for an example). Create a bunch of such elements and, when the mouse moves, display them in the wake of the mouse pointer.
There are various possible approaches here. You can make your solution as simple or as complex as you want. A simple solution to start with is to keep a fixed number of trail elements and cycle through them, moving the next one to the mouse’s current position every time a "mousemove" event occurs.
*/

const dotElements = document.querySelector("#dot");

dotElements.addEventListener("mousemove", event => {
    let trail = document.createElement("div");
    trail.className = "trail";
    trail.style.left = (event.pageX - 4) + "px";
    trail.style.top = (event.pageY - 4) + "px";
    document.body.appendChild(trail);
});




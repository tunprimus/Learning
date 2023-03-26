/* Write a page that displays a balloon (using the balloon emoji, 🎈).
When you press the up arrow, it should inflate (grow) 10 percent, and when you press the down arrow, it should deflate (shrink) 10 percent.
You can control the size of text (emoji are text) by setting the font-size CSS property (style.fontSize) on its parent element. Remember to include a unit in the value—for example, pixels (10px).
The key names of the arrow keys are "ArrowUp" and "ArrowDown".
Make sure the keys change only the balloon, without scrolling the page.
When that works, add a feature where, if you blow up the balloon past a certain size, it explodes. In this case, exploding means that it is replaced with an 💥 emoji, and the event handler is removed (so that you can’t inflate or deflate the explosion).
*/

function balloonHandler() {
    let balloonElement = document.querySelector("p");
    console.log(balloonElement);
    balloonElement.style.fontSize = "40px";
    const balloonElementCompStyle = window.getComputedStyle( balloonElement);
    
    let balloonElementCurrentSize = parseFloat(balloonElementCompStyle.fontSize);
    console.log(balloonElementCurrentSize);
    
    let sizeFactor = 0.1;
    function balloonInflater() {
        window.addEventListener("keydown", event => {
            if (event.key == "ArrowUp") {
                sizeFactor++;
                let newSize = `${balloonElementCurrentSize + sizeFactor}`;
                if (newSize > 80) {
                    balloonElement.innerHTML = "💥";
                    balloonElement.removeEventListener();
                }
                balloonElement.style.fontSize = newSize + "px";
                console.log(balloonElement.style.fontSize);
                event.preventDefault();
            } else if (event.key == "ArrowDown") {
                sizeFactor++;
                let newSize = `${balloonElementCurrentSize - sizeFactor}`;
                balloonElement.style.fontSize = newSize + "px";
                console.log(balloonElement.style.fontSize);
                event.preventDefault();
            }
        });
    }
    balloonInflater();
/* 
    if (Number(balloonElement.style.fontSize.valueOf) > 120) {
        balloonElement.innerHTML = "💥";
        balloonElement.removeEventListener("keydown", balloonInflater);
    }
     */
}

balloonHandler();

/* Make it possible to pause (suspend) and unpause the game by pressing the Esc key. This can be done by changing the runLevel function to use another keyboard event handler and interrupting or resuming the animation
whenever the Esc key is hit.
The runAnimation interface may not look like it is suitable for this at first glance, but it is if you rearrange the way runLevel calls it.
When you have that working, there is something else you could try. The way we have been registering keyboard event handlers is somewhat problematic. The arrowKeys object is currently a global binding, and its event handlers are kept around even when no game is running. You could say they leak out of our system. Extend trackKeys to provide a way to unregister its handlers and then change runLevel to register its handlers when it starts and unregister them again when it is finished.
*/

// Handling the level of the game to play
function runLevel(level, Display) {
    let display = new Display(document.body, level);
    let state = State.start(level);
    let ending = 1;
    let active = "yes";

    return new Promise(resolve => {
        // Escape handler
        function escapeHandler(event) {
            if (event.key != "Escape") {
                return;
            }
            event.preventDefault();
            if (active == "no") {
                active = "yes";
                runAnimation(frame);
            } else if (active == "yes") {
                active = "pausing";
            } else {
                active = "yes";
            }
        }
        window.addEventListener("keydown", escapeHandler);
        const arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);

        // Handling the frame
        function frame(time) {
            if (active == "pausing") {
                active = "no";
                return false;
            }

            state = state.update(time, arrowKeys);
            display.syncState(state);
            if (state.status == "playing") {
                return true;
            } else if (ending > 0) {
                ending -= time;
                return true;
            } else {
                display.clear();
                window.removeEventListener("keydown", escapeHandler);
                arrowKeys.unregister();
                resolve(state.status);
                return false;
            }
        }
        runAnimation(frame);
    });
}

// Tracking the active keyboard keys - modify earlier function to include unregister() method
function trackKeys(keys) {
    let down = Object.create(null);
    function track(event) {
        if (keys.includes(event.key)) {
            down[event.key] = event.type === "keydown";
            event.preventDefault();
        }
    }
    window.addEventListener("keydown", track);
    window.addEventListener("keyup", track);
    // Unregister method
    down.unregister = () => {
        window.removeEventListener("keydown", track);
        window.removeEventListener("keyup", track);
    };
    return down;
}

runGame(GAME_LEVELS, DOMDisplay);

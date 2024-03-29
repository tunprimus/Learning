/* It’s traditional for platform games to have the player start with a limited number of lives and subtract one life each time they die. When the player is out of lives, the game restarts from the beginning.
Adjust runGame to implement lives. Have the player start with three.
Output the current number of lives (using console.log) every time a level starts.
*/

async function runGame(plans, Display) {
    let currentLives = 3;
    for (let level = 0; level < plans.length;) {
        console.log(`Level ${level + 1}, lives: ${currentLives}`);
        let status = await runLevel(new Level(plans[level]), Display);
        if (status == "won") {
            level++;
        } else if (status == "lost") {
            currentLives--;
            console.log(`You have ${currentLives} live(s) left!`);
        }
        if (currentLives < 1) {
            level = 0;
            console.log(`Game over! \nOut of lives with ${currentLives} live!`);
            currentLives = 3;
            // break;
        }
        // console.log("You have won!");
    }
    console.log("You have won!");
}
runGame(GAME_LEVELS, DOMDisplay);

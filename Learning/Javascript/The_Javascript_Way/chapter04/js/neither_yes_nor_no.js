// Write a programme that plays "neither yes, nor no" with the user. Specifically, the programme asks the user to enter text until either "yes" or "no" is typed, which ends the game.

let userString = "";

while (1) {
    userString = prompt("Enter a string:");
    if ((userString === "yes") || (userString === "no")) {
        console.log("Game over!");
        break;
    }
}

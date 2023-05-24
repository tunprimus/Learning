// Write a programme that asks for time under the form of three information (hours, minutes, seconds). The programme calculates and shows the time one second after. Incorrect inputs must be taken into account.

/*
This is not as simple as it seems ... Look at the following results

14h17m59s => 14h18m0s
6h59m59s => 7h0m0s
23h59m59s => 0h0m0s (midnight)
*/

let timeHr = null;
let timeMin = null;
let timeSec = null;

do {
    timeHr = Number(prompt("Enter valid hour value(0 - 23):"));
    timeMin = Number(prompt("Enter valid minute value (0 - 59):"));
    timeSec = Number(prompt("Enter valid second value (0 - 59):"));

    let newSec = timeSec;
    let newMin = timeMin;
    let newHr = timeHr;

    newSec++;
    if (newSec > 59) {
        newSec = 0;
        newMin++;
        // return newMin++;
    }
    if (newMin > 59) {
        newHr++;
        newMin = 0;
        // return newHr++;
    }
    if (newHr > 23) {
        newHr = 0;
        // return newHr = 0;
    }
    console.log(`Next time after one second is: ${newHr}h${newMin}m${newSec}.`);
}
while (((timeHr || timeMin || timeSec) < 0) || ((timeMin || timeSec) > 59) || (timeHr > 23));

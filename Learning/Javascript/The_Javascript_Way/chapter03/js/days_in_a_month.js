// Write a programme that accepts a month number (between 1 and 12), then shows the number of days of that month. Leap years are excluded. incorrect input must be taken into account.

/*
28 days = February [2]
30 days = September, April, June and November [4, 6, 9, 11]
31 days = all others [1, 3, 5, 7, 8, 10, 12]
*/

do {
    var monthNumber = Number(prompt("Enter month number from 1 - 12:"));
}
while (monthNumber < 1 || monthNumber > 12);

switch (monthNumber) {
    case 2:
        console.log(`Month ${monthNumber} has 28 days.`);
        break;
    case 4:
    case 6:
    case 9:
    case 11:
        console.log(`Month ${monthNumber} has 30 days.`);
        break;
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
        console.log(`Month ${monthNumber} has 31 days.`);
        break;
    default:
        console.log("Invalid month number!");
        break;
}

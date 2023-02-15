// Write a programme that accepts a day name from the user, then shows the name of the following day. Incorrect inputs must be taken into account.

const todayName = prompt("What is today?");
let tomorrowName = null;

switch (todayName) {
    case "Sunday":
        if (todayName === "Sunday" || todayName === "sunday") {
            tomorrowName = "Monday";
        }
        break;
    case "Monday":
        if (todayName === "Monday" || todayName === "monday") {
            tomorrowName = "Tuesday";
        }
        break;
    case "Tuesday":
        if (todayName === "Tuesday" || todayName === "tuesday") {
            tomorrowName = "Wednesday";
        }
        break;
    case "Wednesday":
        if (todayName === "Wednesday" || todayName === "wednesday") {
            tomorrowName = "Thursday";
        }
        break;
    case "Thursday":
        if (todayName === "Thursday" || todayName === "thursday") {
            tomorrowName = "Friday";
        }
        break;
    case "Friday":
        if (todayName === "Friday" || todayName === "friday") {
            tomorrowName = "Saturday";
        }
        break;
    case "Saturday":
        if (todayName === "Saturday" || todayName === "saturday") {
            tomorrowName = "Sunday";
        }
        break;
    default:
        console.log("You have entered an invalid day!")
        break;
    console.log(`Tomorrow is ${tomorrowName}`);
}

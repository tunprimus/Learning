// Write a programme that continue to ask the user for a number until the entered number is less than or equal to 100. When you are done, improve the programme so that the terminating number is between 50 and 100.

function validate100() {
    let num = null;

    do {
        num = Number(prompt("Enter a number:"));
    }
    while (num > 99);
}

validate100();

function validate50to100() {
    let num = null;

    do {
        num = Number(prompt("Enter a number:"));
    }
    while ((num < 50) || (num > 100));
}

validate50to100();

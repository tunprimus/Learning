// Write a programme that asks the user for a number, then shows the multiplication table for this number.

function multiplyTable() {
    let num = null;

    num = Number(prompt("Enter a number to multiply:"));

    if (num < 2 || num > 9) {
        console.log("Number is out of range!");
    } else {
        let i = 1;
        while (i <= 12) {
            console.log(`${num} x ${i} = ${num * i}`);
            i++;
        }
    }
}

multiplyTable();

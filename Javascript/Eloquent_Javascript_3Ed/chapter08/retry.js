/* Write a function that wraps around a function primitiveMultiply that has an exception of type MultiplicatorUnitFailure.
primitiveMultiply multiplies two numbers in 20 % of cases but raises the exception in the other 80 % of cases.
Must handle only the right exceptions.
*/

class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(num1, num2) {
    let trigger = Math.floor(Math.random() * (6 - 1) + 1);
    // return trigger;
    let counter = 0;
    let product = 0;
    if ((trigger !== 1) && (trigger % 2 !== 0)) {
        product = num1 * num2;
    } else {
        return ("Invalid timing!");
    }
    return product;
};

function errorTester() {
    let counter = 0;
    let resultArray = [];
    while (counter < 20) {
        try {
            resultArray.push(primitiveMultiply(10, 5));
            // resultArray.push(primitiveMultiply(10, "home"));
        } catch (e) {
            if (e instanceof MultiplicatorUnitFailure) {
                return resultArray.push(console.log(e));
            } else {
                throw e;
            }
        }
        counter++;
    }
    return resultArray;
}

// console.log(primitiveMultiply(5, 8));
// console.log(errorTester());
console.table(errorTester());

/* Book solution */
function primitiveMultiplyBook(a, b) {
    if (Math.random() < 0.2) {
        return a * b;
    } else {
        throw new MultiplicatorUnitFailure("Klunk");
    }
}

function reliableMultiply(a, b) {
    for (;;) {
        try {
            return primitiveMultiplyBook(a, b);
        } catch (e) {
            if (!(e instanceof MultiplicatorUnitFailure)) {
                throw e;
            }
        }
    }
}
console.log(reliableMultiply(8, 8)); // → 64
console.log(reliableMultiply(8, "dud"));

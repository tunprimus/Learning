// Programme to square numbers.

function square1(x) {
    return x * x;
}

square1();

console.log(square1(0));
console.log(square1(2));
console.log(square1(5));

const square2 = x => x * x;

square2();

console.log(square2(0));
console.log(square2(2));
console.log(square2(5));

function squareNumbers(start, end) {
    for (let i = start; i <= end; i++) {
        console.log(`${i * i}`);
    }
}

console.log(squareNumbers(0, 10));

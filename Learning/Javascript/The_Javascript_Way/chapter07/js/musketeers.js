/* Write a programme that:
- Creates an array named musketeers containing values "Athos", "Porthos" and "Aramis";
- Shows each array element using a for loop;
- Adds the "D'Artagnan" value to the array;
- Shows each array element using the forEach() method;
- Remove poor Aramis;
- Shows each array element using a for-of loop.
*/

const musketeers = ["Athos", "Porthos", "Aramis"];

for (let i = 0; i < musketeers.length; i++) {
    console.log(musketeers[i]);
}

musketeers.push("D'Artagnan");

musketeers.forEach(musketeer => {console.log(musketeer)});

musketeers.splice(2, 1);

for (const musketeer of musketeers) {
    console.log(musketeer);
}

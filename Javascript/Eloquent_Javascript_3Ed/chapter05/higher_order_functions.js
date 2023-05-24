// Higher order functions

// Abstract doing something N number of times
function repeatLog(n) {
    for (let i = 0; i < n; i++) {
        console.log(i);
    }
}

// Abstract doing something with functions
function repeat(n, action) {
    for (let i = 0; i < n; i++) {
        action(i);
    }
}

// Repeat action with on the spot created function
let labels = [];
repeat(5, i => {
    labels.push(`Unit ${i + 1}`);
});
console.log(labels);

// Functions to create new functions
function greaterThan(n) {
    return m => m > n;
}
let greaterThan10 = greaterThan(10);
console.log(greaterThan10(11));

// Functions that change other functions
function noisy(func) {
    return (...args) => {
        console.log("calling with", args);
        let result = func(...args);
        console.log("called with", args, ", returned", result);
        return result;
    };
}
noisy(Math.min)(3, 2, 1);

// Functions that provide control flow
function unless(test, then) {
    if (!test) {
        then();
    }
}

repeat(3, n => {
    unless(n % 2 === 1, () => {
        console.log(n, "is even");
    });
});

// Higher order function to filter an array to form a new array without modifying the original.
function filter(array, test) {
    let passed = [];
    for (let element of array) {
        if (test(element)) {
            passed.push(element);
        }
    }
    return passed;
}
console.log(filter(SCRIPTS, script => script.living)); // → [{name: "Adlam", …}, …]
console.log(SCRIPTS.filter(s => s.direction == "ttb")); // → [{name: "Mongolian", …}, …]

// Transform elements of an array without mutation
function map(array, transform) {
    let mapped = [];
    for (let element of array) {
        mapped.push(transform(element));
    }
    return mapped;
}
let rtlScripts = SCRIPTS.filter(s => s.direction == "rtl");
console.log(map(rtlScripts, s => s.name)); // → ["Adlam", "Arabic", "Imperial Aramaic", …]

// Summarise into a single value with reduce
function reduce(array, combineFunction, start) {
    let current = start;
    for (let element of array) {
        current = combineFunction(current, element);
    }
    return current;
}
console.log(reduce([1, 2, 3, 4], (a, b) => a + b, 0)); // → 10

// To use reduce (twice) to find the script with the most characters
function characterCount(script) {
    return script.ranges.reduce((count, [from, to]) => {
        return count + (to - from);
    }, 0);
}
console.log(SCRIPTS.reduce((a, b) => {
    return characterCount(a) < characterCount(b) ? b : a;
})); // → {name: "Han", …}

// Composability with higher-order functions
function average(array) {
    return array.reduce((a, b) => a + b) / array.length;
}
console.log(Math.round(average(SCRIPTS.filter(s => s.living).map(s => s.year)))); // → 1165
console.log(Math.round(average(SCRIPTS.filter(s => !s.living).map(s => s.year)))); // → 204

// Find character script
function characterScript(code) {
    for (let script of SCRIPTS) {
        if (script.ranges.some(([from, to]) => {
            return code >= from && code < to;
        })) {
            return script;
        }
    }
    return null;
}
console.log(characterScript(121)); // -> {name: "Latin", ...}

// To count the characters that belong to each script.
function countBy(items, groupName) {
    let counts = [];
    for (let item of items) {
        let name = groupName(item);
        let known = counts.findIndex(c => c.name === name);
        if (known === -1) {
            counts.push({name, count: 1});
        } else {
            counts[known].count++;
        }
    }
    return counts;
}
console.log(countBy([1, 2, 3, 4, 5], n => n > 2));

function textScripts(text) {
    let scripts = countBy(text, char => {
        let script = characterScript(char.codePointAt(0));
        return script ? script.name : "none";
    }).filter(({name}) => name != "none");

    let total = scripts.reduce((n, {count}) => n + count, 0);
    if (total === 0) {
        return "No scripts found";
    }
    return scripts.map(({name, count}) => {
        return `${Math.round(count * 100 / total)}% ${name}`;
    }).join(", ");
}

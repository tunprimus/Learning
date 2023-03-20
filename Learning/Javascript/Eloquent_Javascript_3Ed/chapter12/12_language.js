/* Example codes given in the book chapter
*/

function parseExpression(programme) {
    // Skips any leading space
    programme = skipSpace(programme);
    let match, expr;
    // Detect supported strings, numbers and words to create different data structures
    if ((match = /^"([^"]*)"/.exec(programme))) {
        expr = { type: "value", value: match[1] };
    } else if ((match = /^\d+\b/.exec(programme))) {
        expr = { type: "value", value: Number(match[0]) };
    } else if ((match = /^[^\s(),#"]+/.exec(programme))) {
        expr = { type: "word", name: match[0] };
    } else {
        throw new SyntaxError("Unexpected syntax: " + programme);
    }

    // Checks if expression is an application
    return parseApply(expr, programme.slice(match[0].length));
}

// Removes leading whitespace
function skipSpace(string) {
    let first = string.search(/\S/);
    if (first == -1) return "";
    return string.slice(first);
}

// Check if expression is an application - then parses parenthesised list of arguments
function parseApply(expr, programme) {
    programme = skipSpace(programme);
    // If not an opening parenthesis - not an application
    if (programme[0] != "(") {
        return { expr: expr, rest: programme };
    }

    programme = skipSpace(programme.slice(1));
    // Create syntax tree object via indirect recursion
    expr = { type: "apply", operator: expr, args: [] };
    while (programme[0] != ")") {
        let arg = parseExpression(programme);
        expr.args.push(arg.expr);
        programme = skipSpace(arg.rest);
        if (programme[0] == ",") {
            programme = skipSpace(programme.slice(1));
        } else if (programme[0] != ")") {
            throw new SyntaxError("Expected ',' or ')'");
        }
    }
    return parseApply(expr, programme.slice(1));
}

function parse(programme) {
    let { expr, rest } = parseExpression(programme);
    if (skipSpace(rest).length > 0) {
        throw new SyntaxError("Unexpected text after program");
    }
    return expr;
}

console.log(parse("+(a, 10)"));
//    operator: {type: "word", name: "+"},
//    args: [{type: "word", name: "a"},
//           {type: "value", value: 10}]}

var specialForms = Object.create(null);

function evaluate(expr, scope) {
    if (expr.type == "value") {
        return expr.value;
    } else if (expr.type == "word") {
        if (expr.name in scope) {
            return scope[expr.name];
        } else {
            throw new ReferenceError(`Undefined binding: ${expr.name}`);
        }
    } else if (expr.type == "apply") {
        let { operator, args } = expr;
        if (operator.type == "word" && operator.name in specialForms) {
            return specialForms[operator.name](expr.args, scope);
        } else {
            let op = evaluate(operator, scope);
            if (typeof op == "function") {
                return op(...args.map((arg) => evaluate(arg, scope)));
            } else {
                throw new TypeError("Applying a non-function.");
            }
        }
    }
}

// Acts like the ternary (conditional) operator in Javascript
specialForms.if = (args, scope) => {
    if (args.length != 3) {
        throw new SyntaxError("Wrong number of args to if");
    } else if (evaluate(args[0], scope) !== false) {
        return evaluate(args[1], scope);
    } else {
        return evaluate(args[2], scope);
    }
};

specialForms.while = (args, scope) => {
    if (args.length != 2) {
        throw new SyntaxError("Wrong number of args to while");
    }
    while (evaluate(args[0], scope) !== false) {
        evaluate(args[1], scope);
    }

    // Since undefined does not exist in Egg, we return false,
    // for lack of a meaningful result.
    return false;
};

// Executes all arguments from top to bottom; with its value produced by prior argument
specialForms.do = (args, scope) => {
    let value = false;
    for (let arg of args) {
        value = evaluate(arg, scope);
    }
    return value;
};

// To create new bindings and give them values
specialForms.define = (args, scope) => {
    if (args.length != 2 || args[0].type != "word") {
        throw new SyntaxError("Incorrect use of define");
    }
    let value = evaluate(args[1], scope);
    scope[args[0].name] = value;
    return value;
};

// Object for global scope
var topScope = Object.create(null);

topScope.true = true;
topScope.false = false;

// Evaluating a simple expression that negates a Boolean value
let prog = parse(`if(true, false, true)`);
console.log(evaluate(prog, topScope)); // → false

// To supply basic arithmetic and comparison operators; using a loop
for (let op of ["+", "-", "*", "/", "==", "<", ">"]) {
    topScope[op] = Function("a, b", `return a ${op} b;`);
}

// To output values
topScope.print = (value) => {
    console.log(value);
    return value;
};

// Parses a programme and runs it in a fresh scope
function run(programme) {
    return evaluate(parse(programme), Object.create(topScope));
}

// Test sample programme
run(`
do(define(total, 0),
    define(count, 1),
    while(<(count, 11),
        do(define(total, +(total, count)),
            define(count, +(count, 1)))),
    print(total))
`); // → 55

// Function construct
specialForms.fun = (args, scope) => {
    if (!args.length) {
        throw new SyntaxError("Functions need a body");
    }
    let body = args[args.length - 1];
    let params = args.slice(0, args.length - 1).map((expr) => {
        if (expr.type != "word") {
            throw new SyntaxError("Parameter names must be words");
        }
        return expr.name;
    });

    return function () {
        if (arguments.length != params.length) {
            throw new TypeError("Wrong number of arguments");
        }
        let localScope = Object.create(scope);
        for (let i = 0; i < arguments.length; i++) {
            localScope[params[i]] = arguments[i];
        }
        return evaluate(body, localScope);
    };
};

// Test samples running in local scope.
run(`
do(define(plusOne, fun(a, +(a, 1))),
    print(plusOne(10)))
`); // → 11

run(`
do(define(pow, fun(base, exp,
        if(==(exp, 0),
            1,
            *(base, pow(base, -(exp, 1)))))),
    print(pow(2, 10)))
`); // → 1024

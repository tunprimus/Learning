/* Currently, the only way to assign a binding a value is define. This construct acts as a way both to define new bindings and to give existing ones a new value.
This ambiguity causes a problem. When you try to give a nonlocal binding a new value, you will end up defining a local one with the same name instead. Some languages work like this by design, but I’ve always found it an awkward way to handle scope.
Add a special form set, similar to define, which gives a binding a new value, updating the binding in an outer scope if it doesn’t already exist in the inner scope. If the binding is not defined at all, throw a ReferenceError (another standard error type).
The technique of representing scopes as simple objects, which has made things convenient so far, will get in your way a little at this point. You might want to use the Object.getPrototypeOf function, which returns the prototype of an object. Also remember that scopes do not derive from Object.prototype, so if you want to call hasOwnProperty on them, you have to use this clumsy expression:
Object.prototype.hasOwnProperty.call(scope, name);
*/

/*
A simple programme written in Egg language
----------------------------------------

do(define(x, 10),
    if(>(x, 5),
        print("large"),
        print("small")))

A Simple Example of an Expression Object
----------------------------------------

The >(x, 5) part of the previous programme would be represented like this:

{
    type: "apply",
    operator: {type: "word", name: ">"},
    args: [
        {type: "word", name: "x"},
        {type: "value", value: 5}
    ]
}
*/

// A kind of union of define and evaluate functions in the `egg language`.
specialForms.set = (args, scope) => {
    if (args.length != 2 || args[0].type != "word") {
        throw new SyntaxError("Incorrect use of set");
    }

    // Using name value obtained from the 1st argument object
    const varName = args[0].name;

    // Evaluate act as the interpreter to return a value
    const varValue = evaluate(args[1], scope);

    // Partial infinite loop
    for (;scope;) {
        if (Object.hasOwnProperty.call(scope, varName)) {
            scope[varName] = varValue;
            return varValue;
        }
        scope = Object.getPrototypeOf(scope);
    }
    throw new ReferenceError(`Referencing an undefined binding: ${varName}`);
};

run(`
do(define(x, 4),
    define(setx, fun(val, set(x, val))),
    setx(50),
    print(x))
`); // → 50

run(`set(quux, true)`); // → Some kind of ReferenceError

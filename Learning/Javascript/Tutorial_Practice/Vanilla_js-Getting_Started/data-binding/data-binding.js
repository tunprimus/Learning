/* Client-side JavaScript Databinding without a Framework

This module brought to you by Vanilla.js
https://blog.jeremylikness.com/blog/client-side-javascript-databinding-without-a-framework/
*/

/* Observing changes */

// Keep track of a value, allowing listeners to subscribe to changes and notifying listeners when the value mutates

class Observable {
    constructor(value) {
        this._listeners = [];
        this._value = value;
    }
    notify() {
        this._listeners.forEach(listener => listener(this._value));
    }
    subscribe(listener) {
        this._listeners.push(listener);
    }
    get value() {
        return this._value;
    }
    set value(val) {
        if (val !== this._value) {
            this._value = val;
            this.notify();
        }
    }
}

const name = new Observable("Jeremy");
name.subscribe((newVal) => console.log(`Name changed to ${newVal}`));
name.value = "Doreen";

/* Computed Values (“Observable Chains”) */

// Keeps track of the function that computes the new property, understanding the dependencies and subscribing to changes in the dependencies in order to re-evaluate the computed properties

class Computed extends Observable {
    constructor(value, deps) {
        super(value());
        const listener = () => {
            this._value = value();
            this.notify();
        };
        deps.forEach(dep => dep.subscribe(listener));
    }
    get value() {
        return this._value;
    }
    set value(_) {
        throw "Cannot set computed property";
    }
}

const first = new Observable("Jeremy");
const last = new Observable("Likeness");
const full = new Computed(() => `${first.value} ${last.value}`.trim(), [first, last]);
first.value = "Doreen";
console.log(full.value);

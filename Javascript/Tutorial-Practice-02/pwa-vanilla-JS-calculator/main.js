//@ts-check

const open = document.getElementById('open-par');
const close = document.getElementById('close-par');
const display = document.getElementById('display');
const add = document.getElementById('add');
const subtract = document.getElementById('minus');
const multiply = document.getElementById('multiply');
const divide = document.getElementById('divide');
const dot = document.getElementById('dot');
const zero = document.getElementById('zero');
const one = document.getElementById('one');
const two = document.getElementById('two');
const three = document.getElementById('three');
const four = document.getElementById('four');
const five = document.getElementById('five');
const six = document.getElementById('six');
const seven = document.getElementById('seven');
const eight = document.getElementById('eight');
const nine = document.getElementById('nine');
const equalTo = document.getElementById('equal-to');
const del = document.getElementById('delete');

/**
 * Display.value tells the web browser to display whatever the value
 */
open.addEventListener('click', function() {
	display.value += '(';
});

close.addEventListener('click', function() {
	display.value += ')';
});

one.addEventListener('click', function() {
	display.value += '1';
});

two.addEventListener('click', function() {
	display.value += '2';
});

three.addEventListener('click', function() {
	display.value += '3';
});

four.addEventListener('click', function() {
	display.value += '4';
});

five.addEventListener('click', function() {
	display.value += '5';
});

six.addEventListener('click', function() {
	display.value += '6';
});

seven.addEventListener('click', function() {
	display.value += '7';
});

eight.addEventListener('click', function() {
	display.value += '8';
});

nine.addEventListener('click', function() {
	display.value += '9';
});

zero.addEventListener('click', function() {
	display.value += '0';
});

dot.addEventListener('click', function() {
	display.value += '.';
});

del.addEventListener('click', function() {
	display.value = '';
});

equalTo.addEventListener('click', function() {
	try {
		display.value = eval(display.value);
	} catch (err) {
		display.value = 'WRONG INPUT';
	}
});

add.addEventListener('click', function() {
	display.value += '+';
});

minus.addEventListener('click', function() {
	display.value += '-';
});

multiply.addEventListener('click', function() {
	display.value += '*';
});

divide.addEventListener('click', function() {
	display.value += '/';
});

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('./service-worker.js')
			.then(res => console.log('service worker: registered'))
			.catch(err => console.error(`'service worker not registered', Error: ${err}`));
	});
}

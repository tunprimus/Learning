//@ts-check

/**
 * @description Automatic reactivity with Vanilla JavaScript with two methods — Getters and Setters and JavaScript Proxies
 * @link https://zellwk.com/blog/reactivity-with-vanilla-javascript/
 */

/**
 * Reactivity using getters and setters
 * @returns {object}
 */
function createState() {
	let _show = false;

	return {
		get show() {
			return _show;
		},
		set show(value) {
			_show = value;

			if (_show === true) {
				open();
			}
			if (_show === false) {
				close();
			}
		}
	}
}
// Using this function
const getSetState = createState();
getSetState.show = true; // This runs the `open` function
getSetState.show = false; // This runs the `close` function

let state = {
	show: false,
};

state = new Proxy(state, {
	get(target, prop) {
		return Reflect.get(...arguments);
	},

	set(target, prop) {
		Reflect.set(...arguments);

		if (prop === 'show') {
			const value = target[prop];
			if (value === true) {
				open();
			}
			if (value === false) {
				close();
			}
		}

		return true;
	},
});
// Using this
state.show = true; // This runs the `open` function
state.show = false; // This runs the `close` function

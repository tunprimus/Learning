//@ts-check

function isNodeEnvironment() {
	return typeof process !== 'undefined' && !!process.versions && !!process.versions.node;
}

console.log(isNodeEnvironment());

function isBrowserEnvironment() {
	return ![typeof window, typeof document].includes('undefined');
}

console.log(isBrowserEnvironment());

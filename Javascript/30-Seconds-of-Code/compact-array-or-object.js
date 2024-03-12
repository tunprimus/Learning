

const compactArr = arr => arr.filter(Boolean);

console.log(compactArr([0, 1, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34,]));

const compactObj = obj => Object.fromEntries(Object.entries(obj).filter(([key, value]) => Boolean(value)));

console.log(compactObj({a: 0, b: 1, c: false, d: '', e: 2, f: 'a', g: 'e' * 23, h: NaN}));

const deepCompact = val => {
	const data = Array.isArray(val) ? val.filter(Boolean) : val;
	return Object.entries(data).reduce((acc, [key, value]) => {
		if (Boolean(value)) {
			acc[key] = typeof val === 'object' ? deepCompact(val) : value;
		}
		return acc;
	}, Array.isArray(val) ? [] : {});
};

const obj = {
	a: null,
	b: false,
	c: true,
	d: 0,
	e: 1,
	f: '',
	g: 'a',
	h: [null, false, '', true, 1, 'a', {i: 0, j: 2}],
	k: {l: 0, m: false, n: 'a', o: [0, 1]},
};

console.log(deepCompact(obj));

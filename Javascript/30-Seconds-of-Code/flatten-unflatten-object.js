

const fileSizes = {
	package: 256,
	src: {
		index: 1024,
		styles: {
			main: 128,
			colours: 16,
		},
	},
	assets: {
		images: {
			logo: 512,
			background: 512,
		},
		fonts: {
			serif: 64,
		},
	},
};

const flattenedFileSizes = {
	'package': 256,
	'src.index': 1024,
	'src.styles.main': 128,
	'src.styles.colours': 16,
	'assets.images.logo': 512,
	'assets.images.background': 512,
	'assets.fonts.serif': 64,
};


const flattenObject = (obj, delimiter = '.', prefix = '') => Object.keys(obj).reduce((acc, k) => {
	const pre = prefix.length ? `${prefix}${delimiter}` : '';
	if (typeof obj[k] === 'object' && obj[k] !== null && Object.keys(obj[k]).length > 0) {
		Object.assign(acc, flattenObject(obj[k], delimiter, pre + k));
	} else {
		acc[pre + k] = obj[k];
	}
	return acc;
}, {});

console.log(flattenObject(fileSizes, '/'));


const unflattenObject = (obj, delimiter = '.') => Object.keys(obj).reduce((res, k) => {
	k.split(delimiter).reduce((acc, e, i, keys) => acc[e] || (acc[e] = isNaN(Number(keys[i + 1])) ? keys.length - 1 === i ? obj[k] : {} : []), res);
	return res;
}, {});

console.log(unflattenObject(flattenedFileSizes));

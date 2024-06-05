const math = {};

math.lerp = function(range1, range2, factor) {
	return range1 + (range2 - range1) * factor;
};

math.invLerp = function(range1, range2, factor) {
	return (factor - range1) / (range2 - range1);
};

math.remap = function(oldRange1, oldRange2, newRange1, newRange2, factor) {
	return math.lerp(newRange1, newRange2, math.invLerp(oldRange1, oldRange2, factor));
};

math.formatNumber = function(num, precision = 0) {
	return num.toFixed(precision);
};

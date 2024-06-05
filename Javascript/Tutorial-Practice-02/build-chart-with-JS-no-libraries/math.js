const math = {};

math.lerp = function(range1, range2, factor) {
	return range1 + (range2 - range1) * factor;
};

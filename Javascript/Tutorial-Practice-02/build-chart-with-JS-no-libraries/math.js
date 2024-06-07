const math = {};

math.lerp = function(point1, point2, factor) {
	return point1 + (point2 - point1) * factor;
};

math.invLerp = function(point1, point2, factor) {
	return (factor - point1) / (point2 - point1);
};

math.remap = function(oldPoint1, oldPoint2, newPoint1, newPoint2, factor) {
	return math.lerp(newPoint1, newPoint2, math.invLerp(oldPoint1, oldPoint2, factor));
};

math.remapPoint = function(oldBounds, newBounds, point) {
	return [
		math.remap(oldBounds.left, oldBounds.right, newBounds.left, newBounds.right, point[0]),
		math.remap(oldBounds.top, oldBounds.bottom, newBounds.top, newBounds.bottom, point[1]),
	];
};

math.add = function(data1, data2) {
	return [
		data1[0] + data2[0],
		data1[1] + data2[1],
	];
}

math.subtract = function(data1, data2) {
	return [
		data1[0] - data2[0],
		data1[1] - data2[1],
	];
}

math.scale = function(data, scaler) {
	return [
		data[0] * scaler,
		data[1] * scaler,
	];
}

math.distance = function(pt1, pt2) {
	return Math.sqrt(((pt1[0] - pt2[0]) ** 2) + ((pt1[1] - pt2[1]) ** 2));
}

math.formatNumber = function(num, precision = 0) {
	return num.toFixed(precision);
};

math.getNearest = function(loc, points) {
	let minDist = Number.MAX_SAFE_INTEGER;
	let nearestIndex = 0;

	for (let i = 0; i < points.length; i++) {
		const point = points[i];
		const d = math.distance(loc, point);

		if (d < minDist) {
			minDist = d;
			nearestIndex = i;
		}
	}
	return nearestIndex;
}

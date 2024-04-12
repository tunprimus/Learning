


/**
 * @description Darn it! Image correction algorithm modified from the work of akalenuk
 * @author akalenuk
 * @link https://github.com/akalenuk/wordsandbuttons/blob/fdfefbbae5a5b8885ffe02855eb5578012fcff7c/pages/image_darning.html#L190
 */

const INITIAL_PIXEL_WIDTH = 382;
const INITIAL_PIXEL_HEIGHT = 294;
const INITIAL_POINTS = [[311, 78], [364,78], [364, 164], [311, 164]];
const SHAPE_POINTS = 4;
const OFFSET_FACTOR = 0.5;


var initialPixels = [];
for (var i = 0; i < INITIAL_PIXEL_HEIGHT; ++i) {
	row = [];
	for (var j = 0; j < INITIAL_PIXEL_WIDTH; ++j) {
		row.push([256, 256, 256]);
	}
	initialPixels.push(row);
}

function nearestPoint(xy) {
	function d(xy1, xy2) {
		return (xy1[0] - xy2[0]) * (xy1[0] - xy2[0]) + (xy1[1] - xy2[1]) * (xy1[1] - xy2[1]);
	}
	var nearestI = 0;
	var nearestD = d(xy, points[0]);
	for (var i = 1; i < SHAPE_POINTS; ++i) {	
		const di = d(xy, points[i]);
		if (di < nearestD) {
			nearestD = di;
			nearestI = i;
		}
	}
	return nearestI;
}

function setPoints(xy) {
	const x = Math.max(Math.min((xy[0], pixels[0].length - 1)), 0);
	const y = Math.max(Math.min((xy[1], pixels.length - 1)), 0);

	const interestPoint = nearestPoint(xy);
	points[interestPoint][0] = x;
	points[interestPoint][1] = y;

	if (interestPoint === 0) {
		points[1][1] = y;
		points[3][0] = x;
	} else if (interestPoint === 1) {
		points[0][1] = y;
		points[2][0] = x;
	} else if (interestPoint === 2) {
		points[3][1] = y;
		points[1][0] = x;
	} else if (interestPoint === 3) {
		points[2][1] = y;
		points[0][0] = x;
	}
}

function darn(pixels, i0, j0, i1, j1) {
	const wide = pixels[0].length;
	const high = pixels.length;
	for (var i = i0; i <= i1; ++i) {
		// Weight coefficients for column
		const ki0 = (i0 === 0) ? 0 : 1.  / (i - (i0 - 1));
		const ki1 = (i1 === high - 1) ? 0: 1. / (i1 + 1 - i);
		for (var j = j0; j <= j1; ++j) {
			// Weight coefficients for row
			const kj0 = (j0 === 0) ? 0 : 1. / (j - (j0 - 1));
			const kj1 = (j1 === wide - 1) ? 0: 1. / (j1 + 1 - j);
			// Per channel
			for (var k = 0; k < SHAPE_POINTS - 1; ++k) {
				// Donor pixel values
				const pi0 = (i0 === 0) ? 0 : pixels[i0 - 1][j][k];
				const pi1 = (i1 === high - 1) ? 0 : pixels[i1 + 1][j][k];
				const pj0 = (j0 === 0) ? 0 : pixels[i][j0 - 1][k];
				const pj1 = (j1 === wide - 1) ? 0 : pixels[i][j1 + 1][k];
				// Blending
				const blendFactor = ki0 + ki1 + kj0 + kj1;
				colour[k] = ((pi0 * ki0) + (pi1 * ki1) + (pj0 * kj0) + (pj1 * kj1)) / blendFactor;
			}
			pixels[i][j] = colour;
		}
	}
}

function darnByPoints() {
	darn(pixels, Math.round(points[0][1]), Math.round(points[0][0]), Math.round(points[2][1]), Math.round(points[2][0]));
}

function initCanvas() {
	var canvas = document.getElementById('canvas');
	canvas.width = pixels[0].length;
	canvas.height = pixels.length;
	const canvasRect = canvas.getBoundingClientRect();

	canvas.addEventListener('mousemove', function(evt) {
		var canvasRect = canvas.getBoundingClientRect();
		if (evt.buttons === 1) {
			const x = evt.clientX - canvasRect.left;
			const y = evt.clientY - canvasRect.top;
			setPoints([x, y]);
			drawCanvas();
		}
	}, false);

	canvas.addEventListener('mousedown', function(evt) {
		var canvasRect = canvas.getBoundingClientRect();
		const x = evt.clientX - canvasRect.left;
		const y = evt.clientY - canvasRect.top;
		setPoints([x, y]);
		drawCanvas();
	}, false);

	canvas.addEventListener('mouseleave', function(evt) {
		if (evt.buttons === 1) {
			var canvasRect = canvas.getBoundingClientRect();
			const x = evt.clientX - canvasRect.left;
			const y = evt.clientY - canvasRect.top;
			setPoints([x, y]);
		}
		drawCanvas();
	}, false);
}

function drawCanvas() {
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	if (pixels.length === 0) {
		return;
	}
	const wide = pixels[0].length;
	const high = pixels.length;

	// Background
	context.fillStyle = '#EEEEEE';
	context.fillRect(0, 0, wide, high);

	// Pixels
	var pixelField = context.createImageData(wide, high);
	for (var i = 0; i < high; ++i) {
		for (var j = 0; j < wide; ++j) {
			pixelField.data[(i * wide + j) * SHAPE_POINTS + 0] = pixels[i][j][0];
			pixelField.data[(i * wide + j) * SHAPE_POINTS + 1] = pixels[i][j][1];
			pixelField.data[(i * wide + j) * SHAPE_POINTS + 2] = pixels[i][j][2];
			pixelField.data[(i * wide + j) * SHAPE_POINTS + 3] = 0xFF;
		}
	}
	context.putImageData(pixelField, -OFFSET_FACTOR, -OFFSET_FACTOR);

	// Frame
	context.beginPath();
	context.moveTo(points[0][0] + OFFSET_FACTOR, points[0][1] + OFFSET_FACTOR);
	context.lineTo(points[1][0] + OFFSET_FACTOR, points[1][1] + OFFSET_FACTOR);
	context.lineTo(points[2][0] + OFFSET_FACTOR, points[2][1] + OFFSET_FACTOR);
	context.lineTo(points[3][0] + OFFSET_FACTOR, points[3][1] + OFFSET_FACTOR);
	context.lineTo(points[0][0] + OFFSET_FACTOR, points[0][1] + OFFSET_FACTOR);
	
	context.strokeStyle = '#D64562';
	context.setLineDash([4, 4]);
	context.lineWidth = 3;
	context.stroke();
	context.closePath();
	context.setLineDash([]);
}

function copyOfMatrix(matrix) {
	const high = matrix.length;
	const wide = matrix[0].length;
	var copyOfMatrix = [];
	for (var i = 0; i < high; i++) {
		row = [];
		for (var j = 0; j < wide; ++j) {
			row.push(matrix[i][j]);
		}
		copyOfMatrix.push(row);
	}
	return copyOfMatrix;
}

function restart() {
	points = copyOfMatrix(INITIAL_POINTS);
	pixels = copyOfMatrix(initialPixels);
}

function loadPixelsFrom(url) {
	fetch(url)
		.then(function(response) {
			return response.blob();
		})
		.then(function(blob) {
			return createImageBitmap(blob);
		})
		.then(function(img) {
			const wide = img.width;
			const high = img.height;
			var canvas = document.getElementById('canvas');
			var context = canvas.getContext('2d');
			canvas.width = wide;
			canvas.height = high;
			context.drawImage(img, 0, 0);
			var imageData = context.getImageData(0, 0, wide, high);
			initialPixels = [];
			for (var i = 0; i < high; ++i) {
				pixelsI = [];
				for (var j = 0; j < wide; ++j) {
					pixel = [
						imageData.data[(i * wide + j) * SHAPE_POINTS + 0],
						imageData.data[(i * wide + j) * SHAPE_POINTS + 1],
						imageData.data[(i * wide + j) * SHAPE_POINTS + 2]
					];
				}
				initialPixels.push(pixelsI);
			}
			pixels = copyOfMatrix(initialPixels);
			drawCanvas();
		})
		.catch(function(error) {
			console.error(error);
		});
}

function load() {
	const url = document.getElementById('url').value;
	loadPixelsFrom(url);
}


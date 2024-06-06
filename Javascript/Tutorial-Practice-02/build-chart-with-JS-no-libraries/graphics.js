const graphics = {}

graphics.drawPoint = function(ctx, loc, colour = 'black', size = 8) {
	ctx.beginPath();
	ctx.fillStyle = colour;
	ctx.arc(...loc, size / 2, 0, Math.PI * 2);
	ctx.fill();
};

graphics.drawText = function(ctx, { text, loc, align = 'center', vAlign = 'middle', size = 10, colour = 'black', }) {
	ctx.textAlign = align;
	ctx.textBaseline = vAlign;
	ctx.fillStyle = colour;
	ctx.font = `bold ${size}px Courier monospace`;
	ctx.fillText(text, ...loc);
};

graphics.generateImages = function(styles, size=20) {
	for (let label in styles) {
		const style = styles[label];
		const canvas = document.createElement('canvas');
		canvas.width = size + 10;
		canvas.height = size + 10;
		const ctx = canvas.getContext('2d');
		ctx.beginPath();
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillStyle = style.colour;
		ctx.font = `${size}px Courier monospace`;

		const colourHueMap = {
			red: 0,
			yellow: 60,
			green: 120,
			cyan: 180,
			blue: 240,
			magenta: 300,
		};
		const hue = -45 + colourHueMap[style.colour];
		if (!isNaN(hue)) {
			ctx.filter = `brightness(2) contrast(0.3) sepia(1) brightness(0.7) hue-rotate(${hue}deg) saturate(3) contrast(3)`;
		} else {
			ctx.filter = 'grayscale(1)';
		}
		
		ctx.fillText(style.text, canvas.width / 2, canvas.height / 2);
		style['image'] = new Image();
		style['image'].src = canvas.toDataURL();
	}
};

graphics.drawImage = function(ctx, image, loc) {
	ctx.beginPath();
	ctx.drawImage(image, loc[0] - image.width / 2, loc[1] - image.height / 2, image.width, image.height);
	ctx.fill();
}

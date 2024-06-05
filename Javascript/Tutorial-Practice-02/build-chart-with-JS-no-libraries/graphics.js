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

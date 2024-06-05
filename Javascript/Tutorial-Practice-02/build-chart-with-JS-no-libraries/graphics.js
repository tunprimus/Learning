const graphics = {}

graphics.drawPoint = function(ctx, loc, colour = 'black', size = 8) {
	ctx.beginPath();
	ctx.fillStyle = colour;
	ctx.arc(...loc, size / 2, 0, Math.PI * 2);
	ctx.fill();
};

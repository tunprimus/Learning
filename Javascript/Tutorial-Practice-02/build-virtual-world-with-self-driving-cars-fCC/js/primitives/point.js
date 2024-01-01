class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	equals(point) {
		return this.x === point.x && this.y === point.y;
	}

	draw(ctx, size = 18, colour = 'black') {
		const rad = size / 2;
		ctx.beginPath();
		ctx.fillStyle = colour;
		ctx.arc(this.x, this.y, rad, 0, Math.PI * 2);
		ctx.fill();
	}
}
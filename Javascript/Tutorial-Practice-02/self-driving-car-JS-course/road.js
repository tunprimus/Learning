
const ROAD_LINE_WIDTH = 5;
const DASH_LINE_PLACE = 20;
const DASH_LINE_GAP = 20;

class Road {
	constructor(x, width, laneCount = 3) {
		this.x = x;
		this.width = width;
		this.laneCount = laneCount;

		this.left = x - width / 2;
		this.right = x + width / 2;

		const INFINITY = 1000000;
		this.top = -INFINITY;
		this.bottom = INFINITY;

		const topLeft = {x: this.left, y: this.top};
		const topRight = {x: this.right, y: this.top};
		const bottomLeft = {x: this.left, y: this.bottom};
		const bottomRight = {x: this.right, y: this.bottom};
		this.borders = [
			[topLeft, bottomLeft],
			[topRight, bottomRight],
		];
	}

	getLaneCentre(laneIndex) {
		const laneWidth = this.width / this.laneCount;
		return this.left + laneWidth / 2 + Math.min(laneIndex, this.laneCount - 1) * laneWidth;
	}

	draw(ctx) {
		ctx.lineWidth = ROAD_LINE_WIDTH;
		ctx.strokeStyle = 'white';

		for (let i = 1; i <= this.laneCount - 1; i++) {
			const x = lerp(this.left, this.right, i / this.laneCount);

			ctx.setLineDash([DASH_LINE_PLACE, DASH_LINE_GAP]);
			ctx.beginPath();
			ctx.moveTo(x, this.top);
			ctx.lineTo(x, this.bottom);
			ctx.stroke();
		}

		ctx.setLineDash([]);
		this.borders.forEach(border => {
			ctx.beginPath();
			ctx.moveTo(border[0].x, border[0].y);
			ctx.lineTo(border[1].x, border[1].y);
			ctx.stroke();
		});
	}
}

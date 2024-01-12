
const RAY_COUNT = 5;
const RAY_LENGTH = 150;
const RAY_SPREAD_FACTOR = 2;

class Sensor {
	constructor(car) {
		this.car = car;
		this.rayCount = RAY_COUNT;
		this.rayLength = RAY_LENGTH;
		this.raySpread = Math.PI / RAY_SPREAD_FACTOR;

		this.rays = [];
	}

	update() {
		this._castRays();
	}

	_castRays() {
		this.rays = [];
		for (let i = 0; i < this.rayCount; i++) {
			const rayAngle = lerp(this.raySpread / 2, -this.raySpread / 2, this.rayCount ===1 ? 0.5 : i / (this.rayCount - 1)) + this.car.angle;

			const start = {x: this.car.x, y: this.car.y};
			const end = {x: this.car.x - Math.sin(rayAngle) * this.rayLength, y: this.car.y - Math.cos(rayAngle) * this.rayLength};

			this.rays.push([start, end]);
		}
	}

	draw(ctx) {
		for (let i = 0; i < this.rayCount; i++) {
			ctx.beginPath();
			ctx.lineWidth = 2;
			ctx.strokeStyle = 'yellow';
			ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
			ctx.lineTo(this.rays[i][1].x, this.rays[i][1].y);
			ctx.stroke();
		}
	}
}

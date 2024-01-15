
const RAY_COUNT = 5;
const RAY_LENGTH = 150;
const RAY_SPREAD_FACTOR = 2;
const LINE_WIDTH = 2;

class Sensor {
	constructor(car) {
		this.car = car;
		this.rayCount = RAY_COUNT;
		this.rayLength = RAY_LENGTH;
		this.raySpread = Math.PI / RAY_SPREAD_FACTOR;

		this.rays = [];
		this.readings = [];
	}

	update(roadBorders) {
		this._castRays();
		this.readings = [];

		for (let i = 0; i < this.rays.length; i++) {
			this.readings.push(
				this._getReading(this.rays[i], roadBorders)
			);
		}
	}

	_getReading(ray, roadBorders) {
		let touches = [];

		for (let i = 0; i < roadBorders.length; i++) {
			const touch = getIntersection(
				ray[0],
				ray[1],
				roadBorders[i][0],
				roadBorders[i][1]
			);
			if (touch) {
				touches.push(touch);
			}
		}

		if (touches.length === 0) {
			return null;
		} else {
			const offsets = touches.map(e => e.offset);
			const minOffset = Math.min(...offsets);
			return touches.find(e => e.offset === minOffset);
		}
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
			let end = this.rays[i][1];
			if (this.readings[i]) {
				end = this.readings[i];
			}
			ctx.beginPath();
			ctx.lineWidth = LINE_WIDTH;
			ctx.strokeStyle = 'yellow';
			ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
			ctx.lineTo(end.x, end.y);
			ctx.stroke();

			ctx.beginPath();
			ctx.lineWidth = LINE_WIDTH;
			ctx.strokeStyle = 'black';
			ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y);
			ctx.lineTo(end.x, end.y);
			ctx.stroke();
		}
	}
}

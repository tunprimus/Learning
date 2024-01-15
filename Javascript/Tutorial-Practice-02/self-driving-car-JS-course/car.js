
const TURN_ANGLE = 0.015;
const MAX_SPEED = 3;
const FRICTION = 0.05;
const ACCELERATION = 0.2;

class Car {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.speed = 0;
		this.acceleration = ACCELERATION;
		this.maxSpeed = MAX_SPEED;
		this.friction = FRICTION;
		this.angle = 0;

		this.sensor = new Sensor(this);
		this.controls = new Controls();
	}

	update(roadBorders) {
		this._move();
		this.sensor.update(roadBorders);
	}

	_move() {
		if (this.controls.forward) {
			this.speed += this.acceleration;
		}

		if (this.controls.reverse) {
			this.speed -= this.acceleration;
		}

		if (this.speed > this.maxSpeed) {
			this.speed = this.maxSpeed;
		}

		if (this.speed < -this.maxSpeed / 2) {
			this.speed = -this.maxSpeed / 2;
		}

		if (this.speed > 0) {
			this.speed -= this.friction;
		}

		if (this.speed < 0) {
			this.speed += this.friction;
		}

		if (Math.abs(this.speed) < this.friction) {
			this.speed = 0;
		}

		if (this.speed !== 0) {
			const flip = this.speed > 0 ? 1 : -1;

			if (this.controls.left) {
				this.angle += TURN_ANGLE * flip;
			}
	
			if (this.controls.right) {
				this.angle -= TURN_ANGLE * flip;
			}
		}

		this.x -= Math.sin(this.angle) * this.speed;
		this.y -= Math.cos(this.angle) * this.speed;
	}

	draw(ctx) {
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(-this.angle);
		ctx.beginPath();
		ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
		ctx.fill();

		ctx.restore();

		this.sensor.draw(ctx);
	}
}

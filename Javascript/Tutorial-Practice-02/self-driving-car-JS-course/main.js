
const CANVAS_WIDTH = 200;
const ROAD_SCALE_FACTOR = 0.9;
const CAR_START_X_COORD = null;
const CAR_START_Y_COORD = 100;
const CAR_WIDTH = 30;
const CAR_LENGTH = 50;
const CAR_ON_CANVAS_OFFSET = 0.7;


const canvas = document.getElementById('my-canvas');
canvas.width = CANVAS_WIDTH;

const ctx = canvas.getContext('2d');
const road = new Road(canvas.width / 2, canvas.width * ROAD_SCALE_FACTOR);
const car = new Car(road.getLaneCentre(1), CAR_START_Y_COORD, CAR_WIDTH, CAR_LENGTH);
// car.draw(ctx);

animate();

function animate() {
	car.update();
	canvas.height = window.innerHeight;

	ctx.save();
	ctx.translate(0, -car.y + canvas.height * CAR_ON_CANVAS_OFFSET);

	road.draw(ctx);
	car.draw(ctx);

	ctx.restore();
	requestAnimationFrame(animate);
}

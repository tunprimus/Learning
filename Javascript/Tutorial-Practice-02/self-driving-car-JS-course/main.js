
const canvas = document.getElementById('my-canvas');
canvas.width = 200;
const CAR_ON_CANVAS_OFFSET = 0.7;

const ctx = canvas.getContext('2d');
const road = new Road(canvas.width / 2, canvas.width * 0.9);
const car = new Car(road.getLaneCentre(1), 100, 30, 50);
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

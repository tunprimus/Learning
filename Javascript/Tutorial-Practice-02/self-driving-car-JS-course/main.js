
const CAR_CANVAS_WIDTH = 200;
const NETWORK_CANVAS_WIDTH = 300;
const ROAD_SCALE_FACTOR = 0.9;
const CAR_START_X_COORD = null;
const CAR_START_Y_COORD = 100;
const CAR_WIDTH = 30;
const CAR_LENGTH = 50;
const CAR_ON_CANVAS_OFFSET = 0.7;
const CAR_COLOUR = 'blue';
const TRAFFIC_COLOUR = 'red';


const carCanvas = document.getElementById('car-canvas');
carCanvas.width = CAR_CANVAS_WIDTH;

const networkCanvas = document.getElementById('network-canvas');
networkCanvas.width = NETWORK_CANVAS_WIDTH;

const carCtx = carCanvas.getContext('2d');
const networkCtx = networkCanvas.getContext('2d');

const road = new Road(carCanvas.width / 2, carCanvas.width * ROAD_SCALE_FACTOR);
const car = new Car(road.getLaneCentre(1), CAR_START_Y_COORD, CAR_WIDTH, CAR_LENGTH, 'AI');
const traffic = [new Car(road.getLaneCentre(1), -100, CAR_WIDTH, CAR_LENGTH, 'DUMMY', 2)];

animate();

function animate() {
	for (let i = 0; i < traffic.length; i++) {
		traffic[i].update(road.borders, []);
	}
	car.update(road.borders, traffic);

	carCanvas.height = window.innerHeight;
	networkCanvas.height = window.innerHeight;

	carCtx.save();
	carCtx.translate(0, -car.y + carCanvas.height * CAR_ON_CANVAS_OFFSET);

	road.draw(carCtx);
	for (let i = 0; i < traffic.length; i++) {
		traffic[i].draw(carCtx, TRAFFIC_COLOUR);
	}
	car.draw(carCtx, CAR_COLOUR);

	carCtx.restore();

	Visualiser.drawNetwork(networkCtx, car.brain);
	
	requestAnimationFrame(animate);
}

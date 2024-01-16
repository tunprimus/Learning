
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
const NETWORK_ANIMATION_DELAY_FACTOR = 100;
const NUMBER_OF_CARS = 100;


const carCanvas = document.getElementById('car-canvas');
carCanvas.width = CAR_CANVAS_WIDTH;

const networkCanvas = document.getElementById('network-canvas');
networkCanvas.width = NETWORK_CANVAS_WIDTH;

const carCtx = carCanvas.getContext('2d');
const networkCtx = networkCanvas.getContext('2d');

const road = new Road(carCanvas.width / 2, carCanvas.width * ROAD_SCALE_FACTOR);

const cars = generateCars(NUMBER_OF_CARS);
let bestCar = cars[0];
if (localStorage.getItem('bestBrain')) {
	bestCar.brain = JSON.parse(localStorage.getItem('bestBrain'));
}

const traffic = [new Car(road.getLaneCentre(1), -100, CAR_WIDTH, CAR_LENGTH, 'DUMMY', 2)];

animate();

function save() {
	localStorage.setItem('bestBrain', JSON.stringify(bestCar.brain));
}

function discard() {
	localStorage.removeItem('bestBrain');
}

function generateCars(num) {
	const cars = [];
	for (let i = 1; i <= num; i++) {
		cars.push(new Car(road.getLaneCentre(1), CAR_START_Y_COORD, CAR_WIDTH, CAR_LENGTH, 'AI'));
	}
	return cars;
}

function animate(time) {
	for (let i = 0; i < traffic.length; i++) {
		traffic[i].update(road.borders, []);
	}

	for (let i = 0; i < cars.length; i++) {
		cars[i].update(road.borders, traffic);
	}

	bestCar = cars.find(
		c => c.y === Math.min(...cars.map(c => c.y))
	);

	carCanvas.height = window.innerHeight;
	networkCanvas.height = window.innerHeight;

	carCtx.save();
	carCtx.translate(0, -bestCar.y + carCanvas.height * CAR_ON_CANVAS_OFFSET);

	road.draw(carCtx);
	for (let i = 0; i < traffic.length; i++) {
		traffic[i].draw(carCtx, TRAFFIC_COLOUR);
	}

	carCtx.globalAlpha = 0.2;
	for (let i = 0; i < cars.length; i++) {
		cars[i].draw(carCtx, CAR_COLOUR);
	}
	carCtx.globalAlpha = 1;
	bestCar.draw(carCtx, CAR_COLOUR, true);

	carCtx.restore();

	networkCtx.lineDashOffset = -time / NETWORK_ANIMATION_DELAY_FACTOR;
	Visualiser.drawNetwork(networkCtx, bestCar.brain);

	requestAnimationFrame(animate);
}

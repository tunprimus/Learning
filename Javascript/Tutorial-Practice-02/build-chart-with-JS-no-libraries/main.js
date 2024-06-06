const NUMBER_CONSTANT = 1000;
const samples = [];
for (let i = 0; i < NUMBER_CONSTANT; i++) {
	const typeOfCar = Math.random() < 0.5 ? 'basic' : 'sport';
	const km = math.lerp(3000, 300000, Math.random());
	const carPrice = math.remap(3000, 300000, 9000, 900, km) + math.lerp(-2000, 2000, Math.random()) + (typeOfCar === 'basic' ? 0 : 5000);
	samples.push({
		id: i,
		label: typeOfCar,
		point: [km, carPrice],
	});
}

const options = {
	size: 250,
	axesLabels: ['Kilometres', 'Price'],
	styles: {
		basic: {colour: 'grey', text: '🚗'},
		sport: {colour: 'red', text: '🏎'},
	},
	icon: 'image',
};

graphics.generateImages(options.styles);

const chart = new Chart(chartContainer, samples, options)
const header = dataTable.createTHead();
const tr = header.insertRow();
tr.insertCell().innerHTML = 'Id';
tr.insertCell().innerHTML = 'Type';
tr.insertCell().innerHTML = 'Km';
tr.insertCell().innerHTML = 'Price'
const body = dataTable.createTBody();
samples.forEach(sample => {
	const tr = body.insertRow();
	tr.insertCell().innerHTML = sample.id;
	tr.insertCell().innerHTML = sample.label;
	tr.insertCell().innerHTML = math.formatNumber(sample.point[0]);
	tr.insertCell().innerHTML = math.formatNumber(sample.point[1]);
});
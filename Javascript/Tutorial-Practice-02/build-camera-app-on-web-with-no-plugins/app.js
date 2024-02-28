//@ts-check

const cameraVideoStream = document.getElementById('camera-stream');
const shutterButton = document.getElementById('shutter');
const canvas = document.getElementById('canvas');

let width = window.innerWidth;
let height = 0;
let streaming = false;


if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia({ video: true })) {
	navigator.mediaDevices
		.getUserMedia({ video: true })
		.then(function(stream) {
			cameraVideoStream.srcObject = stream;
			cameraVideoStream.play();
		})
}


cameraVideoStream.addEventListener('canplay', (evt) => {
	if (!streaming) {
		height = cameraVideoStream.videoHeight / (cameraVideoStream.videoWidth / width);

		canvas.setAttribute('width', width);
		canvas.setAttribute('height', height);
		cameraVideoStream.setAttribute('width', width);
		cameraVideoStream.setAttribute('height', height);
		streaming = true;
	}
},
	false
);


function captureImage() {
	const canvasContext = canvas.getContext('2d');
	canvas.width = width;
	canvas.height = height;
	canvasContext.drawImage(cameraVideoStream, 0, 0, width, height);
}

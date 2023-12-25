class AudioPlayer {
	constructor(audioElement) {
		this.audioElement = document.querySelector(audioElement);
	}

	play() {
		this.audioElement.play();
	}

	pause() {
		this.audioElement.pause();
	}

	togglePlay() {
		this.audioElement.paused ? this.play() : this.pause();
	}
}

document.addEventListener('DOMContentLoaded', function() {
	const player = new AudioPlayer('#audio-element');

	document.querySelector('#play-button').addEventListener('click', function() {
		player.togglePlay();
	});
});
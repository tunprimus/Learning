/* Build a Pomodoro Timer using HTML, CSS, and JavaScript #+++>>> https://javascript.plainenglish.io/build-a-pomodoro-timer-using-html-css-and-javascript-7a7a8410052c?gi=8e27ece2d14e */

const progressBar = document.querySelector('.outer-ring');
const minElem = document.querySelector('#minutes');
const secElem = document.querySelector('#seconds');
const startStop = document.querySelector('#startStop');
const setting = document.querySelector('#setting');
let minutes = document.querySelector('#minutes').innerHTML;
let seconds = document.querySelector('#seconds').innerHTML;
let progress = null;
let progressStart = 0;
let progressEnd = parseInt(minutes) * 60 + parseInt(seconds);
let speed = 1000;
let degTravel = 360 / progressEnd;
let toggleSettings = false;
let secRem = 0;
let minRem = 0;

function progressTrack() {
  progressStart++;

  secRem = Math.floor((progressEnd - progressStart) % 60);
  minRem = Math.floor((progressEnd - progressStart) / 60);

  secElem.innerHTML = secRem.toString().length == 2 ? secRem : `0${secRem}`;
  minElem.innerHTML = minRem.toString().length == 2 ? minRem : `0${minRem}`;

  progressBar.style.background = `conic-gradient(#9D0000 ${progressStart * degTravel}deg), #17171A ${progressStart * degTravel}`;

  if (progressStart === progressEnd) {
    progressBar.style.background = `conic-gradient(#00AA51 360deg, #00AA51 360deg)`;
    clearInterval(progress);
    startStop.innerHTML = 'START';
    progress = null;
    progressStart = 0;
  }
}

setting.onclick = function () {
  if (!toggleSettings) {
    toggleSettings = true;
    minElem.contentEditable = true;
    minElem.style.borderBottom = `1px dashed #FFFFFF50`;
    secElem.contentEditable = true;
    secElem.style.borderBottom = `1px dashed #FFFFFF50`;
  } else {
    resetValues();
  }
};

minElem.onblur = function () {
  resetValues();
};

secElem.onblur = function () {
  resetValues();
};

startStop.onclick = function() {
  if (startStop.innerHTML === 'START') {
    if (!(parseInt(minutes) === 0 && parseInt(seconds) === 0)) {
      startStop.innerHTML = 'STOP';
      startStopProgress();
    } else {
      alert('Enter the time value in your timer!');
    }
  } else {
    startStop.innerHTML = 'START';
    startStopProgress();
  }
};

function startStopProgress() {
  if (!progress) {
    progress = setInterval(progressTrack, speed);
  } else {
    clearInterval(progress);
    progress = null;
    progressStart = 0;
    progressBar.style.background = `conic-gradient(#17171A 360deg, #17171A 360deg)`;
  }
}

/* Modified from Create a Pomodoro Clock with JavaScript #+++>>> https://dev.to/albertomontalesi/tutorial-create-a-pomodoro-clock-with-javascript-13om */

document.addEventListener('DOMContentLoaded', () => {

  // const pomodoroTimer = document.querySelector('#pomodoro-timer');
  const startButton = document.querySelector('#pomodoro-start');
  // const pauseButton = document.querySelector('#pomodoro-pause');
  const stopButton = document.querySelector('#pomodoro-stop');
  let currentTaskLabel = document.querySelector('#pomodoro-clock-task');
  let workDurationInput = document.querySelector('#input-work-duration');
  let breakDurationInput = document.querySelector('#input-break-duration');

  workDurationInput.value = '25';
  breakDurationInput.value = '5';


  let isClockRunning = false;
  let isClockedStopped = true;

  // In seconds = 25 mins
  let workSessionDuration = 1500;
  let currentTimeLeftInSession = 1500;
  // In seconds = 5 mins
  let breakSessionDuration = 300;

  let timeSpentInCurrentSession = 0;
  let updatedWorkSessionDuration;
  let updatedBreakSessionDuration;

  let type = 'Work';

  // UPDATE WORK TIME
  workDurationInput.addEventListener('input', () => {
    updatedWorkSessionDuration = minuteToSeconds(workDurationInput.value);
  });

  // UPDATE PAUSE TIME
  breakDurationInput.addEventListener('input', () => {
    updatedBreakSessionDuration = minuteToSeconds(breakDurationInput.value);
  });


  const minuteToSeconds = (mins) => {
    return mins * 60;
  };

  const toggleClock = (reset) => {
    togglePlayPauseIcon(reset);
    if (reset) {
      // STOP THE TIMER
      stopClock();
    } else {
      if (isClockedStopped) {
        setUpdatedTimers();
        isClockedStopped = false;
      }

      if (isClockRunning === true) {
        // PAUSE THE TIMER
        clearInterval(clockTimer);
        isClockRunning = false;
      } else {
        // START THE TIMER
        clockTimer = setInterval(() => {
          // decrease the time left / increase the time spent
          // currentTimeLeftInSession--;
          stepDown();
          displayCurrentTimeLeftInSession();
          progressBar.set(calculateSessionProgress());
        }, 1000);

        isClockRunning = true;
      }
      showStopIcon();
    }
  };

  const displayCurrentTimeLeftInSession = () => {
    const secondsLeft = currentTimeLeftInSession;
    let result = '';
    const seconds = secondsLeft % 60;
    const minutes = parseInt(secondsLeft / 60) % 60;
    let hours = parseInt(secondsLeft / 3600);
    // Add leading zeroes if it is less than 10
    function addLeadingZeroes(time) {
      return time < 10 ? `0${time}` : time;
    }
    if (hours > 0) {
      result += `${hours}`
    }
    result += `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`;
    // pomodoroTimer.innerText = result.toString();
    progressBar.text.innerText = result.toString();
  };

  const stopClock = () => {
    setUpdatedTimers();
    displaySessionLog(type);
    // 1) reset the timer we set
    clearInterval(clockTimer);
    // 2) update our variable to know that the timer is stopped
    isClockedStopped = true;
    isClockRunning = false;
    // reset the time left in the session to its original state
    currentTimeLeftInSession = workSessionDuration;
    // update the timer displayed
    displayCurrentTimeLeftInSession();
    type = 'Work';
    timeSpentInCurrentSession = 0;
  };

  const stepDown = () => {
    if (currentTimeLeftInSession > 0) {
      // decrease the time left / increase time spent
      currentTimeLeftInSession--;
      timeSpentInCurrentSession++;
    } else if (currentTimeLeftInSession === 0) {
      timeSpentInCurrentSession = 0;
      // Timer is over -> if work, switch to break or vice versa
      if (type === 'Work') {
        currentTimeLeftInSession = breakSessionDuration;
        displaySessionLog('Work');
        type = 'Break';
        setUpdatedTimers();
        currentTaskLabel.value = 'Break';
        currentTaskLabel.value = true;
      } else {
        currentTimeLeftInSession = workSessionDuration;
        type = 'Work';
        setUpdatedTimers();
        if (currentTaskLabel.value === 'Break') {
          currentTaskLabel.value = workSessionLabel;
        }
        currentTaskLabel.disabled = false;
        displaySessionLog('Break');
      }
    }
    displayCurrentTimeLeftInSession();
  };

  const displaySessionLog = (type) => {
    const sessionsList = document.querySelector('#pomodoro-sessions');
    // Append li to it
    const li = document.createElement('li');
    let sessionLabel;

    if (type === 'Work') {
      sessionLabel = currentTaskLabel.value ? currentTaskLabel.value : 'Work';
      workSessionLabel = sessionLabel;
    } else {
      sessionLabel = 'Break';
    }

    let elapsedTime = parseInt(timeSpentInCurrentSession / 60);
    elapsedTime = elapsedTime > 0 ? elapsedTime : '< 1';

    const text = document.createTextNode(`${sessionLabel} : ${elapsedTime} min`);
    li.appendChild(text);
    sessionsList.appendChild(li);
  };

  const setUpdatedTimers = () => {
    if (type === 'Work') {
      currentTimeLeftInSession = updatedWorkSessionDuration ? updatedWorkSessionDuration : workSessionDuration;
      workSessionDuration = currentTimeLeftInSession;
    } else {
      currentTimeLeftInSession = updatedBreakSessionDuration ? updatedBreakSessionDuration : breakSessionDuration;
      breakSessionDuration = currentTimeLeftInSession;
    }
  };

  const togglePlayPauseIcon = (reset) => {
    const playIcon = document.querySelector('#play-icon');
    const pauseIcon = document.querySelector('#pause-icon');

    if (reset) {
      // When resetting -> always revert to play icon
      if (playIcon.classList.contains('hidden')) {
        playIcon.classList.remove('hidden');
      }
      if (!pauseIcon.classList.contains('hidden')) {
        pauseIcon.classList.add('hidden');
      }
    } else {
      playIcon.classList.toggle('hidden');
      pauseIcon.classList.toggle('hidden');
    }
  };

  const showStopIcon = () => {
    const stopButton = document.querySelector('#pomodoro-stop');
    stopButton.classList.remove('hidden');
  };

  const progressBar = new ProgressBar.Circle("#pomodoro-timer", {
    strokeWidth: 2,
    text: {
      value: "25:00"
    },
    trailColor: "#F4F4F4",
  });

  const calculateSessionProgress = () => {
    // Calculate the completion rate of the session
    const sessionDuration = type === 'Work' ? workSessionDuration : breakSessionDuration;
    return (timeSpentInCurrentSession / sessionDuration) * 10;
  };

  // START
  startButton.addEventListener('click', () => {
    toggleClock();
  });

  /* 
  // PAUSE
  pauseButton.addEventListener('click', () => {
    toggleClock();
  });
   */

  // STOP
  stopButton.addEventListener('click', () => {
    toggleClock(true);
  });

});

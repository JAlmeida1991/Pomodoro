import {
  timer,
  sessionLength,
  breakLength,
  countdown,
  breakCountdown,
  timeObj,
  audio
} from "./globals";

// Helper functions

function startCountdown() {
  if (!timeObj.isOn) {
    timeObj.isOn = true;
    return (timeObj.interval = setInterval(countdownInterval, 1000));
  }
}

function stopCountdown() {
  timeObj.isOn = false;
  clearInterval(timeObj.interval);
}

function deductSessionTime() {
  // Need to be greeter than 60 since otherwise user will decrement total minutes to nothing
  if (countdown.totalSeconds > 60 && !timeObj.isOn) {
    countdown.totalSeconds -= 60;
    displayTime(sessionLength);
    displayTime(timer);
  }
}

function deductBreakTime() {
  // Need to be greeter than 60 since otherwise user will decrement total minutes to nothing
  if (breakCountdown.totalSeconds > 60 && !timeObj.isOn) {
    breakCountdown.totalSeconds -= 60;
    // This will override what is shown from display Time
    displayCountDown(breakLength);
  }
}

function addSessionTime() {
  // If total seconds is set to less than or equal to 3600, user is possible to increment / decrement time if timer value... e.g. 59:40 => +60
  if (countdown.totalSeconds < 3541 && !timeObj.isOn) {
    countdown.totalSeconds += 60;
    displayTime(sessionLength);
    displayTime(timer);
    // This will override what is shown from display Time
    displaySixty(countdown, sessionLength);
  }
}

function addBreakTime() {
  // If total seconds is set to less than or equal to 3600, user is possible to increment / decrement time if timer value... e.g. 59:40 => +60
  if (breakCountdown.totalSeconds < 3541 && !timeObj.isOn) {
    breakCountdown.totalSeconds += 60;
    displayCountDown(breakLength);
    displaySixty(breakCountdown, breakLength);
  }
}

function countdownInterval() {
  timeObj.currentTime.totalSeconds--;
  timeObj.currentTime === countdown
    ? displayTime(timer)
    : displayCountDown(timer);

  if (
    timeObj.currentTime === countdown &&
    timeObj.currentTime.totalSeconds <= 0
  ) {
    audio.play();
    timeObj.currentTime = breakCountdown;
    countdown.totalSeconds = parseInt(sessionLength.textContent) * 60;
  } else if (
    timeObj.currentTime === breakCountdown &&
    timeObj.currentTime.totalSeconds <= 0
  ) {
    audio.play();
    timeObj.currentTime = countdown;
    breakCountdown.totalSeconds = parseInt(breakLength.textContent) * 60;
  }
}

function displayTime(time) {
  if (time === sessionLength) {
    time.textContent = `${countdown.minutes()}:00`;
  } else {
    time.textContent = `${countdown.minutes()}:${countdown.seconds()}`;
  }
}

function displayCountDown(time) {
  if (time === breakLength) {
    time.textContent = `${breakCountdown.minutes()}:00`;
  } else {
    time.textContent = `${breakCountdown.minutes()}:${breakCountdown.seconds()}`;
  }
}
/*IF NUMBER ONLY HAS 1 DIGIT SLICE -2 WILL RETURN ZERO WITH DIGIT 
    ELSE IF DIGIT TWO DIGITS SLICE OFF ZERO SINCE -2 SLICE WILL RETURN LAST TWO IN STRING 
    */
function checkSingleDigit(num) {
  return ("0" + num).slice(-2);
}

// This helper function is needed since without it current time will be displayed as 00:00 if user want time to be set to 60 minute
function displaySixty(time, timeIncrementer) {
  if (time.totalSeconds === 3600) {
    timer.textContent = "60:00";
    timeIncrementer.textContent = "60:00";
  }
}

function init() {
  countdown.totalSeconds = 1500;
  breakCountdown.totalSeconds = 300;
  timeObj.currentTime = countdown;
  stopCountdown();
  displayTime(timer);
  displayTime(sessionLength);
  displayCountDown(breakLength);
}

export {
  init,
  startCountdown,
  stopCountdown,
  deductSessionTime,
  addSessionTime,
  deductBreakTime,
  addBreakTime,
  checkSingleDigit
};

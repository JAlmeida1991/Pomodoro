// Work session element nodes:
const timer = document.querySelector(".clock span");
const play = document.querySelector(".play");
const pause = document.querySelector(".pause");
const reset = document.querySelector(".reset");
// Session length element nodes:
const sessionLength = document.querySelector(".session-length span");
const sessionMinus = document.querySelector(".session-minus");
const sessionAdd = document.querySelector(".session-add");
// Break length element nodes:
const breakLength = document.querySelector(".break-length span");
const breakMinus = document.querySelector(".break-minus");
const breakAdd = document.querySelector(".break-add");

// AUDIO FOR TRANSITION
const audio = new Audio("Bepp-beep/Bepp-beep.mp3");

// NEEDED TO ASSIGN SET TIMEOUT TO AS GLOBAL VARIABLE IN ORDER TO CLEAR IT
let interval;

// WITHOUT ISON USER IS POSSIBLE TO SPEED TIME UP BY CLICKING PLAY MORE THAN ONCE
let isOn = false;

// use parseInt(sessionLength.textContent); && parseInt(breakLength.textContent) to reset
class Timer {
  constructor(totalSeconds) {
    this.totalSeconds = totalSeconds;
  }
  minutes() {
    const minutes = Math.floor((this.totalSeconds % 3600) / 60);
    return checkSingleDigit(minutes);
  }
  seconds() {
    const seconds = (this.totalSeconds % 3600) % 60;
    return checkSingleDigit(seconds);
  }
  // Static method for resting time
  static init() {
    countdown.totalSeconds = 1500;
    breakCountdown.totalSeconds = 300;
    currentTime = countdown;
    stopCountdown();
    displayTime(timer);
    displayTime(sessionLength);
    displayCountDown(breakLength);
  }
}

// Creating two instances of time class

const countdown = new Timer(1500);

const breakCountdown = new Timer(300);

// NEED REFRENCE FOR WHAT TIME IS IN CURRENT USE

let currentTime;

Timer.init();

// Application CONTROLLER for user input... (Event handlers):
play.addEventListener("click", startCountdown);

pause.addEventListener("click", stopCountdown);

reset.addEventListener("click", Timer.init);

sessionMinus.addEventListener("click", deductSessionTime);

sessionAdd.addEventListener("click", addSessionTime);

breakMinus.addEventListener("click", deductBreakTime);

breakAdd.addEventListener("click", addBreakTime);

// Application MODEL for Timer logic...:

function startCountdown() {
  if (!isOn) {
    isOn = true;
    return (interval = setInterval(countdownInterval, 1000));
  }
}

function stopCountdown() {
  isOn = false;
  clearInterval(interval);
}

function deductSessionTime() {
  // Need to be greeter than 60 since otherwise user will decrement total minutes to nothing
  if (countdown.totalSeconds > 60 && !isOn) {
    countdown.totalSeconds -= 60;
    displayTime(sessionLength);
    displayTime(timer);
  }
}

function deductBreakTime() {
  // Need to be greeter than 60 since otherwise user will decrement total minutes to nothing
  if (breakCountdown.totalSeconds > 60 && !isOn) {
    breakCountdown.totalSeconds -= 60;
    // This will override what is shown from display Time
    displayCountDown(breakLength);
  }
}

function addSessionTime() {
  // If total seconds is set to less than or equal to 3600, user is possible to increment / decrement time if timer value... e.g. 59:40 => +60
  if (countdown.totalSeconds < 3541 && !isOn) {
    countdown.totalSeconds += 60;
    displayTime(sessionLength);
    displayTime(timer);
    // This will override what is shown from display Time
    displaySixty(countdown, sessionLength);
  }
}

function addBreakTime() {
  // If total seconds is set to less than or equal to 3600, user is possible to increment / decrement time if timer value... e.g. 59:40 => +60
  if (breakCountdown.totalSeconds < 3541 && !isOn) {
    breakCountdown.totalSeconds += 60;
    displayCountDown(breakLength);
    displaySixty(breakCountdown, breakLength);
  }
}

function countdownInterval() {
  currentTime.totalSeconds--;
  currentTime === countdown ? displayTime(timer) : displayCountDown(timer);

  if (currentTime === countdown && currentTime.totalSeconds <= 0) {
    audio.play();
    currentTime = breakCountdown;
    countdown.totalSeconds = parseInt(sessionLength.textContent) * 60;
  } else if (currentTime === breakCountdown && currentTime.totalSeconds <= 0) {
    audio.play();
    currentTime = countdown;
    breakCountdown.totalSeconds = parseInt(breakLength.textContent) * 60;
  }
}

//Application VIEWS for UI:

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

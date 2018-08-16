const timer = document.querySelector(".clock span");
const play = document.querySelector(".play");
const pause = document.querySelector(".pause");
const reset = document.querySelector(".reset");

const sessionLength = document.querySelector(".session-length span");
const sessionMinus = document.querySelector(
  ".session-length button:nth-of-type(1)"
);
const sessionAdd = document.querySelector(
  ".session-length button:nth-of-type(2)"
);

const breakLength = document.querySelector(".break-length span");
const breakMinus = document.querySelector(
  ".break-length button:nth-of-type(1)"
);
const breakAdd = document.querySelector(".break-length button:nth-of-type(2)");

// AUDIO FOR TRANSITION
let audio = new Audio("Bepp-beep/Bepp-beep.mp3");

// NEEDED TO ASSIGN SET TIMEOUT TO VARIABLE IN ORDER TO CLEAR IT
let interval;

// WITHOUT ISON USER IS POSSIBLE TO SPEED TIME UP BY CLICKING PLAY MORE THAN ONCE
let isOn = false;

// use parseInt(sessionLength.textContent); && parseInt(breakLength.textContent) to reset

class Timer {
  constructor(totalSeconds) {
    this.totalSeconds = totalSeconds;
  }
  minutes() {
    let minutes = Math.floor((this.totalSeconds % 3600) / 60);
    return checkSingleDigit(minutes);
  }
  seconds() {
    let seconds = (this.totalSeconds % 3600) % 60;
    return checkSingleDigit(seconds);
  }
}

const countdown = new Timer(1500);

const breakCountdown = new Timer(300);

// NEED REFRENCE FOR WHAT TIME IS IN CURRENT USE

let currentTime;

init();

play.addEventListener("click", startCountdown);

pause.addEventListener("click", stopCountdown);

reset.addEventListener("click", init);

sessionMinus.addEventListener("click", function() {
  if (countdown.totalSeconds > 60 && !isOn) {
    countdown.totalSeconds -= 60;
    displayTime(sessionLength);
    displayTime(timer);
  }
});

sessionAdd.addEventListener("click", function() {
  if (countdown.totalSeconds < 3600 && !isOn) {
    countdown.totalSeconds += 60;
    displayTime(sessionLength);
    displayTime(timer);
    // This will override what is shown from display Time
    displaySixty(countdown, sessionLength);
  }
});

breakMinus.addEventListener("click", function() {
  if (breakCountdown.totalSeconds > 60 && !isOn) {
    breakCountdown.totalSeconds -= 60;
    displayTime(breakLength);
    // This will override what is shown from display Time
  }
});

breakAdd.addEventListener("click", function() {
  if (breakCountdown.totalSeconds < 3600 && !isOn) {
    breakCountdown.totalSeconds += 60;
    displayTime(breakLength);
    displaySixty(breakCountdown, breakLength);
  }
});

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

function displayTime(time) {
  if (time === breakLength) {
    return (time.textContent = `${breakCountdown.minutes()}:${breakCountdown.seconds()}`);
  }
  return (time.textContent = `${countdown.minutes()}:${countdown.seconds()}`);
}

function displayCountDown(time) {
  return (time.textContent = `${breakCountdown.minutes()}:${breakCountdown.seconds()}`);
}

/*IF NUMBER ONLY HAS 1 DIGIT SLICE -2 WILL RETURN ZERO WITH DIGIT 
    ELSE IF DIGIT TWO DIGITS SLICE OFF ZERO SINCE -2 SLICE WILL RETURN LAST TWO IN STRING 
    */
function checkSingleDigit(num) {
  return ("0" + num).slice(-2);
}

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

// This helper function is needed since without it current time will be displayed as 00:00

function displaySixty(time, timeIncrementer) {
  if (time.totalSeconds === 3600) {
    timer.textContent = "60:00";
    timeIncrementer.textContent = "60:00";
  }
}

function init() {
  countdown.totalSeconds = 1500;
  breakCountdown.totalSeconds = 300;
  currentTime = countdown;
  stopCountdown();
  displayTime(timer);
  displayTime(sessionLength);
  displayTime(breakLength);
}

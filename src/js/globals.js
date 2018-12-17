import { checkSingleDigit } from "./helpers";

// AUDIO FOR TRANSITION Need require in order to correctly store audio
const sound = require("../audio/beep.mp3");

// Work session element nodes:
const timer = document.querySelector(".clock-span");
const play = document.querySelector(".play");
const pause = document.querySelector(".pause");
const reset = document.querySelector(".reset");

// Session length element nodes:
const sessionLength = document.querySelector(".session-span");
const sessionMinus = document.querySelector(".session-minus");
const sessionAdd = document.querySelector(".session-add");

// Break length element nodes:
const breakLength = document.querySelector(".break-span");
const breakMinus = document.querySelector(".break-minus");
const breakAdd = document.querySelector(".break-add");

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
}

// Creating two instances of time class

const countdown = new Timer(1500);

const breakCountdown = new Timer(300);

const timeObj = {
  interval: null,
  isOn: false,
  currentTime: null
};

const audio = new Audio(sound);

export {
  timer,
  play,
  pause,
  reset,
  sessionLength,
  sessionMinus,
  sessionAdd,
  breakLength,
  breakMinus,
  breakAdd,
  countdown,
  breakCountdown,
  timeObj,
  audio
};

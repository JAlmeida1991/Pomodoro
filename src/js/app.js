import "@fortawesome/fontawesome-free/css/all.min.css";
import * as globals from "./globals";
import * as helpers from "./helpers";

window.addEventListener("load", helpers.init);
globals.reset.addEventListener("click", helpers.init);
globals.play.addEventListener("click", helpers.startCountdown);
globals.pause.addEventListener("click", helpers.stopCountdown);
globals.sessionMinus.addEventListener("click", helpers.deductSessionTime);
globals.sessionAdd.addEventListener("click", helpers.addSessionTime);
globals.breakMinus.addEventListener("click", helpers.deductBreakTime);
globals.breakAdd.addEventListener("click", helpers.addBreakTime);

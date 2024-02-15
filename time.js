import * as Min from "./GameMode/mintomax.js";
import * as Max from "./GameMode/maxtomin.js";
import * as Rand from "./GameMode/randomize.js";
import * as Mul from "./GameMode/multiples.js";
import * as Totall from "./GameMode/total.js";
import { TimeValue, GirdValue, WinBox } from "./script.js";

let frames = 0;
let seconds = 0, minutes = 0;
let lock = false;

function NormalTimer() {
  frames++;
  if (frames > 59) {
    seconds++;
    frames = 0;
  }
  if (seconds > 59) {
    minutes++;
    seconds = 0;
  }
  if (Min.WinGame == true || Max.WinGame == true || Rand.WinGame == true || Mul.WinGame || Totall.WinGame) {
    WinBox();
    return;
  };

  document.querySelector(".times").textContent = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
  requestAnimationFrame(NormalTimer);
}

function StartingCountdown() {
  minutes = TimeValue;
  Countdown();
}

function Countdown() {
  frames++;
  if (frames > 59) {
    seconds--;
    frames = 0;
  }
  if (seconds < 0) {
    minutes--;
    seconds = 59;
  }
  if (minutes < 0 && seconds == 59) {
    disabledd();
    Defeat();
    return false;
  }
  if (Min.WinGame == true || Max.WinGame == true || Rand.WinGame == true || Mul.WinGame || Totall.WinGame) {
    WinBox();
    return;
  };
  document.querySelector(".times").textContent = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
  requestAnimationFrame(Countdown);
}

function disabledd() {
  for (let i = 0; i < GirdValue; i++) {
    for (let j = 0; j < GirdValue; j++) {
      lock = true;
    }
  }
}

export {
  frames, seconds, minutes,
  NormalTimer, StartingCountdown, disabledd, lock
}
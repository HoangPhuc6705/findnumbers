import { GirdValue } from "../script.js";
import { lock } from "../time.js";
var A = [] //mảng 1 chiều
var B = [] //mang 2 chieu tu mot chieu
var WinGame;
var k = 0;
var multiples;
function CreateDataNumber() {
  var g = GirdValue;
  multiples = Math.floor(Math.random() * 9) + 1;
  for (let i = 0; i < g * g; i++) {
    A[i] = i + 1;
    if (A[i] % multiples == 0) k++;
  }
  A = A.sort(() => Math.random() - 0.5);
  for (let i = 0; i < g; i++) {
    B[i] = [];
    for (let j = 0; j < g; j++) {
      B[i][j] = A[j + (i * g)]
      const num = document.createElement("p");
      num.textContent = B[i][j];
      const box = document.querySelectorAll("ul")[i].querySelectorAll("li")[j];
      box.onclick = () => {
        position(i, j);
      }
      box.appendChild(num);
    }
  }
  document.querySelector(".request").textContent = `Tìm bội của ${multiples}`;
}

function position(i, j) {
  if (lock) return;
  if (B[i][j] % multiples == 0) {
    document.querySelectorAll("ul")[i].querySelectorAll("li")[j].style.transform = "scale(0)";
    k--;
    if (k < 1) {
      WinGame = true;
      disabledd();
      return;
    }
    document.querySelector(".request").textContent = `Tìm bội của ${multiples}`;
  }
}

function disabledd() {
  for (let i = 0; i < GirdValue; i++) {
    for (let j = 0; j < GirdValue; j++) {
      lock = true;
    }
  }
}

export {
  A, B, CreateDataNumber, position, WinGame, k, multiples, disabledd
}
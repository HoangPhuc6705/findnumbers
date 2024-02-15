import { GirdValue } from "../script.js";
import { NormalTimer, disabledd, lock } from "../time.js";
import { WinBox, Defeat } from "../script.js";
var A = [] //mảng 1 chiều
var B = [] //mang 2 chieu tu mot chieu
var WinGame;
var total;
var k = 0, t = 0;
function CreateDataNumber() {
  for (let i = 1; i <= GirdValue * GirdValue; i++) {
    t += i;
  }
  total = Math.floor(Math.random() * (t + 1 - GirdValue * GirdValue)) + GirdValue * GirdValue;
  var g = GirdValue;
  for (let i = 0; i < g * g; i++) {
    A[i] = i + 1;
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
  document.querySelector(".request").textContent = `Tìm những số có tổng bằng đúng ${total}`;
  document.querySelector(".paramater").textContent = `Tổng hiện tại ${ans}`;
}

var ans = 0;
function position(i, j) {
  if (lock) return;
  document.querySelector(".request").textContent = `Tìm những số có tổng bằng đúng ${total}`;
  document.querySelectorAll("ul")[i].querySelectorAll("li")[j].style.transform = "scale(0)";
  ans += B[i][j];
  document.querySelector(".paramater").textContent = `Tổng hiện tại ${ans}`;
  if (ans == total) {
    WinGame = true;
    WinBox();
    disabledd();
  }
  if (ans > total) {
    Defeat();
    disabledd();
  }
}
// document.querySelector(".request").textContent = `Tìm số ${Randomize[k]}`;


export {
  A, B, CreateDataNumber, position, WinGame, k, total, t, ans
}
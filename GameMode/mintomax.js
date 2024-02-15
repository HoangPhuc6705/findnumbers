import { GirdValue } from "../script.js";
import { lock } from "../time.js";
var A = [] //mảng 1 chiều
var B = [] //mang 2 chieu tu mot chieu
var WinGame;
var k = 1;
var G, wrong = 0;
function CreateDataNumber() {
  var g = GirdValue;
  G = GirdValue * GirdValue;
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
  document.querySelector(".request").textContent = `Tìm số ${k}`;
  document.querySelector(".paramater").innerHTML = `Tổng số ô: ${GirdValue * GirdValue}<br>Số ô còn lại: ${G - (k - 1)}<br>Số lần đúng: ${k - 1}<br>Số lần sai: ${wrong}`;

}

function position(i, j) {
  if (lock) return;
  if (B[i][j] == k) {
    document.querySelectorAll("ul")[i].querySelectorAll("li")[j].style.transform = "scale(0)";
    k++;
    if (k > GirdValue * GirdValue) {
      WinGame = true;
      return;
    }
    document.querySelector(".request").textContent = `Tìm số ${k}
    `;
    document.querySelector(".paramater").innerHTML = `Tổng số ô: ${GirdValue * GirdValue}<br>Số ô còn lại: ${G - (k - 1)}<br>Số lần đúng: ${k - 1}<br>Số lần sai: ${wrong}`;

  } else {
    wrong++;
    document.querySelector(".paramater").innerHTML = `Tổng số ô: ${GirdValue * GirdValue}<br>Số ô còn lại: ${G - (k - 1)}<br>Số lần đúng: ${k - 1}<br>Số lần sai: ${wrong}`;
  }
}


export {
  A, B, CreateDataNumber, position, k, WinGame, G, wrong
}
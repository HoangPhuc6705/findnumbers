// Thông tin đầu vào
import * as Min from "./GameMode/mintomax.js";
import * as Max from "./GameMode/maxtomin.js";
import * as Rand from "./GameMode/randomize.js";
import * as mul from "./GameMode/multiples.js";
import * as totall from "./GameMode/total.js";
import * as TheTime from "./time.js"
var NameGameMode = [
  "Min to Max",
  "Max to Min",
  "Randomize",
  "Divisor",
  "Time Keeper",
  "Coples"
]
var Modevalue = 1; //Giá trị chế độ mặc định
var GirdValue = 5; //Lưới mặc định
var TimeValue = 0; //Thời gian mặc định

// Chọn chế độ
document.querySelector("#GameMode").onclick = () => {
  const Choose = document.querySelector("#GameMode");
  Modevalue = Number(Choose.value);
}
document.querySelector("#Grid").onclick = () => {
  const Choose = document.querySelector("#Grid");
  GirdValue = Choose.value;
}
document.querySelector("#Time").onclick = () => {
  const Choose = document.querySelector("#Time");
  TimeValue = Choose.value;
}

// Khởi động game
function StartGame() {
  // Xoá sảnh chọn
  document.querySelector(".title-box").remove();
  document.querySelector(".option-box").remove();

  // Tạo giao diện gameplay
  paramaterBox();
  GameplayBox();

  // Paramater

  // Tạo dữ liệu
  switch (Modevalue) {
    case 1:
      Min.CreateDataNumber();
      break;
    case 2:
      Max.CreateDataNumber();
      break
    case 3:
      Rand.CreateDataNumber();
      break;
    case 4:
      mul.CreateDataNumber();
      break;
    case 6:
      totall.CreateDataNumber();
      break;
  }

  // Thiet lap giao dien theo khung hinh
  formatUI();
  

  // Set thoi gian
  switch (TimeValue) {
    case 0:
      TheTime.NormalTimer();
      break;
    default:
      TheTime.StartingCountdown();
      break;
  }
}


// Tạo hộp thông số
function paramaterBox() {
  const paramater = document.createElement("div");
  paramater.classList.add("title-box");

  // Các thông số
  const classname = [
    "request",
    "times",
    "paramater"
  ]
  for (let i = 0; i < 3; i++) {
    const para = document.createElement("div");
    para.className = classname[i];
    paramater.appendChild(para);
  }

  document.querySelector(".container").appendChild(paramater);
}
//Tạo hộp gameplay
function GameplayBox() {
  const gameplay = document.createElement("div");
  gameplay.classList.add("option-box");

  const outline = document.createElement("div");
  outline.classList.add("outline-box");

  const inline = document.createElement("div");
  inline.classList.add("matrix");

  for (let i = 0; i < GirdValue; i++) {
    const rows = document.createElement("ul");
    rows.classList.add("rowbox")
    for (let j = 0; j < GirdValue; j++) {
      const columns = document.createElement("li");
      columns.classList.add("box", "number");
      rows.appendChild(columns);
    }
    inline.appendChild(rows);
  }
  outline.appendChild(inline);

  gameplay.appendChild(outline);
  document.querySelector(".container").appendChild(gameplay);
}


// Thêm sự kiện
document.querySelector("#startgame").onclick = () => {
  StartGame();
}

// Hộp thoại khi thắng game
function WinBox() {
  const backgroundf = document.createElement("div");
  const box = document.createElement("div");
  const title = document.createElement("p");
  const title2 = document.createElement("p");
  const reload = document.createElement("button");

  reload.onclick = () => {
    rel();
  }

  backgroundf.classList.add("backgroundf");
  box.classList.add("result-box");
  title.textContent = `Chiến thắng`;
  title.classList.add("title1");
  reload.textContent = "Quay lại sảnh"

  backgroundf.appendChild(box);
  box.appendChild(title);
  box.appendChild(title2);
  box.appendChild(reload);
  document.body.appendChild(backgroundf);
}

function rel() {
  location.reload();
}

// Hộp thoại khi thua cay đỏ dái
function Defeat() {
  const backgroundf = document.createElement("div");
  const box = document.createElement("div");
  const title = document.createElement("p");
  const title2 = document.createElement("p");
  const reload = document.createElement("button");

  reload.onclick = () => {
    rel();
  }

  backgroundf.classList.add("backgroundf");
  box.classList.add("result-box");
  title.textContent = `Thua cuộc`;
  title.classList.add("title1");
  reload.textContent = "Quay lại sảnh"

  backgroundf.appendChild(box);
  box.appendChild(title);
  box.appendChild(title2);
  box.appendChild(reload);
  document.body.appendChild(backgroundf);
}

function formatUI() {
  if (GirdValue == 3) {
    fontsize(400);
  }
  if (GirdValue == 4) {
    fontsize(300);
  }
  if (GirdValue == 5) {
    fontsize(300);
  }
  if (GirdValue == 6) {
    fontsize(200);
  }
  if (GirdValue == 7) {
    fontsize(250);
  }
  if (GirdValue == 8) {
    fontsize(200);
  }
  if (GirdValue == 9) {
    fontsize(180);
  }
  if (GirdValue == 10) {
    fontsize(140);
  }
  if (GirdValue == 20) {
    fontsize(70);
  }
}

function fontsize(f) {
  for (let i = 0; i < GirdValue; i++) {
    for (let j = 0; j < GirdValue; j++) {
      document.querySelectorAll("ul")[i].querySelectorAll("li")[j].style.fontSize = `${f}%`;
    }
  }
}

export { GirdValue, TimeValue, WinBox, Defeat }


// che do toan man hinh tren dien thoai
// function isMobileDevice() {
//   return /Mobi|Android/i.test(navigator.userAgent);
// }

// if (isMobileDevice()) {
//   console.log("Đây là một thiết bị di động.");
// } else {
//   console.log("Đây là một máy tính.");
//   AutoFullScreen();
// }

// function AutoFullScreen() {
//   const fullscreen = document.querySelector("html");
//   if (fullscreen.requestFullscreen) {
//     fullscreen.requestFullscreen();
//   }
// }
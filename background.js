const background = document.querySelector('.background');
var number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
number = number.sort(() => Math.random() - 0.5);
for (let i in number) {
  let num = document.createElement('p');
  num.innerHTML = number[i];
  background.appendChild(num);
}
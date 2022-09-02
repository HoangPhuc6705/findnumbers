// start
document.querySelectorAll('.chooselever button')[0].onclick = function () { close() }
const title = document.querySelector('.title');
var close = () => {
    document.querySelectorAll('.chooselever button')[0].disabled = true;
    start();
    const a = document.querySelectorAll('.chooselever')[0];
    setTimeout(function () {
        a.style.display = 'none';
        title.style.display = 'none';
        document.querySelectorAll('.game')[0].style.display = 'flex';
        createTable(getgird);
        GetTimer();
        TimeRemaining();
        setInterval(TimeRemaining, 1000);
    }, 0)
}
var lever = document.getElementById('getlever'),
    timer = document.getElementById('gettime'),
    gird = document.querySelector('.grid'),
    leverValue,
    timevalue,
    getgird;
var start = () => {
    leverValue = lever.value;
    timevalue = timer.value;
    getgird = Number(gird.value);
}

// game
var A = [], B = [];
var Aarray = [];
var M;
var createTable = (m) => {
    M = m;
    for (let i = 0; i < m * m; i++) {
        A[i] = i + 1;
    }
    A = A.sort(() => Math.random() - 0.5);
    for (let i = 0; i < m; i++) {
        Aarray[i] = [];
        B[i] = [];
        for (let j = 0; j < m; j++) {
            B[i][j] = 0;
            Aarray[i][j] = A[j + (i * m)];
        }
    }

    for (let i = 0; i < m; i++) {
        const table = document.querySelectorAll('table')[0];
        let row = document.createElement('tr');
        table.appendChild(row);
        for (let j = 0; j < m; j++) {
            let text = document.createElement('p');
            let cols = document.createElement('th');
            cols.innerHTML = Aarray[i][j];
            NoTitle3(cols, i, j);
            cols.appendChild(text);
            row.appendChild(cols);
        }
    }
    NoTitle1();
    GetTimer();
}

var mode;
// Lấy con số đầu
var NoTitle1 = () => {
    switch (leverValue) {
        case '1':
            mode = M / M;
            NoTitle2();
            break;

        case '2':
            mode = M * M;
            NoTitle2();
            break;

        case '3':
            A = A.sort(() => Math.random() - 0.5);
            mode = A[0];
            NoTitle2();
            break;

        case '4':
            mode = Math.floor(Math.random() * 8) + 2;
            DivisibleNumber(mode);

            document.getElementById('find').style.fontSize = '1.5vh' 
            document.getElementById('find').innerHTML = 'Find divisible number for ' + (mode) + '</br>' + (DivisibleCount3) + ' numbers left'
            break;
    }
}


var NoTitle2 = () => {
    for (let i in Aarray) {
        for (let j in Aarray) {
            if (Aarray[i][j] == mode) {
                B[i][j] = 1;
                break;
            }
        }
    }
    document.getElementById('find').innerHTML = 'Find number: ' + mode;
}

// Chế độ
var NoTitle3 = (a, x, y) => {
    switch (leverValue) {
        case '1':
            a.onclick = function () { MinToMax(x, y) }
            break;

        case '2':
            a.onclick = function () { MaxToMin(x, y) }
            break;

        case '3':
            a.onclick = function () { FindRandom(x, y) }
            break;

        case '4':
            a.onclick = function () { Divisible(x, y) }
    }
}

// Chiến thắng
var Win = (end, x, y) => {
    if (Aarray[x][y] == end) {
        document.getElementById('find').innerHTML = 'YOU WIN !';
        stop = true;
        RetryBtn();
        document.getElementById('home').remove();
    }
}


// B[x][y] == 1 là chọn đc
// B[x][y] == 0 là không thể chọn
// B[x][y] == 2 là đã chọn
var MinToMax = (x, y) => {
    // Hết giờ
    if (timeUp) return false;
    // Không chọn lại
    if (B[x][y] == 2) return false;

    // Chọn sai
    if (B[x][y] == 0) {
        document.querySelectorAll('tr')[x].querySelectorAll('th')[y].style.animation = 'error 0.5s';
        setTimeout(function () {
            document.querySelectorAll('tr')[x].querySelectorAll('th')[y].style.animation = 'none';
        }, 500)
        return false;
    }

    // Chọn đúng
    B[x][y] = 2;
    document.querySelectorAll('tr')[x].querySelectorAll('th')[y].style.animation = 'true 0.5s';
    setTimeout(function () {
        document.querySelectorAll('tr')[x].querySelectorAll('th')[y].style.visibility = 'hidden';
    }, 500);

    // Định nghĩa số tiếp theo
    for (i in Aarray) {
        for (j in Aarray) {
            if (Aarray[i][j] == Aarray[x][y] + 1) {
                B[i][j] = true;
            }
        }
    }

    // In ra màn hình
    document.getElementById('find').innerHTML = 'Find number: ' + (Aarray[x][y] + 1);

    // Win
    Win(M * M, x, y);
}

var MaxToMin = (x, y) => {
    // Hết giờ
    if (timeUp) return false;
    // Không chọn lại
    if (B[x][y] == 2) return false;

    // Chọn sai
    if (B[x][y] == 0) {
        document.querySelectorAll('tr')[x].querySelectorAll('th')[y].style.animation = 'error 0.5s';
        setTimeout(function () {
            document.querySelectorAll('tr')[x].querySelectorAll('th')[y].style.animation = 'none';
        }, 500)
        return false;
    }

    // Chọn đúng
    B[x][y] = 2;
    document.querySelectorAll('tr')[x].querySelectorAll('th')[y].style.animation = 'true 0.5s';
    setTimeout(function () {
        document.querySelectorAll('tr')[x].querySelectorAll('th')[y].style.visibility = 'hidden';
    }, 500);

    // Lượt tiếp theo
    for (i in Aarray) {
        for (j in Aarray) {
            if (Aarray[i][j] == Aarray[x][y] - 1) {
                B[i][j] = true;
            }
        }
    }

    // In ra màn hình
    document.getElementById('find').innerHTML = 'Find number: ' + (Aarray[x][y] - 1);

    // Win
    Win(M / M, x, y);
}

var inc = 0;
var FindRandom = (x, y) => {
    // Hết giờ
    if (timeUp) return false;
    // Không chọn lại
    if (B[x][y] == 2) return false;

    // Chọn sai
    if (B[x][y] == 0) {
        document.querySelectorAll('tr')[x].querySelectorAll('th')[y].style.animation = 'error 0.5s';
        setTimeout(function () {
            document.querySelectorAll('tr')[x].querySelectorAll('th')[y].style.animation = 'none';
        }, 500)
        return false;
    }

    // Chọn đúng
    B[x][y] = 2;
    document.querySelectorAll('tr')[x].querySelectorAll('th')[y].style.animation = 'true 0.5s';
    setTimeout(function () {
        document.querySelectorAll('tr')[x].querySelectorAll('th')[y].style.visibility = 'hidden';
    }, 500);

    // Lượt tiếp theo
    let nextX, nextY;
    inc++;
    for (i in B) {
        nextY = Aarray[i].indexOf(A[inc]);
        if (nextY > -1) {
            nextX = i;
            B[nextX][nextY] = true;
            break;
        }
    }

    if (inc > M * M - 1) {
        RetryBtn();
        document.getElementById('find').innerHTML = 'YOU WIN !';
        stop = true;
        return false;
    }

    // In ra màn hình
    document.getElementById('find').innerHTML = 'Find number: ' + Aarray[nextX][nextY];
}

var DivisibleCount1 = 0; //Số phần tử thõa mãn điều kiện
var DivisibleCount2 = 0; //Đếm phần tử
var DivisibleCount3 = 0; //Bản sao DivisibleCount1
var DivisibleNumber = (x) => {
    for (i in Aarray) {
        for (j in Aarray) {
            if (Aarray[i][j] % x == 0) {
                B[i][j] = 1;
                DivisibleCount1++;
            }
        }
    }
    DivisibleCount3 = DivisibleCount1;
}
var Divisible = (x, y) => {
    // Hết giờ
    if (timeUp) return false;
    // Không chọn lại
    if (B[x][y] == 2) return false;

    // Chọn sai
    if (B[x][y] == 0) {
        document.querySelectorAll('tr')[x].querySelectorAll('th')[y].style.animation = 'error 0.5s';
        setTimeout(function () {
            document.querySelectorAll('tr')[x].querySelectorAll('th')[y].style.animation = 'none';
        }, 500)
        return false;
    }

    // Chọn đúng
    B[x][y] = 2;
    document.querySelectorAll('tr')[x].querySelectorAll('th')[y].style.animation = 'true 0.5s';
    setTimeout(function () {
        document.querySelectorAll('tr')[x].querySelectorAll('th')[y].style.visibility = 'hidden';
    }, 500);
    DivisibleCount2++;
    DivisibleCount3--;

    // Kiểm tra số lượng phần tử
    if (DivisibleCount2 == DivisibleCount1) {
        document.getElementById('find').style.fontSize = '3vh';
        document.getElementById('find').innerHTML = 'YOU WIN !';
        stop = true;
        RetryBtn();
        return false;
    }

    //  In ra màn hình
    document.getElementById('find').innerHTML = 'Find divisible number for ' + (mode) + '</br>' + (DivisibleCount3) + ' numbers left';
}



var Minutes, Seconds = 0;
var timeUp = false;
var stop = false;
var GetTimer = () => {
    Minutes = Number(timevalue);
    // Minutes = 0;
    // Seconds = 3;
}
var Check = (i) => {
    if (i < 10) i = '0' + i;
    return i;
}
var TimeRemaining = () => {
    if (stop) {
        clearInterval(TimeRemaining);
        return false;
    }
    if ((Minutes < 1) && (Seconds < 0)) {
        timeUp = true;
        document.getElementById('find').innerHTML = 'YOU LOST !';

        // Chỗ này đéo hiểu sao hàm Retrybtn bị lặp mặc dù clearInterval
        // Dùng true false tạm thời chặn lại
        RetryBtn();

        document.getElementById('countdown').innerHTML = `TIME'S UP !`;
        clearInterval(TimeRemaining);
        return false;
    }
    if (Seconds < 0) {
        Seconds = 59;
        Minutes--;
    }
    Seconds = Check(Seconds);
    document.getElementById('countdown').innerHTML = 'Time remaining</br>' + Minutes + ':' + Seconds;
    // console.log(Minutes + ':' + Seconds)
    Seconds--;
}

var temporary = true;
var RetryBtn = () => {
    if (temporary) {
        let btn = document.createElement('button');
        btn.innerHTML = 'Retry';
        btn.id = 'retry';
        btn.onclick = function () { Reset() };
        document.querySelector('.game').appendChild(btn);
        document.getElementById('home').remove();
        temporary = false;
    }
}
var Reset = () => {
    location.reload();
}
// start
document.querySelectorAll('.chooselever button')[0].onclick = function () { close() }
const title = document.querySelector('.title');

// Xử lí thông tin khi đang chọn
document.getElementById('gettime').onclick = function () { Timeline() };
var Timeline = () => {
    let times = document.getElementById('gettime').value;

    if (times == '1') {
        let grid = document.querySelector('.grid').value;
        if (Number(grid) >= 8) {
            document.querySelector('.grid').options[2].selected = true;
            alert('Can not play 8x8 -> 10x10');
        }
        for (let i = 5; i <= 7; i++) {
            document.querySelector('.grid').options[i].disabled = true;
        }
        return true;
    }
    for (let i = 5; i <= 7; i++) {
        document.querySelector('.grid').options[i].disabled = false;
    }
}
document.getElementById('getlever').onclick = function () { Getlever() };
var Getlever = () => {
    var level = document.getElementById('getlever').value;
    if (level == '5') {
        document.getElementById('gettime').disabled = true;
        document.getElementById('gettime').options[0].selected = true;
        document.getElementById('gettime').options[0].innerHTML = '20 seconds';

        for (let i = 5; i <= 7; i++) {
            document.querySelector('.grid').options[i].disabled = false;
        }
    } else {
        document.getElementById('gettime').disabled = false;
        document.getElementById('gettime').options[3].selected = true;
        document.getElementById('gettime').options[0].innerHTML = '1 minutes';
    }
}

// Tắt bảng chọn
var close = () => {
    document.querySelectorAll('.chooselever button')[0].disabled = true;
    start();
    const a = document.querySelectorAll('.chooselever')[0];
    // Lấy tên chế độ
    var ModeName = document.getElementById('getlever');

    setTimeout(function () {
        document.getElementById('mode-name').innerHTML = ModeName.options[ModeName.selectedIndex].text + ' ' + (Number(getgird)) + ' x ' + (Number(getgird)) + '</br>' + timevalue + ' minutes';
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

// Lấy thông tin chế độ, thời gian, lưới
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

            wrongsClick = wrongsGrid[getgird - 3];

            document.getElementById('find').style.fontSize = '1.2vh'
            document.getElementById('find').innerHTML = `Find divisible number for ${mode}</br>${DivisibleCount3} numbers left</br>Wrong clicks: ${wrongsClick}`;
            break;

        case '5':
            timevalue = 0;
            Seconds = sc;
            mode = M / M;
            NoTitle2();
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
    document.getElementById('find').innerHTML = `Find number: ${mode}`;
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
            break;
        
        case '5':
            a.onclick = function () { TimeKeeper(x, y) }
            break;
    }
}

// Chiến thắng
var Win = (end, x, y) => {
    if (Aarray[x][y] == end) {
        YourTimeBox(YourTime);
        document.getElementById('find').innerHTML = 'YOU WIN !';
        stop = true;
        RetryBtn();
    }
}

// Your time box
var YourTimeBox = (k) => {
    let divMn = Math.floor(k / 60);
    let modSc = k % 60;
    modSc = Check(modSc);

    const timebox = document.createElement('p');
    timebox.id = 'your-time';
    timebox.innerHTML = `Your time: ${divMn}:${modSc}`;
    document.querySelector('.game').appendChild(timebox);
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
                B[i][j] = 1;
            }
        }
    }

    // In ra màn hình
    document.getElementById('find').innerHTML = `Find number: ${Aarray[x][y] + 1}`;

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
                B[i][j] = 1;
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
        YourTimeBox(YourTime);
        RetryBtn();
        document.getElementById('find').innerHTML = 'YOU WIN !';
        stop = true;
        return false;
    }

    // In ra màn hình
    document.getElementById('find').innerHTML = `Find number: ${Aarray[nextX][nextY]}`;
}

var DivisibleCount1 = 0; //Số phần tử thõa mãn điều kiện
var DivisibleCount2 = 0; //Đếm phần tử
var DivisibleCount3 = 0; //Bản sao DivisibleCount1
var wrongsClick = 0;
var wrongsGrid = [1, 2, 2, 2, 3, 3, 4, 5];
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
var ShowDivisible = () => {
    for (let i in B) {
        for (let j in B) {
            if (B[i][j] == 1) {
                document.querySelectorAll('tr')[i].querySelectorAll('th')[j].style.animation = 'show 0.5s';
                setTimeout(() => {
                    document.querySelectorAll('tr')[i].querySelectorAll('th')[j].style.background = 'rgb(255, 234, 0)';
                }, 500);
            }
        }
    }
}
var Divisible = (x, y) => {
    // Hết giờ
    if (timeUp) return false;
    // Không chọn lại
    if (B[x][y] == 2) return false;

    // Chọn sai
    if (B[x][y] == 0) {
        wrongsClick--;
        if (wrongsClick == 0) {
            document.querySelectorAll('tr')[x].querySelectorAll('th')[y].style.animation = 'error 0.5s';
            document.getElementById('find').style.fontSize = '3vh';
            document.getElementById('find').innerHTML = 'YOU LOST !';
            ShowDivisible();
            LockNumber();
            stop = true;
            RetryBtn();
            return false;
        }
        document.getElementById('find').innerHTML = `Find divisible number for ${mode}</br>${DivisibleCount3} numbers left</br>Wrong clicks: ${wrongsClick}`;

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
        LockNumber();
        document.getElementById('find').style.fontSize = '3vh';
        document.getElementById('find').innerHTML = 'YOU WIN !';
        YourTimeBox(YourTime);
        stop = true;
        RetryBtn();
        return false;
    }

    //  In ra màn hình
    document.getElementById('find').innerHTML = `Find divisible number for ${mode}</br>${DivisibleCount3} numbers left</br>Wrong clicks: ${wrongsClick}`;
}

var sc = 20;
var TimeKeeper = (x, y) => {
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
    let addedSeconds = 5;
    sc += addedSeconds;
    document.querySelectorAll('tr')[x].querySelectorAll('th')[y].style.animation = 'true 0.5s';
    setTimeout(function () {
        document.querySelectorAll('tr')[x].querySelectorAll('th')[y].style.visibility = 'hidden';
    }, 500);

    // Thời gian
    Minutes = Math.floor(sc / 60);
    Seconds = (sc % 60) + 1;
    TimeRemaining();

    // Định nghĩa số tiếp theo
    for (i in Aarray) {
        for (j in Aarray) {
            if (Aarray[i][j] == Aarray[x][y] + 1) {
                B[i][j] = 1;
            }
        }
    }

    // In ra màn hình
    document.getElementById('find').innerHTML = `Find number: ${Aarray[x][y] + 1}`;

    // Win
    Win(M * M, x, y);
}


var LockNumber = () => {
    for (i in B) {
        for (j in B) {
            B[i][j] = 2;
        }
    }
}


var Minutes, Seconds = 0;
var timeUp = false;
var stop = false;
var YourTime = -1;
var GetTimer = () => {
    Minutes = Number(timevalue);
    // Minutes = 0;
    // Seconds = 3;
}
var Check = (i) => {
    if (i < 10) i = `0${i}`;
    return i;
}
var TimeRemaining = () => {
    if (stop) {
        clearInterval(TimeRemaining);
        return false;
    }
    if ((Minutes < 1) && (Seconds < 1)) {
        // Dành cho divisible numbers
        ShowDivisible();

        LockNumber();
        timeUp = true;
        document.getElementById('find').style.fontSize = '3vh'; //Dòng này cho chế độ divisible numbers
        document.getElementById('find').innerHTML = 'YOU LOST !';

        // Chỗ này đéo hiểu sao hàm Retrybtn bị lặp mặc dù clearInterval
        // Dùng true false tạm thời chặn lại
        RetryBtn();

        document.getElementById('countdown').innerHTML = `TIME'S UP !`;
        clearInterval(TimeRemaining);
        return false;
    }
    // Dành cho Timekeeper



    if (Seconds < 0) {
        Seconds = 59;
        Minutes--;
    }
    Seconds = Check(Seconds);
    document.getElementById('countdown').innerHTML = `Time remaining</br>${Minutes}:${Seconds}`;
    // console.log(Minutes + ':' + Seconds)
    // Timekeeper mode
    sc--;

    Seconds--;
    YourTime++;
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
const board = document.querySelector('#board');
const row = window.screen.width < 1280 ? 20 : 40;
const column = window.screen.width < 1280 ? 20 : 40;
const snake = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
const divs = [];
let direction = 'left';
let random;
let interval;
let isGameOver = false;
let score = 0;
let record;
let maxScore = 0;
let stop = false;

// לא צריך לקרוא למשתנים בתוך העעיגול כי זה מתוך הגוואה סקריפט ולא מבחוץ
function createBoard() {
    board.style.gridTemplateColumns = `repeat(${row}, 1fr)`;
    for (let i = 0; i < column * row; i++) {
        const cell = document.createElement('div');
        board.appendChild(cell);
        divs.push(cell);
    }

    color();
    createApple();
    record = localStorage.getItem("record");
    maxScore = record;
    document.querySelector("#record span").innerText = record;
}

// לצבוע מיקומים לפי מערך של הנחש
function color() {
    divs.forEach(div => {
        div.classList.remove("snake", "head");
    });

    snake.forEach((x, i) => {
        divs[x].classList.add('snake');
        if (i === 0) {
            divs[x].classList.add("head");
        }
    });
}

function move(dir) {
    if (isGameOver) {
        return;
    }

    if (stop) {
        return;
    }

    let head = snake[0];

    if (dir == "up") {
        if (direction === 'down') {
            return;
        }
        head -= row;
        if (head < 0) {
            gameOver();
            return;
        }

    } else if (dir == "down") {
        if (direction === 'up') {
            return;
        }
        head += row;
        if (head >= row * column) {
            gameOver();
            return;
        }

    } else if (dir == "left") {
        if (direction === 'right') {
            return;
        }
        head++;
        if (head % row === 0) {
            gameOver();
            return;
        }
    } else if (dir == "right") {
        if (direction === 'left') {
            return;
        }
        if (head % row === 0) {
            gameOver();
            return;
        }
        head--;
    }

    if (snake.includes(head)) {
        gameOver();
        return;
    }

    direction = dir;
    snake.unshift(head);

    // התנאי הזה אומר אם המיקום של הדיב התפוח זהה למיקום של הדיב של הראש של הנחש
    if (divs[random] === divs[snake[0]]) {
        score++;
        document.querySelector("#score span").innerText = score;
        if (maxScore < score) {
            maxScore = score;
        }
        localStorage.setItem("record", maxScore);
        document.querySelector("#record span").innerText = record;
        sound("./snake_Pebble.ogg");
        createApple();
    } else {
        snake.pop();
    }

    color();
    autoMove();
}


window.addEventListener("keydown", ev => {
    ev.preventDefault();
    switch (ev.key) {
        case "ArrowUp": move("up"); break;
        case "ArrowRight": move("right"); break;
        case "ArrowDown": move("down"); break;
        case "ArrowLeft": move("left"); break;
    }
});


function createApple() {
    random = Math.round(Math.random() * (column * row));
    divs.forEach(div => {
        div.classList.remove('apple');
    });
    if (divs[random] === divs[snake[0]]) {
        createApple();
    }
    else {
        divs[random].classList.add('apple');
    }
}

function autoMove() {
    clearInterval(interval);
    const speed = 300 - score;
    interval = setInterval(() => move(direction), speed > 50 ? speed : 50);
}

function gameOver() {
    isGameOver = true;
    clearInterval(interval);
    sound("./snake_Country_Blues.ogg");;
    setTimeout(() => alert("המשחק נגמר"), 0);


}

function sound(fileName) {
    const audio = document.createElement('audio');
    audio.src = fileName;
    audio.play();
}

function newGame() {
    stop = false;
    snake.splice(0, snake.length);
    snake.push(9, 8, 7, 6, 5, 4, 3, 2, 1, 0);
    isGameOver = false;
    score = 0;
    document.querySelector("#score span").innerText = score;
    color();
    createApple();
    record = localStorage.getItem("record");
    document.querySelector("#record span").innerText = record;
}

function stopGame() {
    clearInterval(interval);
    stop = true;
}

function continuGame() {
    autoMove();
    stop = false;
}
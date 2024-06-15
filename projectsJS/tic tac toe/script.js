const divs = document.querySelectorAll("#board>div");
let isX = true;
let isGameOver = false;
let scoreX = 0;
let scoreO = 0;

scoreX = localStorage.getItem("scoreX");
scoreO = localStorage.getItem("scoreO");

document.querySelector("#x_score").innerText = scoreX;
document.querySelector("#o_score").innerText = scoreO;

// לולאה העוברת על כל המשבצות
divs.forEach(div => {
    // הוספת פונקציה המופעלת בעת לחיצה על אחת המשבצות
    div.addEventListener("click", ev => {
        if (isGameOver) {
            return;
        }

        // האלמנט שעליו לחץ השחקן
        const elem = ev.target;

        // אם המשבצת מלאה, הפונקציה נעצרת
        if (elem.innerText) {
            return;
        }

        if (isX) {
            elem.innerText = "X";
        } else {
            elem.innerText = "O";
        }

        // שינוי תור
        isX = !isX;
        // הפעלת הפונקציה של המחווה הויזואלית
        showTurn();
        checkWinner();
    });
})

/**
 * פונקציה הנותנת מחווה של איזה שחקן התור הנוכחי
 */
function showTurn() {
    // קודם כל, הסרנו את הקלאס מהשחקן האחרון
    document.querySelector('.currentTurn').classList.remove('currentTurn');

    // שם את הקלאס בהתאם לתור השחקן
    if (isX) {
        document.querySelector("#players>div:first-child").classList.add('currentTurn');
    } else {
        document.querySelector("#players>div:last-child").classList.add('currentTurn');
    }
}

function checkWinner() {
    // מערך של מערכים של מיקומים אפשריים לניצחון
    const options = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // רץ על המערך של כל האופציות
    for (const op of options) {
        // בודק את המיקומים של כל מערך
        if (op.every(x => divs[x].innerText === 'X')) {
            scoreX++;
            winner(op, 'X');
            scoreX = localStorage.getItem("scoreX");
            document.querySelector("#x_score").innerText = scoreX;
            break;
        } else if (op.every(x => divs[x].innerText === 'O')) {
            scoreO++
            winner(op, 'O');
            scoreO = localStorage.getItem("scoreO");
            document.querySelector("#o_score").innerText = scoreO;
            break;
        }
    }

    if (!isGameOver && [...divs].every(x => x.innerText)) {
        setTimeout(() => alert("אין מנצח"), 50);
        isGameOver = true;
    }
}

function winner(op, win) {
    setTimeout(() => alert(win + " is winner!"), 50);

    op.forEach(x => divs[x].classList.add('win'));

    isGameOver = true;

    localStorage.setItem("scoreX", scoreX);
    localStorage.setItem("scoreO", scoreO);

    // כשיש ניצחון, מאפשרים לשחקן המנצח להתחיל
    isX = !isX;
}

function newGame() {
    divs.forEach(div => {
        div.innerText = '';
        div.classList.remove('win');
    });

    isGameOver = false;
    showTurn();
}

function reset() {
    localStorage.setItem("scoreX", 0);
    localStorage.setItem("scoreO", 0);

    document.querySelector("#o_score").innerText = 0;
    document.querySelector("#x_score").innerText = 0;

}
const imagesArray = [
    "./images/bee.png",
    "./images/cow.png",
    "./images/dog.png",
    "./images/fox.png",
    "./images/lion.png",
    "./images/turtle.png",
    "./images/bee.png",
    "./images/cow.png",
    "./images/dog.png",
    "./images/fox.png",
    "./images/lion.png",
    "./images/turtle.png"];

let newArray = []; // מערך לאחר ערבוב המערך המקורי
let divs = []; // מערך שמקבלים מיצירת הלוח
let cards; // משתתנה מסוג nodelist שמכיל את כל הקלפים
let cardsArray = []; //מערך של קלפים

let numberClick = 1; //משתנה שאומר לי על כמה קלפים לחץ השחקן לטובת אי לחיצה כל קלף אחר בזמן שנלחצו 2 קלפים
let count = 0; // בודק אם נלחצו כבר 2 קלפים לטובת השוואה
let compare = []; // מערך להשוואה בין 2 הקלפים
let same = 0; // משתנה שמונה את כמות הפעמים שהצילחו לנחש - 6 מקסימלי ונגמר המשחק
let isFirstGame = true;
let previousElement = null;


function createBoard(imagesArray) {
    for (i = 0; i < imagesArray.length; i++) {
        const newDiv = document.createElement('div');
        newDiv.classList.add('card');
        const imageElem = document.createElement('img');
        imageElem.src = imagesArray[i];
        imageElem.classList.add('imageElem');
        imageElem.classList.add('notSee');
        newDiv.appendChild(imageElem);
        document.getElementById('board').appendChild(newDiv);
    }
    return document.querySelectorAll("#board>.card");
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        return array;
    }
}

function clearBoard() {
    divs.forEach(div => {
        div.removeChild(document.querySelector('.imageElem'));
        div.remove();
    });
    count = 0;
    same = 0;
}

function rotate(elem) {
    numberClick += 1;
    console.log()
    elem.classList.add('rotate');
    setTimeout(() => {
        elem.querySelector('.imageElem').style.display = "block";
    }, 250);

    compare.push(elem.querySelector('.imageElem'));
    if (count == 1) {
        setTimeout(() => {
            previousElement.classList.remove('rotate');
            elem.classList.remove('rotate');
            previousElement.querySelector('.imageElem').style.display = "none";
            elem.querySelector('.imageElem').style.display = "none";
        }, 1000);

        if (compare[0].src == compare[1].src) {
            same += 1;
            cardsArray.forEach(card => {
                if (card.querySelector('.imageElem').src == compare[0].src) {
                    setTimeout(() => {
                        card.style.transform = 'translateX(100vw)';
                        card.style.opacity = '0';
                    }, 500);
                }
            });
        }
        compare.splice(0, 2);
        count = 0;
        if (same == 6) {
            gameover();
        }

        setTimeout(() => {
            if (numberClick = 3) {
                numberClick = 1;
            }
        }, 1900);
    }
    else {
        count += 1;
    }
}

function gameover() {
    setTimeout(() => {
        const winnerMessage = document.createElement('div');
        winnerMessage.classList.add('message');
        winnerMessage.textContent = 'כל הכבוד הצלחתם לנחש הכל!';
        document.body.appendChild(winnerMessage);
        setTimeout(() => {
            winnerMessage.classList.add('visible');
        }, 0);;
    }, 1000);
    setTimeout(() => {
        let msg = document.querySelector('.message');
        msg.remove();
        isFirstGame = false;
        newGame();
    }, 2000);
}


function newGame() {
    if (isFirstGame) {
        newArray = shuffleArray(imagesArray);
        divs = createBoard(newArray);
        numberClick = 1;
    }
    else {
        clearBoard();
        newArray = shuffleArray(imagesArray);
        divs = createBoard(newArray);
        numberClick = 1;
    }

    cards = document.querySelectorAll('.card');
    cardsArray = Array.from(cards);
    cardsArray.forEach(card => {
        card.addEventListener('click', (e) => {
            if (numberClick < 3) {
                const currentElement = e.target;
                rotate(currentElement);
                if (numberClick == 2) {
                    previousElement = currentElement;
                }
            }
        });
    });


}
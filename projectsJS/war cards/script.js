import Deck from "./deck.js";

const CARD_VALUE_MAP = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 11,
    "Q": 12,
    "K": 13,
    "A": 14,
}

const computerCardSlot = document.querySelector('.computer-card-slot');
const playerCardSlot = document.querySelector('.player-card-slot');
const computerDeckElement = document.querySelector('.computer-deck');
const playerDeckElement = document.querySelector('.player-deck');
const text = document.querySelector('.textWin');
const computerDeckElementWin = document.querySelector('.computer-deck-win');
const playerDeckElementWin = document.querySelector('.player-deck-win');


let playerDeck;
let computerDeck;
let inRound;
let isFirstGame = true;
let stop;
let winPlayerDeck = [];
let winComputerDeck = [];
let playerCard;
let computerCard;
let count;
let sameArray = [];
let numOfCardsLessThan4;

if (isFirstGame) {
    firstGame;
}

firstGame();

document.addEventListener('click', () => {
    // if (stop) {
    //     startGame();
    //     return;
    // }
    if (inRound) {
        cleanBeforeRound();
    }
    else {
        flipCard();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('btn-new-game');
    button.addEventListener('click', gameOver);
})

function firstGame() {
    const deck = new Deck();
    deck.shuffle();

    const deckMidpoint = Math.ceil(deck.numberOfCards / 2);
    playerDeck = new Deck(deck.cards.slice(0, deckMidpoint));
    computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards));
    stop = false;
    isFirstGame = false;

    cleanBeforeRound();
}

function cleanBeforeRound() {
    inRound = false;
    computerCardSlot.innerHTML = '';
    playerCardSlot.innerHTML = '';
    text.innerText = '';

    updateDeckCount()
}

function updateDeckCount() {
    computerDeckElement.innerText = computerDeck.numberOfCards;
    playerDeckElement.innerText = playerDeck.numberOfCards;
    computerDeckElementWin.innerText = winComputerDeck.length;
    playerDeckElementWin.innerText = winPlayerDeck.length;
}

function flipCard() {
    if (isRoundGameOver(playerDeck)) {
        if (winPlayerDeck.length == 0) {
            alert("אתה המפסיד של המשחק!");
            gameOver();
        }
    } else if (isRoundGameOver(computerDeck)) {
        if (winComputerDeck.length == 0) {
            alert("אתה המנצח של המשחק!");
            gameOver();
        }
    }

    if (isRoundGameOver(playerDeck) || isRoundGameOver(computerDeck)) {
        // לולאה שמכניסה מהמערך ניצחונות למערך הרגיל של הקלפים
        for (let i = 0; i < winPlayerDeck.length; i++) {
            playerDeck.push(winPlayerDeck[i]);
        }
        winPlayerDeck = cleanWinArray(winPlayerDeck);
        for (let i = 0; i < winComputerDeck.length; i++) {
            computerDeck.push(winComputerDeck[i]);
        }
        winComputerDeck = cleanWinArray(winComputerDeck);
        startGame();
    }


    inRound = true;
    playerCard = playerDeck.pop();
    computerCard = computerDeck.pop();

    playerCardSlot.appendChild(playerCard.getHTML());
    computerCardSlot.appendChild(computerCard.getHTML());

    updateDeckCount();
    if (isRoundWinner(playerCard, computerCard)) {
        text.innerText = "אתה המנצח";
        winPlayerDeck.push(playerCard);
        winPlayerDeck.push(computerCard);
    } else if (isRoundWinner(computerCard, playerCard)) {
        text.innerText = "אתה המפסיד";
        winComputerDeck.push(playerCard);
        winComputerDeck.push(computerCard);
    } else {
        text.innerText = "הקלפים זהים";
        count = 1;
        sameArray.push(playerCard);
        sameArray.push(computerCard);
        if (playerDeck.numberOfCards <= 3 || computerDeck.numberOfCards <= 3) {
            if (winPlayerDeck.length != 0) {
                for (let i = 0; i < winPlayerDeck.length; i++) {
                    playerDeck.push(winPlayerDeck[i]);
                }
                winPlayerDeck = cleanWinArray(winPlayerDeck);
            }
            if (winComputerDeck.length != 0) {
                for (let i = 0; i < winComputerDeck.length; i++) {
                    computerDeck.push(winComputerDeck[i]);
                }
                winComputerDeck = cleanWinArray(winComputerDeck);
            }
            setTimeout(sameCards, 2000);
        }
        else {
            setTimeout(sameCards, 2000);
        }
    }

    if (isRoundGameOver(playerDeck)) {
        if (winPlayerDeck.length == 0) {
            alert("אתה המפסיד של המשחק!");
            gameOver();
        }
    } else if (isRoundGameOver(computerDeck)) {
        if (winComputerDeck.length == 0) {
            alert("אתה המנצח של המשחק!");
            gameOver();
        }
    }

    if (isRoundGameOver(playerDeck) || isRoundGameOver(computerDeck)) {
        // לולאה שמכניסה מהמערך ניצחונות למערך הרגיל של הקלפים
        for (let i = 0; i < winPlayerDeck.length; i++) {
            playerDeck.push(winPlayerDeck[i]);
        }
        winPlayerDeck = cleanWinArray(winPlayerDeck);
        for (let i = 0; i < winComputerDeck.length; i++) {
            computerDeck.push(winComputerDeck[i]);
        }
        winComputerDeck = cleanWinArray(winComputerDeck);
        startGame();
    }

}

function isRoundWinner(cardOne, cardTwo) {
    return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value];
}

function isRoundGameOver(deck) {
    return deck.numberOfCards === 0;
}

function cleanWinArray(winArray) {
    while (winArray.length > 0) {
        winArray.pop();
    }
    return winArray;
}

function startGame() {
    playerDeck.shuffle();
    computerDeck.shuffle();
    inRound = false;
    isFirstGame = false;

    cleanBeforeRound();
}

function gameOver() {
    isFirstGame = true;
    location.reload();
}

function sameCards() {
    if (playerDeck.numberOfCards > computerDeck.numberOfCards) {
        numOfCardsLessThan4 = computerDeck.numberOfCards;
    }
    else {
        numOfCardsLessThan4 = playerDeck.numberOfCards;
    }
    if (numOfCardsLessThan4 >= 4) {
        numOfCardsLessThan4 = 4;
    }
    for (let i = 0; i <= numOfCardsLessThan4 - 1; i++) {
        const delay = 2000;
        setTimeout(() => {
            playerCardSlot.innerHTML = '';
            computerCardSlot.innerHTML = '';
            text.innerText = '';
            playerCard = playerDeck.pop();
            computerCard = computerDeck.pop();

            updateDeckCount();
            if (i == (numOfCardsLessThan4 - 1)) {
                playerCardSlot.appendChild(playerCard.getHTML());
                computerCardSlot.appendChild(computerCard.getHTML());
                sameArray.push(playerCard);
                sameArray.push(computerCard);
                if (isRoundWinner(playerCard, computerCard)) {
                    text.innerText = "אתה המנצח";
                    for (let i = 0; i < sameArray.length; i++) {
                        winPlayerDeck.push(sameArray[i]);
                    }
                    sameArray = cleanWinArray(sameArray);
                } else if (isRoundWinner(computerCard, playerCard)) {
                    text.innerText = "אתה המפסיד";
                    for (let i = 0; i < sameArray.length; i++) {
                        winComputerDeck.push(sameArray[i]);
                    }
                    sameArray = cleanWinArray(sameArray);
                }
                else {
                    text.innerText = "הקלפים זהים";
                    sameArray.push(playerCard);
                    sameArray.push(computerCard);
                    count = 1;
                    setTimeout(() => {
                        if (isRoundGameOver(playerDeck)) {
                            if (winPlayerDeck.length == 0) {
                                alert("אתה המפסיד של המשחק!");
                                gameOver();
                            }
                        } else if (isRoundGameOver(computerDeck)) {
                            if (winComputerDeck.length == 0) {
                                alert("אתה המנצח של המשחק!");
                                gameOver();
                            }
                        }
                    }, 3000);
                    if (playerDeck.numberOfCards <= 3 || computerDeck.numberOfCards <= 3) {
                        if (winPlayerDeck.length != 0) {
                            for (let i = 0; i < winPlayerDeck.length; i++) {
                                playerDeck.push(winPlayerDeck[i]);
                            }
                            winPlayerDeck = cleanWinArray(winPlayerDeck);
                        }
                        if (winComputerDeck.length != 0) {
                            for (let i = 0; i < winComputerDeck.length; i++) {
                                computerDeck.push(winComputerDeck[i]);
                            }
                            winComputerDeck = cleanWinArray(winComputerDeck);
                        }
                        setTimeout(sameCards, 2000);
                    }
                    else {
                        setTimeout(sameCards, 2000);
                    }
                }
                setTimeout(() => {
                    if (isRoundGameOver(playerDeck)) {
                        if (winPlayerDeck.length == 0) {
                            alert("אתה המפסיד של המשחק!");
                            gameOver();
                        }
                    } else if (isRoundGameOver(computerDeck)) {
                        if (winComputerDeck.length == 0) {
                            alert("אתה המנצח של המשחק!");
                            gameOver();
                        }
                    }
                }, 3000);

            }
            else {
                count += 1;
                sameArray.push(playerCard);
                sameArray.push(computerCard);
                playerCardSlot.appendChild(playerCard.getHTMLToSame(count));
                computerCardSlot.appendChild(computerCard.getHTMLToSame(count));
            }
        }, i * delay);
    }
}


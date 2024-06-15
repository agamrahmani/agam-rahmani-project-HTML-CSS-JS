const container = document.getElementById("containerExercise");
const answer = document.getElementById("answer");
const textToUser = document.getElementById("text");
const tableResult = document.getElementById("tableResult").getElementsByTagName('tbody')[0];
const textGrade = document.getElementById("grade");
let numbers, type, exerciseToTable;
let num1, num2;
let result;
let grade = 0;
let count = 0;
let first = true;

function numbersSelect(selectElem) {
    numbers = selectElem.value;
    if (type != undefined) {
        if (!first) {
            again()
        }
        else {
            newExercise();
        }
    }
}

function typeSelect(selectElem) {
    type = selectElem.value;
    if (numbers != undefined) {
        if (!first) {
            again()
        }
        else {
            newExercise();
        }
    }
}

function newExercise() {
    first = false;
    if (numbers == '1-10') {
        num1 = getRandomInt(1, 10);
        num2 = getRandomInt(1, 10);
    }
    if (numbers == '1-100') {
        num1 = getRandomInt(1, 100);
        num2 = getRandomInt(1, 100);
    }
    if (numbers == '1-1000') {
        num1 = getRandomInt(1, 1000);
        num2 = getRandomInt(1, 1000);
    }
    if (type == '+ חיבור') {
        result = num1 + num2;
        const exercise = document.createElement('div');
        exercise.textContent = `${num1}+${num2}=`;
        exerciseToTable = `${num1}+${num2}`
        exercise.classList.add('exercise');
        container.insertBefore(exercise, container.firstChild);
    }
    if (type == '- חיסור') {
        const exercise = document.createElement('div');
        if (num1 > num2) {
            result = num1 - num2;
            exercise.textContent = `${num1}-${num2}=`;
            exerciseToTable = `${num1}-${num2}`;
        } else {
            result = num2 - num1;
            exercise.textContent = `${num2}-${num1}=`;
            exerciseToTable = `${num2}-${num1}`;
        }
        exercise.classList.add('exercise');
        container.insertBefore(exercise, container.firstChild);
    }
    if (type == '* כפל') {
        result = num1 * num2;
        const exercise = document.createElement('div');
        exercise.textContent = `${num1}*${num2}=`;
        exerciseToTable = `${num1}*${num2}`;
        exercise.classList.add('exercise');
        container.insertBefore(exercise, container.firstChild);
    }
    if (type == '/ חילוק') {
        const exercise = document.createElement('div');
        if (num1 > num2) {
            result = num1 / num2;
            exercise.textContent = `${num1}/${num2}=`;
            exerciseToTable = `${num1}/${num2}`;
        } else {
            result = num2 / num1;
            exercise.textContent = `${num2}/${num1}=`;
            exerciseToTable = `${num2}/${num1}`;
        }
        exercise.classList.add('exercise');
        container.insertBefore(exercise, container.firstChild);
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function check() {
    let newRow = tableResult.insertRow(0);
    let newCell1 = newRow.insertCell();
    let newCell2 = newRow.insertCell();
    let newCell3 = newRow.insertCell();
    let newCell4 = newRow.insertCell();
    if (+(answer.value) == result) {
        textToUser.innerText = "תשובה נכונה";
        textToUser.style.color = "green";
        grade += 5;
        newCell4.textContent = 5;
        newCell3.textContent = '';
        newCell1.style.color = "green";
    } else {
        textToUser.innerText = "טעות";
        textToUser.style.color = "red";
        newCell3.textContent = answer.value;
        newCell1.style.color = "red";
        newCell4.textContent = 0;
    }
    newCell1.textContent = exerciseToTable;
    newCell2.textContent = result;

    count += 1;
    if (count == 20) {
        textGrade.innerText = `הציון שלך הוא: ${grade}`;
        return;
    }
    setTimeout(again, 1000);
}

function again() {
    const exercise = document.querySelector('.exercise');
    container.removeChild(exercise);
    answer.value = ''
    textToUser.innerText = '';
    newExercise();
}


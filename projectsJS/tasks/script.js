const tasks = document.querySelector(".tasks");

function newTask(value = '') {
    const li = document.createElement('li');
    tasks.appendChild(li);
    const div = document.createElement('div');
    div.contentEditable = true;
    div.innerHTML = value;
    li.appendChild(div);

    const btn = document.createElement('button');
    btn.innerHTML = 'x';
    btn.addEventListener('click', function () {
        const isAllowed = confirm(`האם את/ה בטוח/ה כי ברצונך למחוק את ${div.innerHTML}?`);
        if (isAllowed) {
            li.remove();
        }
        saveTasks();
    });

    li.appendChild(btn);
    div.addEventListener('input', saveTasks);
}

function saveTasks() {
    const list = document.querySelectorAll('.tasks li');
    const arr = [];
    for (const li of list) {
        const name = li.querySelector('div').innerText.trim();
        if (name) {
            arr.push(name);
        }
    }
    localStorage.setItem('tasks', JSON.stringify(arr));
}

function initialData() {
    if (localStorage.tasks) {
        const tasks = JSON.parse(localStorage.tasks);
        for (const task of tasks) {
            newTask(task);
        }
    }
}
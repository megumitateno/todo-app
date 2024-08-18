const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// タスクを取得して表示する関数
function fetchTasks() {
    fetch('http://localhost:3000/tasks')
        .then(response => response.json())
        .then(tasks => {
            taskList.innerHTML = ''; // 既存のタスクをクリア
            tasks.forEach((task, index) => {
                const taskDiv = document.createElement('div');
                taskDiv.className = 'task';
                taskDiv.innerHTML = `
                    <span>${task}</span>
                    <button onclick="deleteTask(${index})">削除</button>
                `;
                taskList.appendChild(taskDiv);
            });
        });
}

// タスクを追加する関数
addTaskButton.addEventListener('click', () => {
    const task = taskInput.value;
    if (task) {
        fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task })
        })
        .then(response => {
            if (response.ok) {
                taskInput.value = ''; // 入力フィールドをクリア
                fetchTasks(); // タスクを再取得
            }
        });
    }
});

// タスクを削除する関数
function deleteTask(index) {
    fetch(`http://localhost:3000/tasks/${index}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            fetchTasks(); // タスクを再取得
        }
    });
}

// 初回タスクを取得
fetchTasks();
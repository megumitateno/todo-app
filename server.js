const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// 静的ファイルを提供
app.use(express.static(path.join(__dirname, 'public')));

// タスクを保存する配列
let tasks = [];

// ミドルウェア
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// タスクを取得するエンドポイント
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// タスクを追加するエンドポイント
app.post('/tasks', (req, res) => {
    const task = req.body.task;
    if (task) {
        tasks.push(task);
        res.status(201).json({ message: 'Task added' });
    } else {
        res.status(400).json({ message: 'Task is required' });
    }
});

// タスクを削除するエンドポイント
app.delete('/tasks/:index', (req, res) => {
    const index = req.params.index;
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
        res.json({ message: 'Task deleted' });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// サーバーを起動
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

app.get('/tasks/add', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = req.query.priority;
  let cloneTask = tasks.slice();
  let newTask = { taskId: taskId, text: text, priority: priority };
  cloneTask.push(newTask);
  res.json(cloneTask);
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

function sortTasksByPriority(task1, task2) {
  return task1.priority - task2.priority;
}

app.get('/tasks/sort-by-priority', (req, res) => {
  let copyTasks = tasks.slice();
  let results = copyTasks.sort(sortTasksByPriority);
  res.json({ tasks: results });
});

function updateTaskWithPriority(tasks, priority, taskId) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].priority = priority;
    }
  }
  return tasks;
}
app.get('/tasks/edit-priority', (req, res) => {
  let copyTasks = tasks.slice();
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);

  let results = updateTaskWithPriority(copyTasks, priority, taskId);
  res.json({ tasks: results });
});

function updateTaskWithText(tasks, text, taskId) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].text = text;
    }
  }
  return tasks;
}
app.get('/tasks/edit-text', (req, res) => {
  let copyTasks = tasks.slice();
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;

  let results = updateTaskWithText(copyTasks, text, taskId);
  res.json({ tasks: results });
});

function deleteTaskfromTasksListByTaskId(task, taskId) {
  return task.taskId !== taskId;
}
app.get('/tasks/delete', (req, res) => {
  let copyTasks = tasks.slice();
  let taskId = parseInt(req.query.taskId);

  let results = copyTasks.filter((task) =>
    deleteTaskfromTasksListByTaskId(task, taskId)
  );
  res.json({ tasks: results });
});

function filterByPriority(task, priority) {
  return task.priority === priority;
}
app.get('/tasks/filter-by-priority', (req, res) => {
  let copyTasks = tasks.slice();
  let priority = parseInt(req.query.priority);

  let results = copyTasks.filter((task) => filterByPriority(task, priority));
  res.json({ tasks: results });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

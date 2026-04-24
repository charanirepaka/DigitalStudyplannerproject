const taskInput = document.getElementById("taskInput");
const todoList = document.getElementById("todoList");

document.addEventListener("DOMContentLoaded", loadTasks);

taskInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  createTaskElement(text, false);
  saveTask(text, false);
  taskInput.value = "";
}

function createTaskElement(text, completed) {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;

  const span = document.createElement("span");
  span.textContent = text;

  if (completed) span.classList.add("completed");

  checkbox.addEventListener("change", function() {
    span.classList.toggle("completed");
    updateStorage();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "✕";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.onclick = function() {
    li.remove();
    updateStorage();
  };

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  todoList.appendChild(li);
}

function saveTask(text, completed) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text, completed });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTaskElement(task.text, task.completed));
}

function updateStorage() {
  let tasks = [];
  document.querySelectorAll("#todoList li").forEach(li => {
    tasks.push({
      text: li.querySelector("span").textContent,
      completed: li.querySelector("input").checked
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

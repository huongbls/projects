"use strict";
const btnAdd = document.getElementById("btn-add");
const taskInput = document.getElementById("input-task");
const toDoList = document.getElementById("todo-list");
let todoArr = [];
let currentUser = [];

//Tạo class Task
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}

//Viết hàm renderTask
const renderTask = function (arr) {
  toDoList.innerHTML = "";
  arr.forEach((x) => {
    const html = `<li class="${
      x.isDone === true ? "checked" : ""
    }" onclick="completeTask(this)">${
      x.task
    }<span class="close" onclick="deleteTask(this)">×</span></li>`;
    toDoList.insertAdjacentHTML("beforeend", html);
  });
};

//Window load thì lưu dữ liệu từ local Storage lưu vào mảng.
window.addEventListener("load", function () {
  if (localStorage.todoArr) {
    getFromStorage("todoArr", todoArr);
  }
  if (localStorage.currentUser) {
    getFromStorage("currentUser", currentUser);
    // Filter todoArr theo currentUser và hiển thị ra màn hình
    const showData = todoArr.filter((x) => x.owner === currentUser[0].userName);
    renderTask(showData);
  }
});

// Viết hàm đánh dấu nhiệm vụ đã hoàn thành
const completeTask = function (x) {
  x.classList.toggle("checked");
  todoArr.forEach((element) => {
    if (element.task === x.innerText.slice(0, x.innerText.length - 2)) {
      element.isDone = x.classList.contains("checked");
    }
  });
  saveToStorage("todoArr", todoArr);
};

// Viết hàm xóa nhiệm vụ
const deleteTask = function (x) {
  todoArr.forEach((element, i) => {
    if (
      element.task ===
      x.parentNode.innerText.slice(0, x.parentNode.innerText.length - 2)
    ) {
      todoArr.splice(i, 1);
    }
  });
  saveToStorage("todoArr", todoArr);
  const showData = todoArr.filter((x) => x.owner === currentUser[0].userName);
  renderTask(showData);
};

// Ấn nút add thì lưu dữ liệu vào Object, lưu Object vào mảng vào lưu trên LocalStorage
// Lộc todoArr theo current User và hiển thị ra màn hình
btnAdd.addEventListener("click", function () {
  if (taskInput.value !== "" && localStorage.currentUser) {
    const data = new Task(taskInput.value, currentUser[0].userName, false);
    todoArr.push(data);
    saveToStorage("todoArr", todoArr);
    taskInput.value = "";
    const showData = todoArr.filter((x) => x.owner === currentUser[0].userName);
    renderTask(showData);
  } else {
    alert("Please login to add task");
    window.open("/pages/login.html", "_seft");
  }
});

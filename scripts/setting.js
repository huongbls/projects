"use strict";

const pageSizeInput = document.getElementById("input-page-size");
const categoryInput = document.getElementById("input-category");
const btnSubmit = document.getElementById("btn-submit");
let settingArr = [];
let correctData = true;

class Setting {
  constructor(pageSize, category) {
    this.pageSize = pageSize;
    this.category = category;
  }
}

// Load window thì hiển thị lại giá trị setting đã chọn gần nhất
window.addEventListener("load", function () {
  if (localStorage.settingArr) {
    getFromStorage("settingArr", settingArr);
    pageSizeInput.value = settingArr[0].pageSize;
    categoryInput.value = settingArr[0].category;
  }
});

// Hàm validate data (pageSizeInput phải >=1 và <=100, nếu sai thì có thông báo)
const validateData = function (inputData) {
  if (inputData.value < 1 || inputData.value > 100) {
    correctData = false;
    alert(
      `${inputData.parentNode.previousElementSibling.innerText} should be between 1 and 100`
    );
  }
};

// Ấn nút Save Setting thì lưu giá trị vào object, lưu Oject vào mảng, lưu mảng vào localStorage
btnSubmit.addEventListener("click", function () {
  settingArr = [];
  correctData = true;
  if (correctData) {
    validateData(pageSizeInput);
  }
  if (!correctData) return;
  const data = new Setting(pageSizeInput.value, categoryInput.value);
  settingArr.push(data);
  saveToStorage("settingArr", settingArr);
});

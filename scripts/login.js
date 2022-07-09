"use strict";

const userNameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const btnSubmit = document.getElementById("btn-submit");
let correctData = true;
let userArr = [];
let currentUser = [];

//Load window thì chuyển dữ liệu userArr từ LocalStorage về mảng
window.addEventListener("load", function () {
  if (localStorage.UserArray) {
    getFromStorage("UserArray", userArr);
  }
});

// Tạo hàm validate dữ liệu
const validateData = function (inputData) {
  if (inputData.value === "") {
    correctData = false;
    alert(
      `Please input for ${inputData.parentNode.previousElementSibling.innerText}`
    );
  }
};

//Tạo hàm kiểm tra username có tồn tại không, password có tương ứng với user đó không
const validateUsernameExist = function (userNameInput, passWordInput, arr) {
  if (
    arr
      .filter((x) => x.userName === userNameInput.value)
      .filter((x) => x.passWord === passWordInput.value).length === 1
  ) {
    correctData = true;
  } else {
    correctData = false;
    alert("Username or Password is not correct!");
  }
};

//Tạo hàm cleardata
const clearData = function () {
  userNameInput.value = "";
  passwordInput.value = "";
};

// Ấn nút submit thì validate dữ liệu nhập. Nếu OK, đưa dữ liệu vào object, đưa object vào mảng, lưu trên localStorage...
btnSubmit.addEventListener("click", function () {
  correctData = true;
  if (correctData) {
    validateData(userNameInput);
    validateData(passwordInput);
    if (!correctData) return;
    validateUsernameExist(userNameInput, passwordInput, userArr);
    if (!correctData) return;
    currentUser = userArr
      .filter((x) => x.userName === userNameInput.value)
      .filter((x) => x.passWord === passwordInput.value);
    saveToStorage("currentUser", currentUser);
    clearData();
    window.open("../index.html", "_self"); //Mở trang index.html trên cửa sổ hiện tại
  }
});

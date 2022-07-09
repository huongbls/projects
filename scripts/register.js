"use strict";

const firstNameInput = document.getElementById("input-firstname");
const lastNameInput = document.getElementById("input-lastname");
const userNameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const confirmPasswordInput = document.getElementById("input-password-confirm");
const btnSubmit = document.getElementById("btn-submit");
let correctData = true;
let userArr = [];

//Load window thì chuyển dữ liệu userArr từ LocalStorage về mảng
window.addEventListener("load", function () {
  if (localStorage.UserArray) {
    getFromStorage("UserArray", userArr);
  }
});

//Khái báo class User
class User {
  constructor(firstName, lastName, userName, passWord) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.passWord = passWord;
  }
}

// Tạo hàm validate dữ liệu
const validateData = function (inputData) {
  if (inputData.value === "") {
    correctData = false;
    alert(
      `Please input for ${inputData.parentNode.previousElementSibling.innerText}`
    );
  }
};

//Tạo hàm kiểm tra username có bị trùng lặp không
const checkUsernameDuplicate = function (userNameInput, arr) {
  arr.forEach((x) => {
    if (x.userName.includes(userNameInput.value)) {
      alert("Username already exists. Please choose a new one");
      correctData = false;
    }
  });
};

// Tạo hàm validate password phải nhiều hơn 8 ký tự, confirms password phải giống với password
const validatePassword = function (password, confirmPassword) {
  if (password.value.length <= 8) {
    correctData = false;
    alert("Passwords must be at least 9 characters");
  } else if (confirmPassword.value !== password.value) {
    correctData = false;
    alert("Confirm Password must be same with Password");
  }
};

//Tạo hàm cleardata
const clearData = function () {
  firstNameInput.value = "";
  lastNameInput.value = "";
  userNameInput.value = "";
  passwordInput.value = "";
  confirmPasswordInput.value = "";
};

// Ấn nút submit thì validate dữ liệu input,
// Nếu dữ liệu nhập đúng thì đưa dữ liệu vào Object, đưa Object vào mảng và lưu lên localStorage
btnSubmit.addEventListener("click", function () {
  correctData = true;
  if (correctData) {
    validateData(firstNameInput);
    validateData(lastNameInput);
    validateData(userNameInput);
    validateData(passwordInput);
    validateData(confirmPasswordInput);
    if (!correctData) return;
    checkUsernameDuplicate(userNameInput, userArr);
    if (!correctData) return;
    validatePassword(passwordInput, confirmPasswordInput);
    if (!correctData) return;
    const data = new User(
      firstNameInput.value,
      lastNameInput.value,
      userNameInput.value,
      passwordInput.value
    );
    userArr.push(data);
    saveToStorage("UserArray", userArr);
    clearData();
    window.open("/pages/login.html", "_self");
  }
});

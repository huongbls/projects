"use strict";

const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const logoutBtn = document.getElementById("btn-logout");
let userArr = [];
let currentUser = [];

// Load window thì tải dữ liệu userArr và currentUser từ localStarage vào mảng
// Thiết lập hiện thị cho loginModal và mainContent
window.addEventListener("load", function () {
  if (localStorage.UserArray) {
    getFromStorage("UserArray", userArr);
  }
  if (localStorage.currentUser) {
    getFromStorage("currentUser", currentUser);
    loginModal.hidden = true;
    mainContent.hidden = false;
    mainContent.children[0].innerText = `Welcome ${currentUser[0].firstName}`;
  } else {
    loginModal.hidden = false;
    mainContent.hidden = true;
  }
});

// Ấn nút logout thì xóa thông tin currentUser trên localStorage.
// Chuyển đến trang Login
logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("currentUser");
  window.open("/pages/login.html", "_seft");
});

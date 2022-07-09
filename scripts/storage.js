"use strict";

// Tạo hàm lưu dữ liệu vào localStorage
const saveToStorage = function (key, value) {
  if (typeof Storage !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    alert("Sorry! No Web Storage support..");
  }
};

// Tạo hàm lấy dữ liệu từ localStorage lưu vào mảng
const getFromStorage = function (key, arr) {
  if (typeof Storage !== "undefined") {
    for (
      let i = 0;
      i < JSON.parse(localStorage.getItem(key)).slice(0).length;
      i++
    ) {
      arr.push(JSON.parse(localStorage.getItem(key)).slice(0)[i]);
    }
  } else {
    alert("Sorry! No Web Storage support..");
  }
};

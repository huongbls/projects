"use strict";

const newsContainer = document.getElementById("news-container");
const queryInput = document.getElementById("input-query");
const btnSubmit = document.getElementById("btn-submit");
const btnPrevious = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageNumber = document.getElementById("page-num");
let correctData = true;
let page = 1;
let pageSize = 1;
let keyword = "";
let settingArr = [];

// Hàm renderNews hiển thị list các bài báo
const renderNews = function (data) {
  newsContainer.innerHTML = "";
  data.forEach((x) => {
    const html = `
      <article>
      <div>
        <img
          class="img-article"
          src=${x.urlToImage}
        />
      </div>
      <div class="title-article">
        <h3>
          ${x.title}
        </h3>
        <p>
          ${x.description}
        </p>
        <button type="button" class="btn btn-primary">View</button>
      </div>
      </article>`;
    newsContainer.insertAdjacentHTML("beforeend", html);
  });
};

//Load Window thì lấy dữ liệu pageSize Setting từ LocalStorage
window.addEventListener("load", function () {
  if (localStorage.settingArr) {
    getFromStorage("settingArr", settingArr);
    pageSize = settingArr[0].pageSize;
  }
});

//Tạo hàm bất đồng bộ lấy dữ liệu từ APINews
const getNews = async function (keyword, pageSize, page) {
  const res = await fetch(
    `https://newsapi.org/v2/everything?q=${keyword}&searchIn=title,description&pageSize=${pageSize}&page=${page}&sortBy=popularity&apiKey=a63b4eb74d844d02be7865195509a5ac`
    // If error due to ratelimited, try other apiKeys below:
    //apiKey=a63b4eb74d844d02be7865195509a5ac (email funix)
    //apiKey=34bf3f66c1fa4346859822e4fbf5093a ̣(email cá nhân 1)
    //apiKey=252b1af33ded44f78ccdd7e44bbfec94 (email cá nhân 2)
  );
  const data = await res.json();
  console.log(data);
  renderNews(data.articles);
  return data.totalResults;
};

// Hàm validate data
const validateData = function (inputData) {
  if (inputData.value === "") {
    correctData = false;
    alert(`Please input keyword for searching`);
  }
};

//Khi ấn nút Search thiết lập giá trị cho nút Next, Previous, số trang, hiển thị kết quả tìm kiếm ra màn hình
btnSubmit.addEventListener("click", function () {
  correctData = true;
  page = 1;
  btnNext.hidden = false;
  btnPrevious.hidden = true;
  pageNumber.innerText = page;
  if (correctData) {
    validateData(queryInput);
    if (!correctData) return;
    keyword = queryInput.value;
    (async () => {
      const pageNum = Math.ceil(
        Math.min(100, await getNews(keyword, pageSize, page)) / pageSize
      );
      if (pageNum === 1) {
        btnNext.hidden = true;
      }
    })();
  }
});

// Khi ấn nút Next, cho hiển thị nút Previous, thiết lặp giá trị cho nút Next, số trang
btnNext.addEventListener("click", function () {
  btnPrevious.hidden = false;
  page++;
  pageNumber.innerText = page;
  (async () => {
    const pageNum = Math.ceil(
      Math.min(100, await getNews(keyword, pageSize, page)) / pageSize
    );
    if (page === pageNum) {
      btnNext.hidden = true;
    }
  })();
});

//Khi ấn nút Previous, cho hiện thị nút Next, thiết lập giá trị cho nút Previous, số trang
btnPrevious.addEventListener("click", function () {
  btnNext.hidden = false;
  if (page === 2) btnPrevious.hidden = true;
  page--;
  pageNumber.innerText = page;
  getNews(keyword, pageSize, page);
});

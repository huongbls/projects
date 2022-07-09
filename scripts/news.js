"use strict";

const newsContainer = document.getElementById("news-container");
const btnPrevious = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageNumber = document.getElementById("page-num");
let page = 1;
let pageSize = 5;
let category = "general";
let country = "us";
let settingArr = [];

// Hàm renderNews đưa list các bài báo hiển thị lên màn hình
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

//Tạo hàm bất đồng bộ lấy dữ liệu từ API News
const getNews = async function (country, category, pageSize, page) {
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=a63b4eb74d844d02be7865195509a5ac`
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

// Load window thì lấy dữ liệu Setting từ localStorage (nếu có), hiện thị list bài báo ra màn hình
// Thiết lập giá trị cho nút previous và nút Next
window.addEventListener("load", function () {
  if (localStorage.settingArr) {
    getFromStorage("settingArr", settingArr);
    pageSize = settingArr[0].pageSize;
    category = settingArr[0].category;
  }
  btnPrevious.hidden = true;
  pageNumber.innerText = page;
  (async () => {
    const pageNum = Math.ceil(
      Math.min(100, await getNews(country, category, pageSize, page)) / pageSize
    );
    if (pageNum === 1) {
      btnNext.hidden = true;
    }
  })();
});

// Khi ấn nút Next, cho hiển thị nút Previous, thiết lặp giá trị cho nút Next, số trang
btnNext.addEventListener("click", function () {
  btnPrevious.hidden = false;
  page++;
  pageNumber.innerText = page;
  (async () => {
    const pageNum = Math.ceil(
      Math.min(100, await getNews(country, category, pageSize, page)) / pageSize
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
  getNews(country, category, pageSize, page);
});

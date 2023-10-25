

// JSON APIのベースURLを指定
const apiUrl = 'https://d1vyjchtv8ee5.cloudfront.net/jsonapi/node/sugi_medical';

// ページング関連の変数
let currentPage = 1;
let totalPages = 1;
const itemsPerPage = 20; // 1ページあたりのアイテム数

// カテゴリーごとに記事を取得して表示
async function updateArticleLists(category, searchKeyword) {
  try {
    //ページ番号を取得    
    // カテゴリーごとのフィルター条件を設定
    const filter = category === 'all' ? '' : category === '#all' ? '' : `&filter[field_medical_list]=${category.replace("#", "")}`;

    // JSON APIからデータを取得
    if (!searchKeyword) {
      searchKeyword = "";
    }

    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    let pageNumber = 0;
    if (parseInt(url.searchParams.get('page'))) {
      pageNumber = parseInt(url.searchParams.get('page'));
    }

    let currentPage = 1;
    let totalPages = 1;
    if (pageNumber == 999) {
      while (currentPage <= totalPages) {
        const response = await (fetch(`${apiUrl}?sort=-field_date${filter}&page[limit]=${itemsPerPage}&page[offset]=${(currentPage - 1) * itemsPerPage}&filter[title][condition][path]=title&filter[title][condition][operator]=CONTAINS&filter[title][condition][value]=${searchKeyword}`));
        const data = await response.json();
        if (data.links.next) {
          totalPages++;
          console.log(totalPages);
        }
        currentPage++;
        console.log(currentPage);
        console.log("test");
      }
      const currentUrl = window.location.href;
      const url = new URL(currentUrl);
      url.searchParams.set('page', (currentPage - 2))
      window.location.href = url.toString();
    }

    const response = await fetch(`${apiUrl}?sort=-field_date${filter}&page[limit]=20&page[offset]=${(pageNumber * 20)}&filter[title][condition][path]=title&filter[title][condition][operator]=CONTAINS&filter[title][condition][value]=${searchKeyword}`);
    const data = await response.json();

    // ページの最初を示すボタンの要素を取得
    const nextPageButton = document.querySelector('.cmn-pager-next');
    const lastPageButton = document.querySelector('.cmn-pager-last');
    // データの値が20未満の場合、ボタンを非表示にする
    if (data.data.length < 20) {
      nextPageButton.style.display = 'none';
      lastPageButton.style.display = 'none';
    } else {
      nextPageButton.style.display = 'block'; // それ以外の場合は表示
      lastPageButton.style.display = 'block';
    }

    // 取得したデータから記事リストを生成
    const ulElement = document.getElementById(category.replace("#", ""));
    console.log(data);
    if (ulElement) {
      ulElement.innerHTML = ''; // リストをクリア

      data.data.forEach((article, index) => {
        const liElement = document.createElement('li');
        liElement.className = 'news-list';
        liElement.innerHTML = `
          <li class="news-list">
            <a href="#" class="article-link" data-article-id="${article.id}">
              <div class="newslist-header">
                <span class="news-date">${article.attributes.field_date}</span>
                <span class="news-info">${article.attributes.field_medical_list}</span>
              </div>
              <p class="newslist-desc text-02" id="article-title${index + 1}">${article.attributes.title}</p>
            </a>
          </li>
        `;
        ulElement.appendChild(liElement);
      });
    }
  } catch (error) {
    console.error('エラーが発生しました:', error);
  }
}

// ページ番号を変更して記事を更新する関数
function changePage(pageNumber) {
  if (pageNumber >= 1 && pageNumber <= totalPages) {
    currentPage = pageNumber;
    // クエリパラメータ search の値を取得
    const urlSearchParams = new URLSearchParams(window.location.search);
    const searchKeyword = urlSearchParams.get('search');
    // カテゴリーは選択されたタブに応じて取得
    const selectedTab = document.querySelector('.tab-btn a.active');
    const category = selectedTab.getAttribute('data-tab-target');
    updateArticleLists(category, searchKeyword);
  }
}
// タブリンクにクリックイベントを追加
const tabLinks = document.querySelectorAll('.tab-btn a');
tabLinks.forEach(link => {
  link.addEventListener('click', event => {
    const category = event.currentTarget.getAttribute('data-tab-target');
    // クエリパラメータ search の値を取得
    const urlSearchParams = new URLSearchParams(window.location.search);
    const searchKeyword = urlSearchParams.get('search');
    updateArticleLists(category, searchKeyword);
  });
});

// ページネーションの最初のリスト要素を取得
const firstPageLink = document.querySelector('.cmn-pager-first a');
firstPageLink.addEventListener('click', (event) => {
  event.preventDefault(); // リンクのデフォルト動作をキャンセル

  // 現在のURLを取得
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const pageNumber = 0;
  url.searchParams.set('page', pageNumber)
  // 新しいURLにリダイレクト
  window.location.href = url.toString();
});

const page_prev = document.querySelector('.cmn-pager-prev a');
page_prev.addEventListener('click', (event) => {
  event.preventDefault(); // リンクのデフォルト動作をキャンセル

  // 現在のURLを取得
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  let pageNumber = 0;
  if (parseInt(url.searchParams.get('page'))) {
    pageNumber = parseInt(url.searchParams.get('page'));
  }
  pageNumber--;
  url.searchParams.set('page', pageNumber)
  // 新しいURLにリダイレクト
  window.location.href = url.toString();
});

const page_next = document.querySelector('.cmn-pager-next a');
page_next.addEventListener('click', (event) => {
  event.preventDefault(); // リンクのデフォルト動作をキャンセル

  // 現在のURLを取得
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  let pageNumber = 0;
  if (parseInt(url.searchParams.get('page'))) {
    pageNumber = parseInt(url.searchParams.get('page'));
  }
  pageNumber++;
  url.searchParams.set('page', pageNumber)
  // 新しいURLにリダイレクト
  window.location.href = url.toString();
});
const page_last = document.querySelector('.cmn-pager-last a');
page_last.addEventListener('click', (event) => {
  event.preventDefault(); // リンクのデフォルト動作をキャンセル

  // 現在のURLを取得
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const pageNumber = 999;
  url.searchParams.set('page', pageNumber)
  // 新しいURLにリダイレクト
  window.location.href = url.toString();
});


// 記事リンクにクリックイベントを追加
document.addEventListener('click', event => {
  const articleLink = event.target.closest('.article-link');
  if (articleLink) {
    event.preventDefault(); // リンクのデフォルト動作をキャンセル

    const articleId = articleLink.getAttribute('data-article-id');

    // ページ遷移の条件に応じてURLを決定
    const apiUrl = `https://d1vyjchtv8ee5.cloudfront.net/jsonapi/node/sugi_medical/${articleId}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const articleAttributes = data.data.attributes;

        if (articleAttributes.body === null) {
          // 条件1: bodyがnullの場合、PDFへ遷移
          const pdfFileName = articleAttributes.field_pdf.value;
          if (pdfFileName) {
            window.open(`/pdf/${pdfFileName}`, '_blank')
          }
        } else {
          // 条件2: bodyがnullでない場合、記事へ遷移
          window.location.href = `/sugi-medical/news/article.html?id=${articleId}`;
        }
      })
      .catch(error => {
        console.error('エラーが発生しました:', error);
      });
  }
});


// // 年と月の選択肢を生成する関数
// function populateYearMonthOptions() {
//   const yearSelect = document.querySelector('.select-box.year');
//   const monthSelect = document.querySelector('.select-box.month');

//   const currentDate = new Date();
//   const currentYear = currentDate.getFullYear();
//   const currentMonth = currentDate.getMonth() + 1;

//   // 年の選択肢を生成（現在から3年前まで）
//   for (let year = currentYear; year >= currentYear - 3; year--) {
//     const option = document.createElement('option');
//     option.value = year;
//     option.textContent = year + '年';
//     yearSelect.appendChild(option);
//   }

//   // 月の選択肢を生成（1から12まで）
//   for (let month = 1; month <= 12; month++) {
//     const option = document.createElement('option');
//     option.value = month;
//     option.textContent = month + '月';
//     monthSelect.appendChild(option);
//   }

//   // 現在の年月を選択状態にする
//   yearSelect.value = currentYear;
//   monthSelect.value = currentMonth;
// }

// // ページが読み込まれた際に選択肢を生成
// window.addEventListener('load', () => {
//   populateYearMonthOptions();
// });

// URLのクエリパラメータが変更された場合に更新
window.addEventListener('popstate', () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const searchKeyword = urlSearchParams.get('search');
  // カテゴリーは選択されたタブに応じて取得
  const selectedTab = document.querySelector('.tab-btn a.active');
  const category = selectedTab.getAttribute('data-tab-target');
  updateArticleLists(category, searchKeyword);
});

// ページ読み込み時にデフォルトのカテゴリーで記事を表示
window.addEventListener('load', () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const searchKeyword = urlSearchParams.get('search');
  // カテゴリーは選択されたタブに応じて取得
  const selectedTab = document.querySelector('.tab-btn a.active');
  const category = selectedTab.getAttribute('data-tab-target');
  updateArticleLists(category, searchKeyword);

  // ページの最初を示すボタンの要素を取得
  const firstPageButton = document.querySelector('.cmn-pager-first');
  const prevPageButton = document.querySelector('.cmn-pager-prev');
  // URLのクエリパラメータからpageの値を取得
  const urlSearchpages = new URLSearchParams(window.location.search);
  const pageValue = urlSearchpages.get('page');
  // pageの値が0の場合、ボタンを非表示にする
  if (pageValue === '0' | !pageValue) {
    firstPageButton.style.display = 'none';
    prevPageButton.style.display = 'none';
  } else {
    firstPageButton.style.display = 'block'; // それ以外の場合は表示
    prevPageButton.style.display = 'block';
  }
});


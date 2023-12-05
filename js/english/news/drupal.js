

const apiUrl = 'https://d1vyjchtv8ee5.cloudfront.net/jsonapi/node/sugi_hd_en';

// ページング関連の変数
let currentPage = 1;
let totalPages = 1;
const itemsPerPage = 20; // 1ページあたりのアイテム数

// カテゴリーごとに記事を取得して表示
async function updateArticleLists(category, searchKeyword) {
  try {
    // JSON APIからデータを取得
    if (!searchKeyword) {
      searchKeyword = "";
    }
    if (!category) {
      category = "All";
    }

    //ページ番号を取得    
    // カテゴリーごとのフィルター条件を設定
    const filter = category === 'All' ? '' : category === '#all' ? '' : `&filter[field_en_list]=${category.replace("#", "")}`;

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
        }
        currentPage++;
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
    const ulElement = document.getElementById("all");
    if (ulElement) {
      ulElement.innerHTML = ''; // リストをクリア
      data.data.forEach((article, index) => {
        const liElement = document.createElement('li');
        let pdflink = "";
        if (article.attributes.body === null) {
          // 条件1: bodyがnullの場合、PDFへ遷移
          if (article.attributes.field_pdf.value) {
            pdflink = `/pdf/${article.attributes.field_pdf.value}" target="_blank`;
          }
        } else {
          // 条件2: bodyがnullでない場合、記事へ遷移
          pdflink = `/news/article.html?id=${article.id}`;
        }
        liElement.className = 'news-list';
        if (article.attributes.body === null) {
          liElement.innerHTML = `
          <li class="news-list">
            <a href="${pdflink}" class="article-link" data-article-id="${article.id}">
              <div class="newslist-header">
                <span class="news-date">${article.attributes.field_date}</span>
                <span class="news-info">${article.attributes.field_en_list}</span>
              </div>
              <p class="newslist-desc pdf" id="article-title${index + 1}">${article.attributes.title}</p>
            </a>
          </li>
          `;
        } else {
          liElement.innerHTML = `
          <li class="news-list">
            <a href="${pdflink}" class="article-link" data-article-id="${article.id}">
              <div class="newslist-header">
                <span class="news-date">${article.attributes.field_date}</span>
                <span class="news-info">${article.attributes.field_en_list}</span>
              </div>
              <p class="newslist-desc text-02" id="article-title${index + 1}">${article.attributes.title}</p>
            </a>
          </li>
          `;
        }
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
  var buttons = document.getElementsByClassName("categoryButton");
  var searchInput = document.querySelector('.search-input input');
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      var category = this.innerText;
      selectCategory(category);
    });
  }

  function selectCategory(category) {
    url.searchParams.set('category', category)
    window.location.href = url.toString();
  }

  const urlSearchParams = new URLSearchParams(window.location.search);
  const searchKeyword = urlSearchParams.get('search');
  const category = urlSearchParams.get('category');

  // searchパラメータが存在する場合、検索ボックスに表示
  if (searchKeyword) {
    searchInput.value = searchKeyword;
  }

  updateArticleLists(category, searchKeyword);

  // すべてのタブを取得
  var tabs = document.querySelectorAll('.categoryButton');

  // カテゴリに一致するタブを取得
  var tab = document.querySelector('[data-tab-target="#' + category + '"]');

  // カテゴリに一致するタブが存在する場合、activeクラスを追加
  if (tab) {
    // すべてのタブからactiveクラスを削除
    tabs.forEach(function (t) {
      t.classList.remove('active');
    });
    tab.classList.add('active');
  }

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


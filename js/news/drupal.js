

// JSON APIのベースURLを指定
const apiUrl = 'https://d37m9cibsc5611.cloudfront.net/jsonapi/node/sugi_hd';

// ページング関連の変数
let currentPage = 1;
let totalPages = 1;
const itemsPerPage = 50; // 1ページあたりのアイテム数

// カテゴリーごとに記事を取得して表示
async function updateArticleLists(category, searchKeyword) {
  try {
    // カテゴリーごとのフィルター条件を設定
    const filter = category === 'all' ? '' : category === '#all' ? '' : `&filter[field_list]=${category.replace("#", "")}`;

    let currentPage = 1;
    let totalPages = 1;

    // JSON APIからデータを取得
    if (!searchKeyword) {
      searchKeyword = "";
    }

    while (currentPage <= totalPages) {
      const response = await (fetch(`${apiUrl}?sort=-field_date${filter}&page[limit]=${itemsPerPage}&page[offset]=${(currentPage - 1) * itemsPerPage}&filter[title][condition][path]=title&filter[title][condition][operator]=CONTAINS&filter[title][condition][value]=${searchKeyword}`));
      const data = await response.json();
      console.log(response);
      console.log(data);
      console.log(data.links.next);
      if (data.links.next) {
        totalPages++;
        console.log(totalPages);
      }
      currentPage++;
      console.log(currentPage);
    }

    // const offset = (currentPage - 1) * itemsPerPage;
    // const response = await fetch(`${apiUrl}?sort=-field_date${filter}&page[limit]=${itemsPerPage}&page[offset]=${offset}&filter[title][condition][path]=title&filter[title][condition][operator]=CONTAINS&filter[title][condition][value]=${searchKeyword}`);
    const response = await fetch(`${apiUrl}?sort=-field_date${filter}&page[limit]=20&filter[title][condition][path]=title&filter[title][condition][operator]=CONTAINS&filter[title][condition][value]=${searchKeyword}`);
    const data = await response.json();
    console.log(data);
    console.log(data.links.next);

    // article-title要素に本文を挿入
    const pages = document.getElementById('page_start');
    pages.innerHTML = totalPages;

    // 取得したデータから記事リストを生成
    const ulElement = document.getElementById(category.replace("#", ""));
    console.log("チェック");
    console.log(ulElement);
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
                <span class="news-info">${article.attributes.field_list}</span>
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

// ページネーションの各リスト要素を取得
// const page_first = document.querySelector('.cmn-pager-first a');
// const page_prev = document.querySelector('.cmn-pager-prev a');
// const page_next = document.querySelector('.cmn-pager-next a');
// const page_last = document.querySelector('.cmn-pager-last a');
// const paginationItems = document.querySelectorAll('.cmn-pager-num a');

// page_first.addEventListener('click', () => {
//   console.log(0);
// });
// page_prev.addEventListener('click', () => {
//   console.log(-1);
// });
// page_next.addEventListener('click', () => {
//   console.log(+1);
// });
// page_last.addEventListener('click', () => {
//   console.log(999);
// });

// ページネーションの最初のリスト要素を取得
const firstPageLink = document.querySelector('.cmn-pager-first a');

// 最初のリスト要素にクリックイベントを追加
firstPageLink.addEventListener('click', (event) => {
  event.preventDefault(); // リンクのデフォルト動作をキャンセル

  // 現在のURLを取得
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const pageNumber = 1;
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
  let pageNumber = parseInt(url.searchParams.get('page'));
  pageNumber--;
  url.searchParams.set('page', pageNumber)
  // 新しいURLにリダイレクト
  window.location.href = url.toString();
});


// 各リスト要素にクリックイベントを追加
// paginationItems.forEach((item, index) => {
//   item.addEventListener('click', () => {
//     // クリックされた順番に対応した数値を返す
//     console.log(index + 1); // 1から始まるページ番号を表示（必要に応じて他の処理を追加）
//   });
// });

// 記事リンクにクリックイベントを追加
document.addEventListener('click', event => {
  const articleLink = event.target.closest('.article-link');
  if (articleLink) {
    event.preventDefault(); // リンクのデフォルト動作をキャンセル

    const articleId = articleLink.getAttribute('data-article-id');

    // ページ遷移の条件に応じてURLを決定
    const apiUrl = `https://d37m9cibsc5611.cloudfront.net/jsonapi/node/sugi_hd/${articleId}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const articleAttributes = data.data.attributes;

        if (articleAttributes.body === null) {
          // 条件1: bodyがnullの場合、PDFへ遷移
          const pdfFileName = articleAttributes.field_pdf.value;
          if (pdfFileName) {
            window.location.href = `/pdf/${pdfFileName}`;
          }
        } else {
          // 条件2: bodyがnullでない場合、記事へ遷移
          window.location.href = `/news/article?id=${articleId}`;
        }
      })
      .catch(error => {
        console.error('エラーが発生しました:', error);
      });
  }
});

// // クリックされたときの処理を追加
// const pagerFirst = document.getElementById('pager-first');
// pagerFirst.addEventListener('click', function() {
//     // 1を返す
//     return 1;
// });

// // クリックされたときの処理を定義
// pagerFirst.addEventListener('click', function() {
//     // ここにクリックされたときの具体的な処理を追加
//     // 例: 1を返す代わりに、ページの遷移などの処理を行う
//     console.log('クリックされました');
//     // ここで必要な処理を追加
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
});
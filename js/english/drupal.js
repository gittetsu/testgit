// JSON APIのベースURLを指定
const apiUrl = 'https://d1vyjchtv8ee5.cloudfront.net/jsonapi/node/sugi_hd_en';

// カテゴリーごとに記事を取得して表示
async function updateArticleLists(category) {
  try {
    // カテゴリーごとのフィルター条件を設定
    const filter = category === 'all' ? '' : `&filter[field_en_list]=${category.replace("#", "")}`;
    const noticefilter = 'filter[ex1][condition][path]=field_notice&filter[ex1][condition][operator]=IN&filter[ex1][condition][value][1]=1&filter[ex1][condition][value][2]=3'

    // JSON APIからデータを取得
    const response = await fetch(`${apiUrl}?sort=-field_date${filter}&page[limit]=5&${noticefilter}`);
    const data = await response.json();

    // 取得したデータから記事リストを生成
    const ulElement = document.getElementById(category);
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
          pdflink = `/news/article?id=${article.id}`;
        }
        liElement.className = 'news-list';
        if (article.attributes.body === null) {
          liElement.innerHTML = `
          <div class="new-common-list">
            <a href="${pdflink}" class="article-link" data-article-id="${article.id}">
              <div class="cat-blk">
                <p class="date small-text">${article.attributes.field_date}</p>
                <ul>
                  <li class="small-text">Sugi Holdings</li> 
                  <li class="small-text">${article.attributes.field_en_list}</li>
                </ul>
              </div>
              <p class="newslist-desc pdf" id="article-title${index + 1}">${article.attributes.title}</p>
            </a>
          </li>
        `;
        } else {
          liElement.innerHTML = `
          <div class="new-common-list">
            <a href="${pdflink}" class="article-link" data-article-id="${article.id}">
              <div class="cat-blk">
                <p class="date small-text">${article.attributes.field_date}</p>
                <ul>
                  <li class="small-text">Sugi Holdings</li> 
                  <li class="small-text">${article.attributes.field_en_list}</li>
                </ul>
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

// NOTICELIST用の関数
async function updateNoticeList() {
  try {
    // JSON APIからNOTICELISTのデータを取得
    const noticefilter2 = 'filter[ex1][condition][path]=field_notice&filter[ex1][condition][operator]=IN&filter[ex1][condition][value][1]=2&filter[ex1][condition][value][2]=3'
    const response2 = await fetch(`${apiUrl}?sort=-field_date,-changed&${noticefilter2}`);
    const data2 = await response2.json();
    // 条件に応じて要素を取得
    const noticeSection = document.querySelector('.sec-notice');

    // 条件が true の場合、要素を非表示にする
    if (data2.data.length === 0) {
      noticeSection.style.display = 'none';
    } else {
      // NOTICELIST用のリスト要素を取得
      const noticeListElement = document.getElementById('noticelist');
      // const noticeListElement = document.getElementById('li');
      if (noticeListElement) {
        noticeListElement.innerHTML = ''; // リストをクリア
        data2.data.forEach((article, index) => {
          // const liElement2 = document.createElement('li');
          const liElement2 = document.createElement('noticelist');
          let pdflink = "";
          if (article.attributes.body === null) {
            // 条件1: bodyがnullの場合、PDFへ遷移
            if (article.attributes.field_pdf.value) {
              pdflink = `/pdf/${article.attributes.field_pdf.value}" target="_blank`;
            }
          } else {
            // 条件2: bodyがnullでない場合、記事へ遷移
            pdflink = `/news/article?id=${article.id}`;
          }
          // liElement2.className = 'notice-list';
          liElement2.className = 'notice-list-item';
          liElement2.innerHTML = `
                <li class="notice-item">
                <a href="${pdflink}">
                <span class="notice-date">${article.attributes.field_date}</span>
                <p class="notice-desc id="article-title${index + 1}">${article.attributes.title}</p>
                </a>
                </li>
        `;
          noticeListElement.appendChild(liElement2);
        });
      }
    }
  } catch (error) {
    console.error('エラーが発生しました:', error);
  }
}

// タブリンクにクリックイベントを追加
const tabLinks = document.querySelectorAll('.tablinks');
tabLinks.forEach(link => {
  link.addEventListener('click', event => {
    const category = event.currentTarget.getAttribute('data-tab-target');
    updateArticleLists(category);
  });
});

// ページ読み込み時にデフォルトのカテゴリーで記事を表示
window.addEventListener('load', () => {
  updateArticleLists('all'); // デフォルトは 'all' カテゴリー
  updateNoticeList(); // NOTICELISTの記事を表示
});
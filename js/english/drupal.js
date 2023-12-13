// JSON APIのベースURLを指定
const apiUrl = 'https://d1vyjchtv8ee5.cloudfront.net/jsonapi/node/sugi_hd_en';

// カテゴリーごとに記事を取得して表示
async function updateArticleLists(category) {
  try {
    // カテゴリーごとのフィルター条件を設定
    const filter = category === 'all' ? '' : `&filter[field_en_list]=${category.replace("#", "")}`;

    // JSON APIからデータを取得
    const response = await fetch(`${apiUrl}?sort=-field_date${filter}&page[limit]=5`);
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
          <li class="new-common-list">
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
          <li class="new-common-list">
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
});
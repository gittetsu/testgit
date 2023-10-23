// JSON APIのベースURLを指定
const apiUrl = 'https://d1vyjchtv8ee5.cloudfront.net/jsonapi/node/sugi_hd';

// カテゴリーごとに記事を取得して表示
async function updateArticleLists(category) {
  try {
    // カテゴリーごとのフィルター条件を設定
    const filter = category === 'all' ? '' : `&filter[field_list]=${category}`;

    // JSON APIからデータを取得
    const response = await fetch(`${apiUrl}?sort=-field_date${filter}&page[limit]=5`);
    const data = await response.json();

    // 取得したデータから記事リストを生成
    const ulElement = document.getElementById(category);
    if (ulElement) {
      ulElement.innerHTML = ''; // リストをクリア

      data.data.forEach((article, index) => {
        const liElement = document.createElement('li');
        liElement.className = 'news-list';
        liElement.innerHTML = `
          <li class="new-common-list">
            <a href="#" class="article-link" data-article-id="${article.id}">
              <div class="cat-blk">
                <p class="date small-text">${article.attributes.field_date}</p>
                <ul>
                  <li class="small-text">スギホールディングス</li> 
                  <li class="small-text">${article.attributes.field_list}</li>
                </ul>
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

// タブリンクにクリックイベントを追加
const tabLinks = document.querySelectorAll('.tablinks');
tabLinks.forEach(link => {
  link.addEventListener('click', event => {
    const category = event.currentTarget.getAttribute('data-tab-target');
    updateArticleLists(category);
  });
});

// 記事リンクにクリックイベントを追加
document.addEventListener('click', event => {
  const articleLink = event.target.closest('.article-link');
  if (articleLink) {
    event.preventDefault(); // リンクのデフォルト動作をキャンセル

    const articleId = articleLink.getAttribute('data-article-id');

    // ページ遷移の条件に応じてURLを決定
    const apiUrl = `https://d1vyjchtv8ee5.cloudfront.net/jsonapi/node/sugi_hd/${articleId}`;
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
          window.location.href = `/news/article?id=${articleId}`;
        }
      })
      .catch(error => {
        console.error('エラーが発生しました:', error);
      });
  }
});

// ページ読み込み時にデフォルトのカテゴリーで記事を表示
window.addEventListener('load', () => {
  updateArticleLists('all'); // デフォルトは 'all' カテゴリー
});
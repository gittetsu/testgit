// JSON APIのベースURLを指定
const apiUrl = 'https://d1vyjchtv8ee5.cloudfront.net/jsonapi/node/sugi_nurse';

// 日付フォーマット変更
function formatDate(dateString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', options).replace(/\//g, '.');
}

// 日付解析関数
function parseDate(dateString) {
  const [datePart] = dateString.split(' '); // 日付部分のみを取得
  const [year, month, day] = datePart.split('-').map(Number); // 日付部分をハイフンで分割して数値に変換
  return new Date(year, month - 1, day); // 月は0から始まるため、1を引いて設定
}

// ページ読み込み時に記事タイトルを更新
async function updateArticleTitles() {
  try {
    // JSON APIからデータを取得
    const response = await fetch(apiUrl);
    const data = await response.json();

    // ul要素を取得
    const ulElement = document.getElementById('all');
    const noDataElement = document.querySelector('.no-data');
    if (data.data.length === 0) {
      noDataElement.style.display = 'block';
    } else {
      noDataElement.style.display = 'none';
      // 記事リストを生成
      data.data.forEach((article, index) => {
        // sortedData.forEach((article, index) => {
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
        liElement.className = 'nursing-newslist';
        liElement.innerHTML = `
              <li>
                <a href="${pdflink}" class="nursing-news-list" data-article-id="${article.id}">
                  <div class="nursing-news-topcnt d-flex">
                    <span class="nursing-news-date">${formatDate(article.attributes.field_date)}<</span>
                    <span class="nursing-taxo-link">${article.attributes.field_nurse_list}</span>
                  </div>
                  <p class="nursing-news-cnt" id="article-title${index + 1}">${article.attributes.title}</p>
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

// ページ読み込み時に記事タイトルを更新
window.addEventListener('load', updateArticleTitles);
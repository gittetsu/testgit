// JSON APIのエンドポイントURLを指定
const apiUrl = 'https://d37m9cibsc5611.cloudfront.net/jsonapi/node/sugi_hd_en?sort=-field_date&filter[field_en_list]=Sustainability&page[limit]=5';

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
        console.log(data);

        // ul要素を取得
        const ulElement = document.getElementById('all');

        // 記事リストを生成
        data.data.forEach((article, index) => {
            // sortedData.forEach((article, index) => {
            const liElement = document.createElement('li');
            liElement.className = 'news-list';
            liElement.innerHTML = `
                	    <a href="#" class="article-link" data-article-id="${article.id}">
                        	<div class="newslist-header">
                            		<span class="news-date">${formatDate(article.attributes.field_date)}</span>
                            		<div>
		                                <span class="news-info">${article.attributes.field_en_list}</span>
                		        </div>
                        	</div>
                        	<p class="newslist-desc pdf" id="article-title${index + 1}">${article.attributes.title}</p>
                    	    </a>
                    	    `;
            ulElement.appendChild(liElement);
        });
    } catch (error) {
        console.error('エラーが発生しました:', error);
    }
}

// 記事リンクにクリックイベントを追加
document.addEventListener('click', event => {
    const articleLink = event.target.closest('.article-link');
    if (articleLink) {
        event.preventDefault(); // リンクのデフォルト動作をキャンセル

        const articleId = articleLink.getAttribute('data-article-id');

        // ページ遷移の条件に応じてURLを決定
        const apiUrl = `https://d37m9cibsc5611.cloudfront.net/jsonapi/node/sugi_hd_en/${articleId}`;
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

// ページ読み込み時に記事タイトルを更新
window.addEventListener('load', updateArticleTitles);
// JSON APIのエンドポイントURLを指定
const apiUrl = 'https://d1vyjchtv8ee5.cloudfront.net/jsonapi/node/sugi_hd?sort=-field_date&filter[field_list]=IR情報&page[limit]=5';
const fileApiUrl = 'https://d1vyjchtv8ee5.cloudfront.net/jsonapi/file/file';
const announcementUrl = 'https://d37m9cibsc5611.cloudfront.net/jsonapi/node/ir_announcement/837780a3-a0a0-42cd-9b9c-479493e51d2b';

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

        // 記事リストを生成
        for (const article of data.data) {
            let pdflink = "";
            let pdfName = ""; // PDFファイル名を初期化
            // bodyがnullでない場合、またはPDF関連データが存在しない場合、通常の記事リンクを使用
            if (article.attributes.body !== null) {
                pdflink = `/news/article?id=${article.id}`;
            } else {
                // bodyがnullで、かつPDF関連データが存在する場合、PDFのリンクと名前を取得
                if (article.relationships.field_upload.data && article.relationships.field_upload.data.id) {
                    const fileId = article.relationships.field_upload.data.id; // PDFのIDを取得
                    const fileResponse = await fetch(`${fileApiUrl}/${fileId}`);
                    const fileData = await fileResponse.json();
                    pdfName = fileData.data.attributes.filename; // PDFのファイル名を取得
                    pdflink = `/pdf/${pdfName}" target="_blank`;
                }
                if (article.attributes.field_pdf && article.attributes.field_pdf.value) {
                    pdflink = `/pdf/${article.attributes.field_pdf.value}" target="_blank`;
                }
            }
            const liElement = document.createElement('li');
            liElement.className = 'news-list';
            if (article.attributes.body === null) {
                liElement.innerHTML = `
                        <a href="${pdflink}" class="article-link" data-article-id="${article.id}">
                            <div class="newslist-header">
                                <span class="news-date">${formatDate(article.attributes.field_date)}</span>
                                <div>
                                    <span class="news-sugi">${article.attributes.field_company}</span> 
                                    <span class="news-info">${article.attributes.field_list}</span>
                                </div>
                            </div>
                        <p class="newslist-desc pdf" id="article-title">${article.attributes.title}</p>
                        </a>
                        `;
            } else {
                liElement.innerHTML = `
                	    <a href="${pdflink}" class="article-link" data-article-id="${article.id}">
                        	<div class="newslist-header">
                            	<span class="news-date">${formatDate(article.attributes.field_date)}</span>
                            	<div>
                                	<span class="news-sugi">${article.attributes.field_company}</span> 
		                            <span class="news-info">${article.attributes.field_list}</span>
                		        </div>
                        	</div>
                        <p class="newslist-desc text-02" id="article-title">${article.attributes.title}</p>
                    	</a>
                    	`;
            }
            ulElement.appendChild(liElement);
        };
    } catch (error) {
        console.error('エラーが発生しました:', error);
    }
}

async function updateAnnouncement() {
    try {
        // JSON APIからデータを取得
        const announcementresponse = await fetch(announcementUrl);
        const announcementdata = await announcementresponse.json();
        const announcementdate = announcementdata.data.attributes.field_ir_announcement_date;
        const announcementbody = announcementdata.data.attributes.field_ir_announcement_body;

        document.getElementById('announcement_date').innerHTML = announcementdate;
        document.getElementById('announcement_body').innerHTML = announcementbody;
    } catch (error) {
        console.error('エラーが発生しました:', error);
    }
}

// ページ読み込み時に記事タイトルを更新
window.addEventListener('load', updateArticleTitles);
window.addEventListener('load', updateAnnouncement);
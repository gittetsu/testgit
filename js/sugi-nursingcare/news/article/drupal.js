document.addEventListener('DOMContentLoaded', function () {
    // URLからIDを取得
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    const apiUrl = `https://d1vyjchtv8ee5.cloudfront.net/jsonapi/node/sugi_nurse/${articleId}`;

    // 日付フォーマット変更
    function formatDate(dateString) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('ja-JP', options).replace(/\//g, '.');
    }

    // APIから本文データを取得する関数
    async function fetchArticleBody() {
        try {
            // JSON APIからデータを取得します
            const response = await fetch(apiUrl);
            const data = await response.json();
            console.log(data);

            // article-body要素に本文を挿入
            const articleBody = data.data.attributes.body.value;
            const articleBodyElement = document.getElementById('article-body');
            articleBodyElement.innerHTML = articleBody;

            // article-date要素に本文を挿入
            const articleDate = formatDate(data.data.attributes.field_date);
            const articleDateElement = document.getElementById('article-date');
            articleDateElement.innerHTML = articleDate;

            // article-title要素に本文を挿入
            const articleTitle = data.data.attributes.title;
            const articleTitleElement = document.getElementById('article-title');
            articleTitleElement.innerHTML = articleTitle;

            const articleTitle2 = data.data.attributes.title;
            const articleTitleElement2 = document.getElementById('article-title2');
            if(articleTitleElement2){
                articleTitleElement2.innerHTML = articleTitle2;
            }

            // PDFリンクを設定
            const pdfLink = document.getElementById('pdf-link');
            // pdfLink.href = `/pdf/${data.data.attributes.field_pdf.value}`;

            if (data.data.attributes.field_pdf) {
                pdfLink.style.display = 'inline'; // PDFリンクを表示
                pdfLink.href = `/pdf/${data.data.attributes.field_pdf.value}`;
                // article-pdf要素に本文を挿入
                const articlePdfElement = document.getElementById('article-pdf');
                articlePdfElement.innerHTML = `https://www.sugi-hd.co.jp/pdf/${data.data.attributes.field_pdf.value}`;
            } else {
                pdfLink.style.display = 'none'; // PDFリンクを非表示
            }
        } catch (error) {
            console.error('エラーが発生しました:', error);
        }
    }

    // ページ読み込み時に記事本文を更新
    fetchArticleBody();
});
document.addEventListener('DOMContentLoaded', function () {
    // URLからIDを取得
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    // const apiUrl = `https://d2ehwfutnqpgdf.cloudfront.net/jsonapi/node/sugi_hd/${articleId}`;
    const apiUrl = `https://d37m9cibsc5611.cloudfront.net/jsonapi/node/sugi_group/${articleId}`;

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
            const inputtext = data.data.attributes.body.value;
            let replacementMap = {
                '/sites/default/files/inline-images/': '../../topic/img/',
                'width="': 'style="margin-bottom:40px; width: ',
                'data-align="right"': 'class="align-right"',
                'data-align="left"': 'class="align-left"',
                'data-align="center"': 'class="align-center"',
            };
            let resulttext = inputtext.replace(
                new RegExp(Object.keys(replacementMap).join("|"), "g"),
                match => replacementMap[match]
            );
            console.log(resulttext);

            // const articleBody = data.data.attributes.body.value;
            const articleBodyElement = document.getElementById('article-body');
            // articleBodyElement.innerHTML = articleBody;
            articleBodyElement.innerHTML = resulttext;

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
            articleTitleElement2.innerHTML = articleTitle2;

            // // article-company要素に本文を挿入
            // const articleCompany = data.data.attributes.field_company;
            // const articleCompanyElement = document.getElementById('article-company');
            // articleCompanyElement.innerHTML = articleCompany;

            // article-category要素に本文を挿入
            const articleList = data.data.attributes.field_group_list;
            const articleListElement = document.getElementById('article-list');
            articleListElement.innerHTML = articleList;

            // PDFリンクを設定
            const pdfLink = document.getElementById('pdf-link');

            if (data.data.attributes.field_pdf.value) {
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
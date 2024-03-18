document.addEventListener('DOMContentLoaded', function () {
    // URLからIDを取得
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    const apiUrl = `https://d37m9cibsc5611.cloudfront.net/jsonapi/node/sugi_hd/${articleId}`;
    const fileApiUrl = 'https://d37m9cibsc5611.cloudfront.net/jsonapi/file/file';

    // 日付フォーマット変更
    function formatDate(dateString) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('ja-JP', options).replace(/\//g, '.');
    }

    // APIから本文データを取得する関数
    async function fetchArticleBody() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            console.log(data);

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

            document.getElementById('article-body').innerHTML = resulttext;

            const articleDate = formatDate(data.data.attributes.field_date);
            document.getElementById('article-date').innerHTML = articleDate;

            const articleTitle = data.data.attributes.title;
            document.getElementById('article-title').innerHTML = articleTitle;
            document.getElementById('article-title2').innerHTML = articleTitle;

            const articleCompany = data.data.attributes.field_company;
            document.getElementById('article-company').innerHTML = articleCompany;

            const articleList = data.data.attributes.field_list;
            document.getElementById('article-list').innerHTML = articleList;

            // PDFの処理
            const pdfField = data.data.relationships.field_upload.data;
            const pdfLink = document.getElementById('pdf-link');
            if (pdfField) {
                const pdfResponse = await fetch(`${fileApiUrl}/${pdfField.id}`);
                const pdfData = await pdfResponse.json();
                console.log(pdfData);
                const pdfFilename = pdfData.data.attributes.field_upload;
                const pdfFileUrl = pdfData.data.attributes.uri.url;
                pdfLink.style.display = 'inline'; // PDFリンクを表示
                pdfLink.href = pdfFileUrl;
                document.getElementById('article-pdf').innerHTML = pdfFilename; // PDFファイル名を表示
            } else {
                pdfLink.style.display = 'none'; // PDFリンクを非表示
            }
        } catch (error) {
            console.error('エラーが発生しました:', error);
        }
    }

    fetchArticleBody();
});

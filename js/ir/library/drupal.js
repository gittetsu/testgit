// const monthlyUrl = 'https://d1vyjchtv8ee5.cloudfront.net/jsonapi/node/ir_monthly_report/22f21b98-bb0d-4005-8fcd-332e52568926';
const monthlyUrl = 'https://d37m9cibsc5611.cloudfront.net/jsonapi/node/ir_monthly_report/cbe01e98-891f-45c0-9188-2656317749a1';

async function updateMonthly() {
    try {
        // JSON APIからデータを取得
        const monthlyresponse = await fetch(monthlyUrl);
        const monthlydata = await monthlyresponse.json();

        const inputtext = monthlydata.data.attributes.body.value;
        let replacementMap = {
            '<a class="drupal_pdf">': '<a href="/pdf/ir/monthly-report/',
            '.pdf</a>': '.pdf" target="_blank" class="pdf-img"><img src="/img/ir/ico_pdf.png" alt="PDFファイル"></a>'
        };

        let resulttext = inputtext.replace(
            new RegExp(Object.keys(replacementMap).join("|"), "g"),
            match => replacementMap[match]
        );

        console.log(resulttext);

        document.getElementById('monthly_body').innerHTML = resulttext;
    } catch (error) {
        console.error('エラーが発生しました:', error);
    }
}

window.addEventListener('load', updateMonthly);
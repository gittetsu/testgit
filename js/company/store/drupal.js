const monthlyUrl = 'https://d1vyjchtv8ee5.cloudfront.net/jsonapi/node/store/9b0f8918-aaac-4142-a507-09a348fb7c88';

async function updateMonthly() {
    try {
        // JSON APIからデータを取得
        const monthlyresponse = await fetch(monthlyUrl);
        const monthlydata = await monthlyresponse.json();
        const kansai = monthlydata.data.attributes.field_kansai;
        const hokuriku = monthlydata.data.attributes.field_hokuriku;
        const chubu = monthlydata.data.attributes.field_chubu;
        const kanto = monthlydata.data.attributes.field_kanto;
        const tohoku = monthlydata.data.attributes.field_tohoku;
        const total = monthlydata.data.attributes.field_total;
        const update_date = monthlydata.data.attributes.field_update_date;

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

        document.getElementById('store_body').innerHTML = resulttext;
        document.getElementById('store_kansai').innerHTML = kansai;
        document.getElementById('store_hokuriku').innerHTML = hokuriku;
        document.getElementById('store_chubu').innerHTML = chubu;
        document.getElementById('store_kanto').innerHTML = kanto;
        document.getElementById('store_tohoku').innerHTML = tohoku;
        document.getElementById('store_total').innerHTML = total;
        document.getElementById('store_update_date').innerHTML = update_date;
    } catch (error) {
        console.error('エラーが発生しました:', error);
    }
}

window.addEventListener('load', updateMonthly);
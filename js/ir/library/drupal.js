const monthlyUrl = 'https://d37m9cibsc5611.cloudfront.net/jsonapi/node/ir_monthly_report/cbe01e98-891f-45c0-9188-2656317749a1';

async function updateMonthly() {
    try {
        // JSON APIからデータを取得
        const monthlyresponse = await fetch(monthlyUrl);
        const monthlydata = await monthlyresponse.json();
        const monthlybody = monthlydata.data.attributes.body.value;
        console.log(monthlydata);

        document.getElementById('monthly_body').innerHTML = monthlybody;
    } catch (error) {
        console.error('エラーが発生しました:', error);
    }
}

window.addEventListener('load', updateMonthly);
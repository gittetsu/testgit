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
            '.pdf</a>': '.pdf" target="_blank" class="pdf-img"><img src="/img/ir/ico_pdf.png" alt="PDFファイル"></a>',
            '2026年2月期':'Fiscal year ending February 2026 ',
            '2025年3月～2026年2月末':'March 2025 to the end of February 2026',
            '2025年2月期':'Fiscal year ending February 2025 ',
            '2024年3月～2025年2月末':'March 2024 to the end of February 2025',
            '2024年2月期':'Fiscal year ending February 2024 ',
            '2023年3月～2024年2月末':'March 2023 to the end of February 2024',
            '2023年2月期':'Fiscal year ending February 2023 ',
            '2022年3月～2023年2月末':'March 2022 to the end of February 2023',
            '2022年2月期':'Fiscal year ending February 2022 ',
            '2021年3月～2022年2月末':'March 2022 to the end of February 2022',
            '2021年2月期':'Fiscal year ending February 2021 ',
            '2020年3月～2021年2月末':'March 2021 to the end of February 2021',
            '2020年2月期':'Fiscal year ending February 2020 ',
            '2019年3月～2020年2月末':'March 2020 to the end of February 2020',
            '2019年2月期':'Fiscal year ending February 2019 ',
            '2018年3月～2019年2月末':'March 2019 to the end of February 2019',
            '2018年2月期':'Fiscal year ending February 2018 ',
            '2017年3月～2018年2月末':'March 2018 to the end of February 2018',
            '売上伸び率　対前年同月比':'Year-on-year sales growth ',
            '24年3⽉から1Qまでの全店実績を収益認識の影響を加味した実績に変更しております。':'All store results from March 2024 to 1Q have been changed to results that take into account the impact of revenue recognition.',
            '3月':'March ',
            '4月':'April ',
            '5月':'May ',
            '6月':'June ',
            '7月':'July ',
            '8月':'August ',
            '9月':'September ',
            '10月':'October ',
            '11月':'November ',
            '12月':'December ',
            '1月':'January ',
            '2月':'February ',
            '月':'Month',
            'グループ合計':'Group total',
            '全店':'All stores',
            '既存店':'Existing stores',
            'スギ薬局':'SUGI Pharmacy',
            '資料ダウンロード':'Download',
            '年':' ',
            '日':' ',
            '更新':'Updated',
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
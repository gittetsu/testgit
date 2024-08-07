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
            '.pdf</a>': '.pdf" target="_blank" class="pdf-img"><img src="/img/ir/ico_pdf.png" alt="PDFファイル"></a>',
            '2024年6月末現在':'As of the end of June 2024',
            '2024年7月末現在':'As of the end of July 2024',
            '2024年8月末現在':'As of the end of August 2024',
            '2024年9月末現在':'As of the end of September 2024',
            '2024年10月末現在':'As of the end of October 2024',
            '2024年11月末現在':'As of the end of November 2024',
            '2024年12月末現在':'As of the end of December 2024',
            'エリア別拠点数':'Number of Stores by area',
            'スギ薬局':'SUGI Pharmacy',
            '在宅実施店舗':'Stores providing home-visit services',
            'その他':'Other',
            '合計':'Total',
            '関東':'Kanto',
            '中部':'Chubu',
            '北陸・信州エリア':'Hokuriku & Shinshu areas',
            '関西':'Kansai',
            '北海道・東北エリア':'Hokkaido & Tohoku areas',
            'エリア':' area',
            '茨城':'Ibaraki',
            '栃木':'Tochigi',
            '群馬':'Gunma',
            '埼玉':'Saitama',
            '千葉':'Chiba',
            '東京':'Tokyo',
            '神奈川':'Kanagawa',
            '岐阜':'Gifu',
            '静岡':'Shizuoka',
            '愛知':'Aichi',
            '三重':'Mie',
            '富山':'Toyama',
            '石川':'Ishikawa',
            '福井':'Fukui',
            '長野':'Nagano',
            '滋賀':'Shiga',
            '京都':'Kyoto',
            '大阪':'Osaka',
            '兵庫':'Hyogo',
            '奈良':'Nara',
            '北海道':'Hokkaido',
            '宮城':'Miyagi',
            'ジャパン':'Japan',
            '店舗</p>':'</p>',
            '店舗</h':' stores</h',
            '店舗':'',
            '　':' ',
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
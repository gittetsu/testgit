const monthlyUrl = 'https://d1vyjchtv8ee5.cloudfront.net/jsonapi/node/store/9b0f8918-aaac-4142-a507-09a348fb7c88';
// const monthlyUrl = 'https://d37m9cibsc5611.cloudfront.net/jsonapi/node/store/91ceef80-e508-423a-856f-d29bf4bd7196';

async function updateMonthly() {
    try {
        // JSON APIからデータを取得
        const monthlyresponse = await fetch(monthlyUrl);
        const monthlydata = await monthlyresponse.json();
        // const kansai = monthlydata.data.attributes.field_kansai;
        const hokuriku = monthlydata.data.attributes.field_hokuriku;
        // const chubu = monthlydata.data.attributes.field_chubu;
        const kanto = monthlydata.data.attributes.field_kanto;
        const tohoku = monthlydata.data.attributes.field_tohoku;
        const total = monthlydata.data.attributes.field_total;
        const chugoku = monthlydata.data.attributes.field_chugoku;
        const kyushu = monthlydata.data.attributes.field_kyushu;
        const tokai = monthlydata.data.attributes.field_tokai;
        const kinki = monthlydata.data.attributes.field_kinki;

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
            '2025年1月末現在':'As of the end of January 2025',
            'エリア別拠点数':'Number of Stores by area',
            'スギ薬局':'SUGI Pharmacy',
            '阪神調剤事業':'Hanshin Dispensing',
            '調剤薬局':'Dispensing pharmacy',
            '在宅実施店舗':'Stores providing home-visit services',
            'その他':'Other',
            '合計':'Total',
            '北陸・信州エリア':'Hokuriku & Shinshu areas',
            '北海道・東北エリア':'Hokkaido & Tohoku areas',
            '中国・四国エリア':'Chugoku & Shikoku areas',
            '九州・沖縄エリア':'Kyushu & Okinawa areas',
            '関東':'Kanto',
            '中部':'Chubu',
            '関西':'Kansai',
            '北陸':'Hokuriku',
            '東海':'Tokai',
            '近畿':'Kinki',
            '九州':'Kyushu',
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
            '和歌山':'Wakayama',
            '鳥取':'Tottori',
            '島根':'Shimane',
            '岡山':'Okayama',
            '広島':'Hiroshima',
            '山口':'Yamaguchi',
            '徳島':'Tokushima',
            '香川':'Kagawa',
            '愛媛':'Ehime',
            '高知':'Kochi',
            '福岡':'Fukuoka',
            '佐賀':'Saga',
            '長崎':'Nagasaki',
            '熊本':'Kumamoto',
            '大分':'Oita',
            '宮崎':'Miyazaki',
            '鹿児島':'Kagoshima',
            '沖縄':'Okinawa',
            '山梨':'Yamanashi',
            '新潟':'Niigata',
            '青森':'Aomori',
            '岩手':'Iwate',
            '宮城':'Miyagi',
            '秋田':'Akita',
            '山形':'Yamagata',
            '福島':'Fukushima',
            '北海道':'Hokkaido',
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

        const update_date_org = monthlydata.data.attributes.field_update_date;
        let replacementMap2 = {
            '2024年6月末現在':'As of the end of June 2024',
            '2024年7月末現在':'As of the end of July 2024',
            '2024年8月末現在':'As of the end of August 2024',
            '2024年9月末現在':'As of the end of September 2024',
            '2024年10月末現在':'As of the end of October 2024',
            '2024年11月末現在':'As of the end of November 2024',
            '2024年12月末現在':'As of the end of December 2024',
            '2025年1月末現在':'As of the end of January 2025',
        };

        let update_date = update_date_org.replace(
            new RegExp(Object.keys(replacementMap2).join("|"), "g"),
            match => replacementMap2[match]
        );

        document.getElementById('store_body').innerHTML = resulttext;
        // document.getElementById('store_kansai').innerHTML = kansai;
        document.getElementById('store_hokuriku').innerHTML = hokuriku;
        // document.getElementById('store_chubu').innerHTML = chubu;
        document.getElementById('store_kanto').innerHTML = kanto;
        document.getElementById('store_tohoku').innerHTML = tohoku;
        document.getElementById('store_chugoku').innerHTML = chugoku;
        document.getElementById('store_kyushu').innerHTML = kyushu;
        document.getElementById('store_tokai').innerHTML = tokai;
        document.getElementById('store_kinki').innerHTML = kinki;
        document.getElementById('store_total').innerHTML = total;
        document.getElementById('store_update_date').innerHTML = update_date;
    } catch (error) {
        console.error('エラーが発生しました:', error);
    }
}

window.addEventListener('load', updateMonthly);
// const apiUrl = 'https://d1vyjchtv8ee5.cloudfront.net/jsonapi/node/sugi_hd';
const apiUrl = 'https://d37m9cibsc5611.cloudfront.net/jsonapi/node/sugi_hd';
const fileApiUrl = 'https://d37m9cibsc5611.cloudfront.net/jsonapi/file/file';

// カテゴリーごとに記事を取得して表示
async function updateArticleLists(category) {
  try {
    const filter = category === 'all' ? '' : `&filter[field_list]=${category}`;
    const noticefilter = 'filter[ex1][condition][path]=field_notice&filter[ex1][condition][operator]=IN&filter[ex1][condition][value][1]=1&filter[ex1][condition][value][2]=3';

    const response = await fetch(`${apiUrl}?sort=-field_date,-changed${filter}&page[limit]=5&${noticefilter}`);
    const data = await response.json();

    const ulElement = document.getElementById(category);
    if (ulElement) {
      ulElement.innerHTML = ''; // リストをクリア
      for (const article of data.data) {
        let pdflink = "";
        let pdfName = ""; // PDFファイル名を初期化

        // bodyがnullでない場合、またはPDF関連データが存在しない場合、通常の記事リンクを使用
        if (article.attributes.body !== null) {
          pdflink = `/news/article?id=${article.id}`;
        } else {
          // bodyがnullで、かつPDF関連データが存在する場合、PDFのリンクと名前を取得
          if(article.relationships.field_upload.data && article.relationships.field_upload.data.id){
            const fileId = article.relationships.field_upload.data.id; // PDFのIDを取得
            const fileResponse = await fetch(`${fileApiUrl}/${fileId}`);
            const fileData = await fileResponse.json();
            pdfName = fileData.data.attributes.filename; // PDFのファイル名を取得
            pdflink = `/pdf/${pdfName}" target="_blank`;
          }
          if(article.attributes.field_pdf && article.attributes.field_pdf.value){
            pdflink = `/pdf/${article.attributes.field_pdf.value}" target="_blank`;
          }
        }

        // 記事リストのHTMLを生成
        const liElement = document.createElement('li');
        liElement.className = 'news-list';
        if (article.attributes.body === null) {
          liElement.innerHTML = `
          <div class="new-common-list">
            <a href="${pdflink}" class="article-link" data-article-id="${article.id}">
              <div class="cat-blk">
                <p class="date small-text">${article.attributes.field_date}</p>
                <ul>
                  <li class="small-text">スギホールディングス</li> 
                  <li class="small-text">${article.attributes.field_list}</li>
                </ul>
              </div>
              <p class="newslist-desc pdf" id="article-title">${article.attributes.title}</p>
            </a>
          </div>
        `;
        } else {
          liElement.innerHTML = `
          <div class="new-common-list">
            <a href="${pdflink}" class="article-link" data-article-id="${article.id}">
              <div class="cat-blk">
                <p class="date small-text">${article.attributes.field_date}</p>
                <ul>
                  <li class="small-text">スギホールディングス</li> 
                  <li class="small-text">${article.attributes.field_list}</li>
                </ul>
              </div>
              <p class="newslist-desc text-02" id="article-title">${article.attributes.title}</p>
            </a>
          </div>
        `;
        }
        ulElement.appendChild(liElement);
      };
    }
  } catch (error) {
    console.error('エラーが発生しました:', error);
  }
}

// NOTICELIST用の関数
async function updateNoticeList() {
  try {
    // JSON APIからNOTICELISTのデータを取得
    const noticefilter2 = 'filter[ex1][condition][path]=field_notice&filter[ex1][condition][operator]=IN&filter[ex1][condition][value][1]=2&filter[ex1][condition][value][2]=3'
    const response2 = await fetch(`${apiUrl}?sort=-field_date,-changed&${noticefilter2}`);
    const data2 = await response2.json();
    // 条件に応じて要素を取得
    const noticeSection = document.querySelector('.sec-notice');

    if (data2.data.length !== 0) {
      const noticeListElement = document.getElementById('noticelist');
      if (noticeListElement) {
        noticeListElement.innerHTML = ''; // リストをクリア
        data2.data.forEach((article, index) => {
          const liElement2 = document.createElement('noticelist');
          let pdflink = "";
          if (article.attributes.body === null) {
            // 条件1: bodyがnullの場合、PDFへ遷移
            if (article.attributes.field_pdf.value) {
              pdflink = `/pdf/${article.attributes.field_pdf.value}" target="_blank`;
            }
          } else {
            // 条件2: bodyがnullでない場合、記事へ遷移
            pdflink = `/news/article?id=${article.id}`;
          }
          // liElement2.className = 'notice-list';
          liElement2.className = 'notice-list-item';
          liElement2.innerHTML = `
                <li class="notice-item">
                <a href="${pdflink}">
                <span class="notice-date">${article.attributes.field_date}</span>
                <p class="notice-desc id="article-title${index + 1}">${article.attributes.title}</p>
                </a>
                </li>
        `;
          noticeListElement.appendChild(liElement2);
          noticeSection.style.display = 'block';
        });
      }
    }
  } catch (error) {
    console.error('エラーが発生しました:', error);
  }
}

async function updateGroupList() {
  try {
    const groupUrl = 'https://d37m9cibsc5611.cloudfront.net/jsonapi/node/sugi_group';

    // JSON APIからデータを取得
    const response3 = await fetch(`${groupUrl}?sort=-field_date,-changed&page[limit]=10`);
    const data3 = await response3.json();

    // 取得したデータから記事リストを生成
    const groupListElement = document.getElementById('topics-slider');
    if (groupListElement) {
      groupListElement.innerHTML = ''; // リストをクリア
      data3.data.forEach((article, index) => {
        const liElement3 = document.createElement('li');
        let pdflink = "";
        pdflink = `/topic/article/index.html?id=${article.id}`;
        // liElement.className = 'news-list';
        liElement3.className = 'topics-item';
        if (index == 2) {
          liElement3.innerHTML = `
          <li class="topics-item slick-slide id="lastClone"">
          <a href="${pdflink}" class="topics-box" data-article-id="${article.id}>
            <div class="topics-img">
              <img src="/topic/img/${article.attributes.field_group_thumbnail}" alt="" style="object-fit: cover; aspect-ratio: 4/3;">
            </div>
            <div class="topics-txt">
              <p class="text-02">${article.attributes.title}</p>
                <p class="date small-text">${article.attributes.field_date}</p>
                <span class="category">${article.attributes.field_group_list}</span>
            </div>
          </a>
        </li>
        `;
        } else if (index == 7) {
          liElement3.innerHTML = `
          <li class="topics-item slick-slide id="firstClone"">
          <a href="${pdflink}" class="topics-box" data-article-id="${article.id}>
            <div class="topics-img">
              <img src="/topic/img/${article.attributes.field_group_thumbnail}" alt="" style="object-fit: cover; aspect-ratio: 4/3;">
            </div>
            <div class="topics-txt">
              <p class="text-02">${article.attributes.title}</p>
                <p class="date small-text">${article.attributes.field_date}</p>
                <span class="category">${article.attributes.field_group_list}</span>
            </div>
          </a>
        </li>
        `;
        } else {
          liElement3.innerHTML = `
          <li class="topics-item slick-slide">
          <a href="${pdflink}" class="topics-box" data-article-id="${article.id}>
            <div class="topics-img">
              <img src="/topic/img/${article.attributes.field_group_thumbnail}" alt="" style="object-fit: cover; aspect-ratio: 4/3">
            </div>
            <div class="topics-txt">
              <p class="text-02">${article.attributes.title}</p>
                <p class="date small-text">${article.attributes.field_date}</p>
                <span class="category">${article.attributes.field_group_list}</span>
            </div>
          </a>
        </li>
        `;
        }
        groupListElement.appendChild(liElement3);
      });
    }
  } catch (error) {
    console.error('エラーが発生しました:', error);
  }
}

// タブリンクにクリックイベントを追加
const tabLinks = document.querySelectorAll('.tablinks');
tabLinks.forEach(link => {
  link.addEventListener('click', event => {
    const category = event.currentTarget.getAttribute('data-tab-target');
    updateArticleLists(category);
  });
});

// ページ読み込み時にデフォルトのカテゴリーで記事を表示
window.addEventListener('load', () => {
  updateArticleLists('all'); // デフォルトは 'all' カテゴリー
  updateNoticeList(); // NOTICELISTの記事を表示
  // updateGroupList(); // Grouptopicsの記事を表示
});
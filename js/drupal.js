// JSON APIのエンドポイントURLを指定
const apiUrl = 'https://d37m9cibsc5611.cloudfront.net/jsonapi/node/sugi_hd?sort=-created';

// 日付フォーマット変更
function formatDate(dateString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', options).replace(/\//g, '.');
}

// ページ読み込み時に記事を取得し、カテゴリーごとに表示
async function updateArticleLists() {
  try {
    // JSON APIからデータを取得
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);

    // データを新しい順にソート（created フィールドを基準に）
    const sortedData = data.data.sort((a, b) => {
      const dateA = new Date(a.attributes.created);
      const dateB = new Date(b.attributes.created);
      return dateB - dateA; // 新しい順にソート
    });

    // カテゴリーごとに記事をフィルタリングしてリストに追加
    const categories = ["経営", "グループ", "サステナビリティ", "イベント", "その他", "IR情報"];

    // カテゴリーごとの記事リストを初期化
    const categoryLists = {};
    categories.forEach(category => {
      categoryLists[category.toLowerCase()] = [];
    });

    sortedData.forEach(article => {
      const category = article.attributes.field_list.toLowerCase();

      // 各カテゴリーごとにcount変数を初期化
      if (!categoryLists[category].count) {
        categoryLists[category].count = 0;
      }

      if (categoryLists[category].count < 5) {
        categoryLists[category].push(article);
        categoryLists[category].count++; // countを増加
      }
    });

    // 各カテゴリーごとにリストを表示
    categories.forEach(category => {
      const ulElement = document.getElementById(category);
      if (ulElement) {
        categoryLists[category.toLowerCase()].forEach(article => {
          const liElement = document.createElement('li');
          liElement.className = 'news-list';
          liElement.innerHTML = `
							<li class="new-common-list">
                				<a href="#" class="article-link" data-article-id="${article.id}">
                    			<div class="cat-blk">
                        			<p class="date small-text">${formatDate(article.attributes.created)}</p>
									<ul>
                            			<li class="small-text">スギホールディングス</li> 
										<li class="small-text">${article.attributes.field_list}</li>
									</ul>
                    			</div>
                    			<p class="newslist-desc text-02" id="article-title${categoryLists[category.toLowerCase()].count}">${article.attributes.title}</p>
                				</a>
							</li>
            				`;
          ulElement.appendChild(liElement);
        });
      }
    });

    // リンクにクリックイベントを追加
    const articleLinks = document.querySelectorAll('.article-link');
    articleLinks.forEach(link => {
      link.addEventListener('click', openArticle);
    });
  } catch (error) {
    console.error('エラーが発生しました:', error);
  }
}

function openArticle(event) {
  // デフォルトのクリック動作（リンク遷移）を防止
  event.preventDefault();

  // 選択された記事のIDを取得
  const articleId = event.currentTarget.getAttribute('data-article-id');

  // articleIdを使用して遷移先URLを構築
  const destinationURL = `https://d2ehwfutnqpgdf.cloudfront.net/news/article?id=${articleId}`;

  // 遷移
  window.location.href = destinationURL;
}

// ページ読み込み時に記事を取得し、カテゴリーごとに表示
window.addEventListener('load', updateArticleLists);

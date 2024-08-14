function parseAndJoinIDs(inputString) {
  const items = inputString.split(',');
  const ids = items.map((item) => item.split(':')[0]);
  return ids.join(',');
}
async function searchHandler() {
  const urlPattern = /^https:\/\/www\.musinsa\.com\/categories\/.*(\?.*)?$/;
  const container = document.querySelector('.goods-container');
  const pagination = document.querySelector('.pagination');
  pagination.innerHTML = '';
  container.innerHTML = '';
  if (!urlPattern.test(window.location.href)) return;

  const query = getQueryParams(window.location.search);
  const baseUrl = setCategoryFilters();

  const data = await (
    await fetch(baseUrl.toString(), {
      credentials: 'include',
    })
  ).json();

  const goods = data.data.goodsList;

  const ids = goods.map((item) => item.goodsNo);
  const likeRequestUrl = new URL('https://like.musinsa.com/like/api/v2/liketypes/goods/counts');
  const likeResponse = await (
    await fetch(likeRequestUrl.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ relationIds: ids }),
    })
  ).json();
  const likeData = likeResponse.data.contents.items;

  goods.forEach((goodsItem, i) => {
    const goodsItemElement = document.createElement('div');
    goodsItemElement.className = 'goods-item';
    goodsItemElement.innerHTML = categoryItemTemplate({
      ...goodsItem,
      relatedGoodsReviewCount: +goodsItem.relatedGoodsReviewCount,
      likeCount: +likeData[i].count,
      isLiked: likeData[i].liked,
    });
    const likeBtn = goodsItemElement.querySelector('button');
    likeBtn.addEventListener('click', () => {
      const isLiked = likeBtn.classList.contains('liked');
      likeBtn.classList.toggle('liked');
      const goodsNo = goodsItem.goodsNo;
      fetch(`https://like.musinsa.com/like/api/v1/members/liketypes/goods/relations/${goodsNo}`, {
        method: isLiked ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
    });
    container.appendChild(goodsItemElement);
  });

  pagination.innerHTML = paginationTemplate({
    currentPage: query.page ?? 1,
    lastPage: Math.ceil(data.data.totalCount / 100),
  });

  const main = document.querySelector('main');
  main.appendChild(container);
}

async function initsearchGoods() {
  if (window.innerWidth < 1200) return;
  await wait(500);
  let oldHref = document.location.href;
  const body = document.querySelector('body');
  const container = document.createElement('div');
  container.className = 'goods-container';

  const pagination = document.createElement('div');
  pagination.className = 'pagination';
  pagination.addEventListener('click', (e) => {
    handlePageClick(e);
    searchHandler();
  });

  const main = document.querySelector('body>div');
  main.appendChild(container);
  main.appendChild(pagination);

  const observer = new MutationObserver(async (mutations) => {
    if (oldHref === document.location.href) return;
    oldHref = document.location.href;
    searchHandler();
  });

  observer.observe(body, { childList: true, subtree: true });

  window.addEventListener('popstate', () => {
    if (oldHref !== document.location.href) {
      oldHref = document.location.href;
      searchHandler();
    }
  });

  searchHandler();
}
window.onload = initsearchGoods;

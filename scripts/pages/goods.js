function parseAndJoinIDs(inputString) {
  const items = inputString.split(',');
  const ids = items.map((item) => item.split(':')[0]);
  return ids.join(',');
}
async function searchHandler() {
  const searchDetailPattern = /^https:\/\/www\.musinsa\.com\/search\/musinsa\/goods(\?.*)?$/;
  const container = document.querySelector('.goods-container');
  const pagination = document.querySelector('.pagination');

  pagination.innerHTML = '';
  container.innerHTML = '';
  if (!searchDetailPattern.test(window.location.href)) return;

  const query = getQueryParams(window.location.search);
  const baseUrl = new URL('https://search.musinsa.com/api/search/v2/goods?siteKindId=musinsa');
  baseUrl.searchParams.append('keyword', query.q);
  baseUrl.searchParams.append('includeSoldOut', !!query.isChecked);
  baseUrl.searchParams.append('includeUnisex', query.includeUnisex != 0);
  baseUrl.searchParams.append('sort', query.sort ?? 'POPULAR');
  baseUrl.searchParams.append('originalYn', 'N');
  baseUrl.searchParams.append('size', window.innerWidth < 1701 ? 80 : 100);
  baseUrl.searchParams.append('page', query.page ?? 1);
  baseUrl.searchParams.append('sex', query.sex ?? 'A');
  query.sale_goods && baseUrl.searchParams.append('saleGoods', query.sale_goods);
  query.tags && baseUrl.searchParams.append('tags', query.tags);
  query.price1 && baseUrl.searchParams.append('startPrice', query.price1);
  query.price2 && baseUrl.searchParams.append('endPrice', query.price2);
  query.discountRateCode && baseUrl.searchParams.append('discountRateCode', query.discountRateCode);

  if (query.category1) baseUrl.searchParams.append('category1DepthCode', parseAndJoinIDs(query.category1));
  if (query.category2) baseUrl.searchParams.append('category2DepthCodes', parseAndJoinIDs(query.category2));

  const data = await (await fetch(baseUrl.toString(), { credentials: 'include' })).json();

  const goods = data.data.list;
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
    goodsItemElement.innerHTML = goodsItemTemplate({
      ...goodsItem,
      likeCount: +likeData[i].count,
      isLiked: likeData[i].liked,
    });
    const likeBtn = goodsItemElement.querySelector('button');
    likeBtn.addEventListener('click', () => {
      const isLiked = likeBtn.classList.contains('liked');
      likeBtn.classList.toggle('liked');
      fetch(`https://like.musinsa.com/like/api/v1/members/liketypes/goods/relations/${goodsItem.goodsNo}`, {
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
    lastPage: data.data.lastPage,
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

  const main = document.querySelector('main');
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

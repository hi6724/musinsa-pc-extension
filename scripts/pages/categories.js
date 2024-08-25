function parseAndJoinIDs(inputString) {
  const items = inputString.split(',');
  const ids = items.map((item) => item.split(':')[0]);
  return ids.join(',');
}

async function categorySearchHandler() {
  const categoryUrlPattern = /^https:\/\/www\.musinsa\.com\/category\/.*(\?.*)?$/;
  if (!categoryUrlPattern.test(window.location.href)) return;

  const container = document.querySelector('.goods-container');
  const pagination = document.querySelector('.pagination');
  pagination.innerHTML = '';
  container.innerHTML = '';

  const query = getQueryParams(window.location.search);
  const baseUrl = setCategoryFilters();

  const data = await (
    await fetch(baseUrl.toString(), {
      credentials: 'include',
    })
  ).json();

  const goods = data.data.list;
  const paginationData = data.data.pagination;

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
      ranking: i + 1 + paginationData.size * (paginationData.page - 1),
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
    lastPage: paginationData.totalPages,
  });
}

async function initCategoryPageExist() {
  if (window.innerWidth < 1200) return;
  const categoryUrlPattern = /^https:\/\/www\.musinsa\.com\/category\/.*(\?.*)?$/;
  if (!categoryUrlPattern.test(window.location.href)) return;

  const prevGoodsContainer = document.querySelector('.goods-container');
  const prevPagination = document.querySelector('.pagination');
  if (prevGoodsContainer) prevGoodsContainer.remove();
  if (prevPagination) prevPagination.remove();

  const container = document.createElement('div');
  container.className = 'goods-container';

  const pagination = document.createElement('div');
  pagination.className = 'pagination';
  pagination.addEventListener('click', (e) => {
    handlePageClick(e);
    categorySearchHandler();
  });

  const main = document.querySelector('main');
  main.appendChild(container);
  main.appendChild(pagination);

  categorySearchHandler();
}

function initCategoryPage() {
  const interval = setInterval(() => {
    const div = document.querySelector('.itEfxW');
    const isOk = goodsContainerExists();
    if (div || isOk) {
      if (div) div.style.display = 'none';
      clearInterval(interval);
      initCategoryPageExist();
    }
  }, 100);
}

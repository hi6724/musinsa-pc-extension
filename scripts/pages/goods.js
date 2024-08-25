function parseAndJoinIDs(inputString) {
  const items = inputString.split(',');
  const ids = items.map((item) => item.split(':')[0]);
  return ids.join(',');
}

async function searchDetailHandler() {
  const searchDetailPattern = /^https:\/\/www\.musinsa\.com\/search\/goods(\?.*)?$/;
  if (!searchDetailPattern.test(window.location.href)) return;

  const container = document.querySelector('.goods-container');
  const pagination = document.querySelector('.pagination');
  pagination.innerHTML = '';
  container.innerHTML = '';

  const query = getQueryParams(window.location.search);
  const baseUrl = setSearchFilters();
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
      likeCount: +likeData[i].count,
      ranking: i + 1 + paginationData.size * (paginationData.page - 1),
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

async function initSearchDetailPageExist() {
  if (window.innerWidth < 1200) return;
  const searchDetailPattern = /^https:\/\/www\.musinsa\.com\/search\/goods(\?.*)?$/;
  if (!searchDetailPattern.test(window.location.href)) return;

  const main = document.querySelector('main>div');
  const headers = document.querySelectorAll('main>div>header');
  if (!main) return;
  if (headers.length < 2) return;

  const prevGoodsContainer = document.querySelector('.goods-container');
  const prevPagination = document.querySelector('.pagination');

  if (!prevGoodsContainer) {
    const container = document.createElement('div');
    container.className = 'goods-container';
    main.appendChild(container);
  }
  if (!prevPagination) {
    const pagination = document.createElement('div');
    pagination.className = 'pagination';
    pagination.addEventListener('click', (e) => {
      handlePageClick(e);
      searchDetailHandler();
    });
    main.appendChild(pagination);
  }

  searchDetailHandler();
}

function initSearchDetailPage() {
  const interval = setInterval(() => {
    const div = document.querySelector('.dBXfGP');
    const isOk = goodsContainerExists();
    if (div || isOk) {
      if (div) div.style.display = 'none';
      clearInterval(interval);
      initSearchDetailPageExist();
    }
  }, 100);
}

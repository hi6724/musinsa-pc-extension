function parseAndJoinIDs(inputString) {
  const items = inputString.split(',');
  const ids = items.map((item) => item.split(':')[0]);
  return ids.join(',');
}

async function brandSearchHandler() {
  const urlPattern = /^https:\/\/www\.musinsa\.com\/brand\/.*(\?.*)?$/;
  if (!urlPattern.test(window.location.href)) return;

  const container = document.querySelector('.goods-container');
  const pagination = document.querySelector('.pagination');
  pagination.innerHTML = '';
  container.innerHTML = '';

  const query = getQueryParams(window.location.search);
  const baseUrl = setBrandFilters();

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

async function initBrandPageExist() {
  if (window.innerWidth < 1200) return;
  const urlPattern = /^https:\/\/www\.musinsa\.com\/brand\/.*(\?.*)?$/;
  if (!urlPattern.test(window.location.href)) return;

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
    brandSearchHandler();
  });

  const main = document.querySelector('main');
  main.appendChild(container);
  main.appendChild(pagination);

  brandSearchHandler();
}

function initBrandPage() {
  const currentUrl = document.location.href;
  const isFlagShip = currentUrl.includes('adidas') || currentUrl.includes('nike');
  const interval = setInterval(() => {
    if (isFlagShip) {
      const divs = document.querySelectorAll('main>div');
      if (currentUrl.split('/').length < 6) return;
      if (divs.length >= 3) {
        clearInterval(interval);
        initBrandPageExist();
      }
    } else {
      const main = document.querySelector('main');
      if (main) {
        clearInterval(interval);
        initBrandPageExist();
      }
    }
  }, 100);
}

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
  const isSnapView = query.isSnapView == 'true';

  container.classList.toggle('snap-view-container', isSnapView);

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

  let snapLikeResponse = null;
  if (isSnapView) {
    const snapIds = goods.map((item) => item.snap?.no).join(',');
    const snapLikeRequestUrl = new URL(
      'https://content.musinsa.com/api2/content/snap/v1/profiles/me/liked-snaps/exists'
    );
    snapLikeRequestUrl.searchParams.append('ids', snapIds);

    snapLikeResponse = await (
      await fetch(snapLikeRequestUrl.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
    ).json();
  }

  goods.forEach((goodsItem, i) => {
    const goodsItemElement = document.createElement('div');
    goodsItemElement.className = 'goods-item snap-view-item';
    if (!isSnapView)
      goodsItemElement.innerHTML = goodsItemTemplate({
        ...goodsItem,
        ranking: i + 1 + paginationData.size * (paginationData.page - 1),
        likeCount: +likeData[i].count,
        isLiked: likeData[i].liked,
      });
    else
      goodsItemElement.innerHTML = snapTemplate({
        ...goodsItem,
        isLiked: snapLikeResponse?.data?.[goodsItem?.snap?.no],
      });

    const likeBtn = goodsItemElement.querySelector('button');
    likeBtn.addEventListener('click', () => {
      if (!LOGGED_IN) {
        if (confirm('로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?'))
          location.href = 'https://www.musinsa.com/auth/login?referer=https%3A%2F%2Fwww.musinsa.com%2Fmypage';
        return;
      }

      const isLiked = likeBtn.classList.contains('liked');
      likeBtn.classList.toggle('liked');
      if (isSnapView) {
        const snapNo = goodsItem?.snap?.no;
        if (!snapNo) return;
        fetch(`https://content.musinsa.com/api2/content/snap/v1/snaps/${snapNo}/liked`, {
          method: isLiked ? 'DELETE' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
      } else {
        const goodsNo = goodsItem.goodsNo;
        fetch(`https://like.musinsa.com/like/api/v1/members/liketypes/goods/relations/${goodsNo}`, {
          method: isLiked ? 'DELETE' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
      }
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

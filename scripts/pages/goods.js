function parseAndJoinIDs(inputString) {
  const items = inputString.split(',');
  const ids = items.map((item) => item.split(':')[0]);
  return ids.join(',');
}

function getLastPathSegment() {
  const regex = /^https:\/\/www\.musinsa\.com\/search\/(snap|goods|benefit|contents|lookbook)(\?.*)?$/;
  const match = window.location.href.match(regex);
  return match ? match[1] : null;
}

async function searchSnapHandler() {
  const container = document.querySelector('.goods-container');
  const pagination = document.querySelector('.pagination');
  pagination.innerHTML = '';
  container.innerHTML = '';
  container.classList.toggle('snap-view-container', true);

  const query = getQueryParams(window.location.search);
  const baseUrl = setSnapSearchFilters();
  const data = await (
    await fetch(baseUrl.toString(), {
      credentials: 'include',
    })
  ).json();
  const snaps = data?.data?.list;

  const snapIds = snaps.map((item) => item.id).join(',');
  const snapLikeRequestUrl = new URL('https://content.musinsa.com/api2/content/snap/v1/profiles/liked-snaps/count');
  snapLikeRequestUrl.searchParams.append('ids', snapIds);

  const snapLikeResponse = await (
    await fetch(snapLikeRequestUrl.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
  ).json();

  snaps.forEach((snapItem, i) => {
    const snapItemElem = document.createElement('div');
    snapItemElem.className = 'goods-item snap-view-item';
    snapItemElem.innerHTML = snapTemplate({
      snap: {
        no: snapItem.id,
        thumbnail: snapItem.thumbnailUrl,
      },
      goodsNo: '',
      isLiked: snapLikeResponse?.data?.[snapItem?.id]?.isExists,
    });

    const likeBtn = snapItemElem.querySelector('button');
    likeBtn.addEventListener('click', () => {
      if (!LOGGED_IN) {
        if (confirm('로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?'))
          location.href = 'https://www.musinsa.com/auth/login?referer=https%3A%2F%2Fwww.musinsa.com%2Fmypage';
        return;
      }

      const isLiked = likeBtn.classList.contains('liked');
      likeBtn.classList.toggle('liked');

      const snapNo = snapItem?.snap?.no;
      if (!snapNo) return;
      fetch(`https://content.musinsa.com/api2/content/snap/v1/snaps/${snapNo}/liked`, {
        method: isLiked ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
    });
    container.appendChild(snapItemElem);
  });

  // 페이지 네이션 정보
  const paginationUrl = new URL('https://content.musinsa.com/api2/content/snap/v1/snaps/count');
  Object.keys(query).forEach((key) => {
    paginationUrl.searchParams.append(key, query[key]);
  });
  const paginationRes = await (
    await fetch(paginationUrl.toString(), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
  ).json();
  const total = paginationRes?.data?.count;
  const size = window.innerWidth < 1701 ? 80 : 100;
  pagination.innerHTML = paginationTemplate({
    currentPage: query.page ?? 1,
    lastPage: Math.ceil(total / size),
  });
}

async function searchGoodsHandler() {
  const container = document.querySelector('.goods-container');
  const pagination = document.querySelector('.pagination');
  container.classList.toggle('snap-view-container', false);
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
      if (!LOGGED_IN) {
        if (confirm('로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?')) {
          location.href = 'https://www.musinsa.com/auth/login?referer=https%3A%2F%2Fwww.musinsa.com%2Fmypage';
        }
        return;
      }
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

async function searchDetailHandler() {
  const type = getLastPathSegment();
  if (type === null) return;

  if (type === 'goods') {
    searchGoodsHandler();
    return;
  }
  if (type === 'snap') {
    searchSnapHandler();
    return;
  }
}

async function initSearchDetailPageExist() {
  if (window.innerWidth < 1200) return;
  const type = getLastPathSegment();
  if (type === null) return;

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
    const div = document.querySelector('.eqgBtw');
    const isOk = goodsContainerExists();
    if (div || isOk) {
      clearInterval(interval);
      initSearchDetailPageExist();
    }
  }, 100);
}

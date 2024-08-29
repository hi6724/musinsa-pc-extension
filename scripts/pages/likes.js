let prevFilter = null;
let prevCursorList = [];
let totalResults = [];
let currentPage = 1;

async function convertToCode(filter) {
  const { data } = await (
    await fetch('https://like.musinsa.com/like/api/v2/goods/sorted-count', {
      credentials: 'include',
    })
  ).json();
  const categoryCode = data.categoryCounts.find((el) => el.categoryName === filter.currentCategory)?.categoryCode;

  const sortCodeMap = {
    담은순: 'LIKE_MEMBER_ID_DESC',
    낮은가격순: 'PRICE_ASC',
    높은가격순: 'PRICE_DESC',
    할인율순: 'DISCOUNT_RATE_DESC',
    브랜드이름순: 'BRAND_NAME_ASC',
  };
  const sort = sortCodeMap[filter.sortText];
  return { ...filter, categoryCode, sort };
}

async function getTotalCount(filter) {
  const newFilter = await convertToCode(filter);
  const size = window.innerWidth < 1701 ? 80 : 100;
  let nextCursor = null;
  let results = [];

  do {
    // URL에 nextCursor가 있으면 추가
    const fetchUrl = setLikeFilters(newFilter, { cursor: nextCursor, lastIndex: size * results.length });

    try {
      const response = await fetch(fetchUrl, { credentials: 'include' });
      if (!response.ok) throw new Error(`Error fetching data: ${response.statusText}`);
      const data = await response.json();
      results.push(data.data);
      nextCursor = data?.link?.nextCursor;
    } catch (error) {
      console.error('Fetch error:', error);
      break; // 오류 발생 시 루프를 중단합니다.
    }
  } while (nextCursor);

  return results;
}

async function likeSearchHandler() {
  const size = window.innerWidth < 1701 ? 80 : 100;
  const container = document.querySelector('.goods-container');
  container.innerHTML = '';

  const goods = totalResults[currentPage - 1];

  goods.forEach((goodsItem, i) => {
    if (goodsItem.itemType !== 'GOODS') return;
    const goodsItemElement = document.createElement('div');
    goodsItemElement.className = 'goods-item';
    goodsItemElement.innerHTML = goodsItemTemplate({
      ...goodsItem,
      isLiked: goodsItem.isLike,
      ranking: goodsItem.itemIndex,
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
}

function likeObserver() {
  const main = document.querySelector('main');
  const observer = new MutationObserver(likeObserverCallback);
  observer.observe(main, { childList: true, subtree: true, attributes: true });
  likeObserverCallback();
}

async function likeObserverCallback() {
  if (window.innerWidth < 1200) return;
  const likePattern = /^https:\/\/www\.musinsa\.com\/like\/goods(\?.*)?$/;
  if (!likePattern.test(window.location.href)) return;

  const childrenList = Array.from(document.querySelector('main').childNodes);
  const categoryList = Array.from(childrenList[1].firstChild.childNodes);
  const currentCategory = categoryList.find((el) => el.classList.contains('bg-white'))?.innerText;
  const isSale = childrenList[2].firstChild.childNodes[0].querySelector('button').dataset.state === 'checked';
  const isNotSoldOut = childrenList[2].firstChild.childNodes[1].querySelector('button').dataset.state === 'checked';
  const sortText = childrenList[2].childNodes[1].querySelector('span').innerText;

  if (
    prevFilter?.currentCategory === currentCategory &&
    prevFilter?.isSale === isSale &&
    prevFilter?.isNotSoldOut === isNotSoldOut &&
    prevFilter?.sortText === sortText
  )
    return;
  prevFilter = { currentCategory, isSale, isNotSoldOut, sortText };
  prevCursorList = [];
  currentPage = 1;
  totalResults = await getTotalCount(prevFilter);

  const pagination = document.querySelector('.pagination');
  pagination.innerHTML = '';
  pagination.innerHTML = paginationTemplate({
    currentPage,
    lastPage: totalResults.length,
  });

  pagination.addEventListener('click', (e) => {
    const page = e.target.dataset.page;
    let newPage = parseInt(currentPage ?? 1, 10);
    if (!page) return;
    else if (page === 'prev') newPage = Math.max(1, newPage - 1);
    else if (page === 'next') newPage = Math.min(newPage + 1, totalResults.length);
    else newPage = page;
    currentPage = newPage;

    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = '';
    pagination.innerHTML = paginationTemplate({
      currentPage,
      lastPage: totalResults.length,
    });
    likeSearchHandler();
  });

  likeSearchHandler();
}

function initLikesPage() {
  const interval = setInterval(() => {
    const virtualItemList = getVirtualItemList();
    const main = document.querySelector('main');
    const container = document.createElement('div');
    const pagination = document.createElement('div');
    if (!virtualItemList || !main) return;
    prevFilter = null;
    prevCursorList = [];
    virtualItemList.remove();
    container.className = 'goods-container';
    pagination.className = 'pagination';
    main.appendChild(container);
    main.appendChild(pagination);
    likeObserver();
    clearInterval(interval);
  }, 100);
}

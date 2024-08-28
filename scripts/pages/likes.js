let prevFilter = null;
let prevCursorList = [];

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

async function likeSearchHandler(filter, cursor) {
  const size = window.innerWidth < 1701 ? 80 : 100;
  const newFilter = await convertToCode(filter);
  const container = document.querySelector('.goods-container');
  container.innerHTML = '';
  const baseUrl = setLikeFilters(newFilter, { cursor, lastIndex: size * prevCursorList.length });
  const data = await (
    await fetch(baseUrl.toString(), {
      credentials: 'include',
    })
  ).json();
  const goods = data.data;

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

  const pagination = document.querySelector('.pagination');
  const nextCursor = data?.link?.nextCursor;
  pagination.innerHTML = '';
  pagination.innerHTML = noPagepaginationTemplate({
    hasNext: !!nextCursor,
    hasPrev: prevCursorList.length > 0,
  });
  const prevBtn = pagination.querySelector('.prev');
  const nextBtn = pagination.querySelector('.next');
  nextBtn.addEventListener('click', () => {
    prevCursorList.push(cursor);
    likeSearchHandler(filter, nextCursor);
  });
  prevBtn.addEventListener('click', () => {
    const prevCursor = prevCursorList.pop();
    likeSearchHandler(filter, prevCursor);
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
  likeSearchHandler(prevFilter);
}

function initLikesPage() {
  const interval = setInterval(() => {
    const virtualItemList = getVirtualItemList();
    if (!virtualItemList) return;
    virtualItemList.style.display = 'none';
    clearInterval(interval);
    const main = document.querySelector('main');
    const container = document.createElement('div');
    const pagination = document.createElement('div');
    container.className = 'goods-container';
    pagination.className = 'pagination';
    main.appendChild(container);
    main.appendChild(pagination);
    likeObserver();
  }, 100);
}

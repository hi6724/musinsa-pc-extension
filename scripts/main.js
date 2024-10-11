const callback = [];

async function handleRouteChange(oldHref) {
  removeInsertedCSS();
  const searchDetailPattern = /^https:\/\/www\.musinsa\.com\/search\/goods(\?.*)?$/;
  const likePattern = /^https:\/\/www\.musinsa\.com\/like\/goods(\?.*)?$/;
  const brandUrlPattern = /^https:\/\/www\.musinsa\.com\/brand\/.*(\?.*)?$/;
  const goodsDetailPattern = /^https:\/\/www\.musinsa\.com\/products\/.*(\?.*)?$/;
  const currentUrl = document.location.href;

  const currentQueryParams = getQueryParams('?' + currentUrl.split('?')[1]);
  const oldQueryParams = getQueryParams('?' + oldHref?.split('?')[1]);
  const isSameFilter = compareWithoutPage(currentQueryParams, oldQueryParams);
  if (!isSameFilter) clearPageParams();
  clearCustomComponents();

  // 로그인 관리
  fetch('https://my.musinsa.com/api/member/v1/login-status', { credentials: 'include' })
    .then((res) => res.json())
    .then((data) => (LOGGED_IN = data?.data?.loggedIn));

  if (searchDetailPattern.test(currentUrl)) {
    insertCSS({ '.dBXfGP': 'display: none' });
    await initSearchDetailPage();
    return;
  }
  if (brandUrlPattern.test(currentUrl)) {
    await initBrandPage();
    return;
  }
  if (likePattern.test(currentUrl)) {
    await initLikesPage();
    return;
  }
  if (goodsDetailPattern.test(currentUrl)) {
    await initGoodsDetailPage();
    return;
  }
  location.href.includes('category') && (await initCategoryPage());
}

async function init() {
  let oldHref = document.location.href;
  const body = document.querySelector('body');
  const css = document.createElement('style');
  css.id = 'musinsa-extension-style';
  document.head.appendChild(css);

  const observer = new MutationObserver(async () => {
    if (oldHref === document.location.href) return;
    handleRouteChange(oldHref);
    oldHref = document.location.href;
  });

  observer.observe(body, { childList: true, subtree: true, attributes: true });

  window.addEventListener('popstate', () => {
    if (oldHref !== document.location.href) {
      handleRouteChange(oldHref);
      oldHref = document.location.href;
    }
  });

  handleRouteChange();
}

window.onload = init;

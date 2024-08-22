const callback = [];

async function handleRouteChange(oldHref) {
  const searchDetailPattern = /^https:\/\/www\.musinsa\.com\/search\/goods(\?.*)?$/;
  const brandUrlPattern = /^https:\/\/www\.musinsa\.com\/brand\/.*(\?.*)?$/;
  if (oldHref && oldHref === document.location.href) return;
  if (searchDetailPattern.test(document.location.href)) {
    await initSearchDetailPage();
    return;
  }
  if (brandUrlPattern.test(document.location.href)) {
    await initBrandPage();
    return;
  }
  location.href.includes('category') && (await initCategoryPage());
}

async function init() {
  let oldHref = document.location.href;
  const body = document.querySelector('body');

  document.head.appendChild(style);

  const observer = new MutationObserver(async (mutations) => {
    if (oldHref === document.location.href) return;
    handleRouteChange(oldHref);
    oldHref = document.location.href;
  });

  observer.observe(body, { childList: true, subtree: true });

  window.addEventListener('popstate', () => {
    if (oldHref !== document.location.href) {
      handleRouteChange(oldHref);
      oldHref = document.location.href;
    }
  });
  handleRouteChange();
}

window.onload = init;

const callback = [];

async function handleRouteChange(oldHref) {
  // 상세 검색
  const searchDetailPattern = /^https:\/\/www\.musinsa\.com\/search\/musinsa\/goods(\?.*)?$/;
  // 검색 결과
  const categoriesPattern = /^https:\/\/www\.musinsa\.com\/categories(\?.*)?$/;

  if (searchDetailPattern.test(location.href)) {
    window.location.reload();
    return;
  } else if (categoriesPattern.test(location.href)) {
    window.location.reload();
    return;
  }
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

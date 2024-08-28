function setSearchFilters() {
  const baseUrl = new URL('https://api.musinsa.com/api2/dp/v1/plp/goods');
  const query = getQueryParams(window.location.search);
  baseUrl.searchParams.append('caller', 'SEARCH');
  baseUrl.searchParams.append('page', query.page ?? 1);
  baseUrl.searchParams.append('size', window.innerWidth < 1701 ? 80 : 100);
  Object.keys(query).forEach((key) => {
    baseUrl.searchParams.append(key, query[key]);
  });

  return baseUrl;
}

function setCategoryFilters() {
  const baseUrl = new URL('https://api.musinsa.com/api2/dp/v1/plp/goods');
  const query = getQueryParams(window.location.search);
  const category = window.location.href.split('/').at(-1).split('?')[0];
  baseUrl.searchParams.append('category', category);
  baseUrl.searchParams.append('caller', 'CATEGORY');
  baseUrl.searchParams.append('page', query.page ?? 1);
  baseUrl.searchParams.append('size', window.innerWidth < 1701 ? 80 : 100);
  Object.keys(query).forEach((key) => {
    baseUrl.searchParams.append(key, query[key]);
  });

  return baseUrl;
}

function setBrandFilters() {
  const currentUrl = window.location.href;
  if (currentUrl.includes('best')) return setBestBrandFilters();
  else return setBrandFilters2();
}

function setBrandFilters2() {
  const query = getQueryParams(window.location.search);
  const splitUrl = window.location.href.split('/');
  const brandIndex = window.location.href.split('/')?.findIndex((item) => item === 'brand');
  const brand = splitUrl[brandIndex + 1].split('?')[0];
  let baseUrl = new URL(`https://api.musinsa.com/api2/dp/v1/plp/goods`);

  baseUrl.searchParams.append('brand', brand);
  baseUrl.searchParams.append('caller', 'BRAND');
  baseUrl.searchParams.append('page', query.page ?? 1);
  baseUrl.searchParams.append('size', window.innerWidth < 1701 ? 80 : 100);
  Object.keys(query).forEach((key) => {
    if (key === 'categoryCode') {
      baseUrl.searchParams.append('category', query[key]);
      return;
    }
    baseUrl.searchParams.append(key, query[key]);
  });

  return baseUrl;
}

function setBestBrandFilters() {
  const query = getQueryParams(window.location.search);
  const splitUrl = window.location.href.split('/');
  const brandIndex = window.location.href.split('/')?.findIndex((item) => item === 'brand');
  const brand = splitUrl[brandIndex + 1].split('?')[0];

  let baseUrl = new URL(`https://api.musinsa.com/api2/dp/v1/brand/flagship/${brand}/goods/best`);
  baseUrl.searchParams.append('page', query.page ?? 1);
  baseUrl.searchParams.append('size', window.innerWidth < 1701 ? 80 : 100);
  Object.keys(query).forEach((key) => {
    if (key === 'categoryCode') {
      baseUrl.searchParams.append('category', query[key]);
      return;
    }
    if (key === 'sortCode') {
      baseUrl.searchParams.append('period', query[key]);
      return;
    }
    baseUrl.searchParams.append(key, query[key]);
  });

  return baseUrl;
}

function setLikeFilters(filter, { cursor, lastIndex }) {
  const baseUrl = new URL('https://like.musinsa.com/api2/like/like-page/v1/tab/goods');
  baseUrl.searchParams.append('size', window.innerWidth < 1701 ? 80 : 100);
  baseUrl.searchParams.set('isSale', filter?.isSale ?? false);
  baseUrl.searchParams.set('isNotSoldOut', filter?.isNotSoldOut ?? false);
  filter.sort && baseUrl.searchParams.set('sort', filter.sort);
  filter.categoryCode && baseUrl.searchParams.set('categoryCode', filter.categoryCode);
  cursor && baseUrl.searchParams.set('cursor', cursor);
  lastIndex && baseUrl.searchParams.set('lastIndex', lastIndex);

  return baseUrl;
}

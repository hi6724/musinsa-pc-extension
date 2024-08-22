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
  const baseUrl = new URL('https://api.musinsa.com/api2/dp/v1/plp/goods');
  const query = getQueryParams(window.location.search);
  const brand = window.location.href.split('/').at(-1).split('?')[0];
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

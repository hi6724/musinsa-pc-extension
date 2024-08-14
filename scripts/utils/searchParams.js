function setSearchFilters() {
  const query = getQueryParams(window.location.search);
  const baseUrl = new URL('https://search.musinsa.com/api/search/v2/goods?siteKindId=musinsa');

  baseUrl.searchParams.append('keyword', query.q);
  baseUrl.searchParams.append('includeSoldOut', !!query.isChecked);
  baseUrl.searchParams.append('includeUnisex', query.includeUnisex != 0);
  baseUrl.searchParams.append('sort', query.sort ?? 'POPULAR');
  baseUrl.searchParams.append('originalYn', 'N');
  baseUrl.searchParams.append('size', window.innerWidth < 1701 ? 80 : 100);
  baseUrl.searchParams.append('page', query.page ?? 1);
  baseUrl.searchParams.append('sex', query.sex ?? 'A');
  query.sale_goods && baseUrl.searchParams.append('saleGoods', query.sale_goods);
  query.tags && baseUrl.searchParams.append('tags', query.tags);
  query.timeSaleYn && baseUrl.searchParams.append('timeSaleYn', query.timeSaleYn);
  query.plusDeliveryYn && baseUrl.searchParams.append('plusDeliveryYn', query.plusDeliveryYn);
  query.campaignId && baseUrl.searchParams.append('campaignId', query.campaignId);
  query.price && baseUrl.searchParams.append('price', query.price.split(':')[0]);

  query.discountRateCode && baseUrl.searchParams.append('discountRateCode', query.discountRateCode);

  if (query.category1) baseUrl.searchParams.append('category1DepthCode', parseAndJoinIDs(query.category1));
  if (query.category2) baseUrl.searchParams.append('category2DepthCodes', parseAndJoinIDs(query.category2));
  if (query.brand) {
    const brands = query.brand.split(',').map((brand) => brand.split(':')[0]);
    baseUrl.searchParams.append('brandIds', brands.join(','));
  }
  if (query.reSearch) {
    const includeKeywords = [];
    const excludeKeywords = [];
    query.reSearch
      .split('search')
      .slice(1)
      .forEach((el) => {
        const key = el.split(':')[1];
        const value = el.split(':')[2] === 'true';
        value ? includeKeywords.push(key) : excludeKeywords.push(key);
      });
    baseUrl.searchParams.append('includeKeywords', includeKeywords.join(','));
    baseUrl.searchParams.append('excludeKeywords', excludeKeywords.join(','));
  }
  if (query.goodsAttributes) {
    const goodsAttributes = query.goodsAttributes
      .split(',')
      .map((el) => el.split(':')[0])
      .join(',');
    baseUrl.searchParams.append('goodsAttributes', goodsAttributes);
  }
  return baseUrl;
}

function setCategoryFilters() {
  const baseUrl = new URL('https://display.musinsa.com/display/api/v2/categories/ITEM/goods?siteKindId=musinsa');
  const query = getQueryParams(window.location.search);
  const categoryCode = window.location.href.split('/').at(-1).split('?')[0];
  baseUrl.searchParams.append('categoryCode', categoryCode);
  baseUrl.searchParams.append('sortCode', query.sortCode ?? 'pop_category');
  query.sale_goods && baseUrl.searchParams.append('saleGoods', query.sale_goods);
  query.tags && baseUrl.searchParams.append('tags', query.tags);
  query.price1 && baseUrl.searchParams.append('startPrice', query.price1);
  query.price2 && baseUrl.searchParams.append('endPrice', query.price2);
  query.discountRateCode && baseUrl.searchParams.append('discountRateCode', query.discountRateCode);
  query.includeKeywords && baseUrl.searchParams.append('includeKeywords', query.includeKeywords);
  query.excludeKeywords && baseUrl.searchParams.append('excludeKeywords', query.excludeKeywords);
  query.goodsAttributes && baseUrl.searchParams.append('goodsAttributes', query.goodsAttributes);
  query.campaign_id && baseUrl.searchParams.append('campaignId', query.campaign_id);
  query.sale_goods && baseUrl.searchParams.append('saleGoods', query.sale_goods);
  query.timesale_yn && baseUrl.searchParams.append('timeSale', query.timesale_yn === 'Y');
  query.exclusive_yn && baseUrl.searchParams.append('exclusiveYn', query.exclusive_yn);
  query.plusDeliveryYn && baseUrl.searchParams.append('plusDeliveryYn', query.plusDeliveryYn);
  query.ex_soldout && baseUrl.searchParams.append('includeSoldOut', query.ex_soldout === 'Y');

  baseUrl.searchParams.append('page', query.page ?? 1);
  baseUrl.searchParams.append('sex', query.sex ?? 'A');
  baseUrl.searchParams.append('size', window.innerWidth < 1701 ? 80 : 100);

  if (query.brand) {
    const brands = query.brand.split(',').map((brand) => brand.split(':')[0]);
    baseUrl.searchParams.append('brands', brands.join(','));
  }
  return baseUrl;
}

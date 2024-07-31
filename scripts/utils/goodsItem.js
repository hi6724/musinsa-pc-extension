function goodsItemTemplate({
  ad,
  areaCode,
  badgeColor,
  badgeTitle,
  brand,
  brandEnglishName,
  brandLinkUrl,
  brandName,
  celebSubject,
  clickTrackers,
  comingSoonDateFormat,
  couponDiscountPrice,
  couponPrice,
  deliveryDateFormat,
  deliveryDueDay,
  deliveryDuePeriod,
  deliveryDueType,
  deliveryText,
  displaySexCodeList,
  estCount,
  estCountForMobile,
  exclusiveType,
  familySaleEndDate,
  familySaleStartDate,
  giftCount,
  goodsEnglishName,
  goodsEst,
  goodsName,
  goodsNo,
  goodsSubNo,
  headDescription,
  imageIndex,
  imageResolution,
  imageResolutionUrl,
  imageUrl,
  imageUrlByPC,
  impressionTrackers,
  isBoutique,
  isBoutiqueDirectBuying,
  isClearance,
  isComingSoon,
  isContainsReviewEvent,
  isExclusive,
  isFamilySale,
  isFamilySaleDate,
  isLimitedCoupon,
  isNewBadge,
  isOptionLayer,
  isPause,
  isPreviousExclusiveDate,
  isRaffle,
  isSale,
  isSellDate,
  isSoldOut,
  isSpecialtyBoutique,
  isSpecialtyOutlet,
  isStopDate,
  isTimeSale,
  isUsed,
  likeCount,
  linkUrl,
  name,
  nameForPC,
  normalPrice,
  parallelImportYn,
  periodSaleType,
  plusDelivery,
  price,
  registDate,
  registDateFormat,
  reviewScore,
  saleCampaign,
  saleIndex,
  saleRate,
  saleStatCl,
  score,
  sellEndDate,
  specialtyCodes,
  specialtyEarth,
  stopEndDate,
  stopStartDate,
  timeSaleText,
  isLiked,
}) {
  const goodsLabelHTML = () => {
    const label = saleCampaign?.badgeName;
    const code = saleCampaign?.badgeClassName;
    if (!!label && !!code)
      return `
          <span class="category__sc-1s8gukf-1 exQRko">${label}</span>
            `;
    if (isClearance)
      return `
          <span class="category__sc-1s8gukf-1 eYFSUC">클리어런스</span>
            `;
    if (exclusiveType === 'M')
      return `
          <span class="category__sc-1s8gukf-1 jHeJSW">단독</span>
            `;
    if (exclusiveType === 'L')
      return `
          <span class="category__sc-1s8gukf-1 izwcIO">한정</span>
            `;
    if (specialtyCodes.find((code) => code === 'outlet'))
      return `
          <span class="category__sc-1s8gukf-1 gRjmdd">아울렛</span>
            `;
    return '';
  };

  return `
<div
      class="sc-1yenj15-0 cQwYpo"
      data-gtm-cd-18="상품"
      data-gtm-cd-20="/search/results/goods"
      data-gtm-cd-22="1"
      data-goodsno=${`${goodsNo}`}
      data-price=${`${normalPrice}`}
      data-brand=${`${brand}`}
      data-position="1"
      data-visible-gtm-action="Impressions"
      data-visible-gtm-label="Impression View"
      data-gtm-category="Ecommerce"
      data-gtm-label="Impression Click"
      data-gtm-action="click"
      data-dimension17="35"
      data-dimension18="상품"
      data-dimension30=""
      data-dimension31="cateogry_synonym_20240429"
      data-dimension46="cateogry_synonym_20240429."
      data-dimension51="segmentId|null|score|0"
      data-bh="impression,click"
      data-bh-system-tags="searchResult"
      data-bh-action-type="clk"
      data-bh-position1="6"
      data-bh-area="goods_list"
      data-bh-content-type="goods"
      data-bh-content-no=${`${goodsNo}`}
      data-bh-content-nm=${`${goodsName}`}
      data-bh-content-meta1=""
      data-bh-content-meta2=${`${normalPrice}`}
      data-bh-content-meta3=${`${price}`}
      data-bh-content-meta4=${`${brand}`}
      data-bh-content-meta5="35"
      data-bh-position2="1"
      data-bh-custom-keyword="반팔"
      data-bh-custom-exp-id="cateogry_synonym_20240429"
      data-bh-custom-exp-variant=""
      data-bh-custom-sort-code="POPULAR"
      data-bh-custom-page-no="1"
      data-bh-custom-rows="60"
      data-bh-custom-score="0"
      data-bh-custom-total-count="130285"
      data-bh-custom-selected-filter="false"
      data-bh-custom-sale-goods="true"
      data-bh-custom-view-type="grid-style"
      data-bh-custom-inflow-type=""
    >
      <div class="sc-1yenj15-5 cUsBto">
        <figure class="sc-1yenj15-6 jjEnQY">
          <a
            class="sc-1yenj15-7 hfwzOs"
            href=${`${linkUrl}`}
            title={${`${brandName} ${name} 자세히 보기`}}
          ></a>
          <img
            class="sc-1yenj15-8 lbDazZ"
            src=${`${imageUrl}`}
            id=${`thumb_${goodsNo}`}
            alt=${`${brandName} - ${name}`}
          />
        </figure>
        <button
          class="sc-1q5dvtp-2 fFCKiq gtm-catch-click"
          data-gtm-cd-19="button"
          data-gtm-cd-20="/search/results/goods"
          data-gtm-cd-21="6"
          data-gtm-cd-23="goods_list"
          data-gtm-category="goods_list"
          data-gtm-label=${`${goodsNo}`}
          data-gtm-action="like_ok"
          aria-label="좋아요 버튼"
        >

        ${
          isLiked
            ? `<svg class="sc-1q5dvtp-0 epynNi" width="1em" height="1em" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ff0000" ><path d="M24.1159 7.60884C21.9708 5.46372 18.4929 5.46372 16.3477 7.60884L16 7.95658L14.9765 8.98003L13.6523 7.65578C11.5072 5.51066 8.02923 5.51065 5.88411 7.65578C3.73899 9.8009 3.73899 13.2788 5.88411 15.424L14.9991 24.539L18.5247 21.0134C18.6733 20.8647 18.8126 20.7102 18.9424 20.5505L24.1159 15.377C26.261 13.2319 26.261 9.75397 24.1159 7.60884Z" stroke="currentColor" vector-effect="non-scaling-stroke"></path></svg>`
            : `<svg width="1em" height="1em" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff" class="sc-1q5dvtp-1 coxGQm"><path d="M24.1159 7.60884C21.9708 5.46372 18.4929 5.46372 16.3477 7.60884L16 7.95658L14.9765 8.98003L13.6523 7.65578C11.5072 5.51066 8.02923 5.51065 5.88411 7.65578C3.73899 9.8009 3.73899 13.2788 5.88411 15.424L14.9991 24.539L18.5247 21.0134C18.6733 20.8647 18.8126 20.7102 18.9424 20.5505L24.1159 15.377C26.261 13.2319 26.261 9.75397 24.1159 7.60884Z" stroke="currentColor" vector-effect="non-scaling-stroke"></path></svg>`
        }




        </button>
        <div class="sc-1i2vuxr-0 elMbxN">
        ${goodsLabelHTML()}
        </div>
      </div>
      <div aria-labelledby=${`thumb|${goodsNo}`} class="sc-1yenj15-9 cZTsNj">
        <div class="sc-1yenj15-10 eQiJaN">
          <a
            href={brandLinkUrl}
            title=${`${brandName} 샵으로 이동`}
            class="sc-1yenj15-11 sssfK gtm-catch-click"
            data-gtm-cd-19="button"
            data-gtm-cd-20="/search/results/goods"
            data-gtm-cd-21="6"
            data-gtm-cd-23="goods_list"
            data-gtm-category="goods_list"
            data-gtm-label=${`브랜드숍|${brandName}`}
            data-gtm-action="click"
          >
            ${brandName}
          </a>
        </div>
        <a
          class="sc-1yenj15-12 jSDLVt"
          href=${linkUrl}
          title=${`${name}`}
        >
          ${name}
        </a>
        <div class="sc-1dubb4w-0 MfYCC">
          <div class="sc-1dubb4w-1 hyOijH">
            <div class="sc-1dubb4w-2 bRDKCR">
              <div class="sc-1dubb4w-4 focAYn">
                <strong aria-label="판매가격" class="sc-1dubb4w-5 hNcpVo">
                  ${price.toLocaleString()}원
                </strong>
              </div>
              ${
                saleRate > 0
                  ? `<del aria-label="정상가격" class="sc-1dubb4w-6 foOQTl">
                ${normalPrice.toLocaleString()}원
              </del>`
                  : ''
              }
            </div>
            ${
              saleRate > 0
                ? `<strong aria-label="할인율" class="sc-1dubb4w-9 kNvOLb">
              ${saleRate}%
            </strong>`
                : ''
            }
          </div>
        </div>
        <div class="sc-1yenj15-13 fLHaZn">
          <div class="sc-1yenj15-14 fMxheJ">
            <svg width="14px" height="14px" viewBox="0 0 14 14" version="1.1">
              <title>좋아요 수</title>
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <path
                  d="M11.375,3.375 C12.4105339,4.41053391 12.4105339,6.08946609 11.375,7.125 L7,11.5 L2.625,7.125 C1.58946609,6.08946609 1.58946609,4.41053391 2.625,3.375 C3.66053391,2.33946609 5.33946609,2.33946609 6.375,3.375 L6.375,3.375 L6.99934957,3.99934957 L7.625,3.375 C8.66053391,2.33946609 10.3394661,2.33946609 11.375,3.375 Z"
                  fill="red"
                ></path>
              </g>
            </svg>
            ${formatNumber(likeCount)}
          </div>
          <div class="sc-4644zb-0 iayrRM">
            <div class="sc-4644zb-1 jUfkht">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                class="sc-4644zb-2 cJTMUe"
              >
                <title>평가수</title>
                <path
                  fill="#FF923A"
                  fillRule="evenodd"
                  d="M7 10.278L3.292 12.4 4.24 8.345 1 5.602 5.294 5.218 7 1.4 8.706 5.218 13 5.602 9.76 8.345 10.708 12.4z"
                ></path>
              </svg>
            </div>
            ${formatNumber(estCount)}
          </div>
        </div>
      </div>
    </div>
  `;
}

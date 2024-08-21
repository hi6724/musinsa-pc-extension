function categoryItemTemplate({
  goodsNo,
  goodsName,
  goodsLinkUrl,
  thumbnail,
  displayGenderText,
  isSoldOut,
  normalPrice,
  price,
  saleRate,
  brand,
  brandName,
  brandLinkUrl,
  reviewCount,
  reviewScore,
  isOptionVisible,
  isAd,
  infoLabelList,
  imageLabelList,
  clickTrackers,
  impressionTrackers,
  snap,
  likeCount,
  isLiked,
}) {
  const goodsLabelHTML = infoLabelList
    .map((data) => {
      const { code, title, color } = data;
      return `<span
              class="inline text-etc_11px_reg py-[1px] px-1 rounded-sm h-4 text-white bg-gray-500 bg-opacity-10 sc-fHjqbK kknBSr"
              title=${`${code}`}
            >
              <span class="text-etc_11px_reg text-gray-600 font-pretendard">${`${title}`}</span>
            </span>`;
    })
    .join('');

  return `
    <div class="sc-fUnNpA iCowMw">
      <div class="sc-hzhKNl lmHEaa">
        <div class="sc-eDPFhE gKpBep">
          <a
            href="https://www.musinsa.com/app/goods/4238600"
            target="_blank"
            rel="noreferrer"
            aria-label="상품 상세로 이동"
            class="sc-eldOKa eYuOFs gtm-view-item-list gtm-select-item"
            data-item-id=${`${goodsNo}`}
            data-price=${`${price}`}
            data-original-price=${`${normalPrice}`}
            data-item-brand=${`${brandName}`}
            data-quantity="1"
            data-item-category="(not set)"
            data-discount=${`${normalPrice - price}`}
            data-discount-rate=${`${saleRate}`}
            data-item-list-id="plp_goods"
            data-item-list-index="3"
            data-section-name="plp_goods"
            data-section-index="5"
            data-index="(not set)"
            data-brand-id=${`${brandName}`}
            data-item-applied-filter-group-1="(not set)"
            data-item-applied-filter-group-2="(not set)"
            data-gtm-vis-recent-on-screen126662172_123="8824"
            data-gtm-vis-first-on-screen126662172_123="8824"
            data-gtm-vis-total-visible-time126662172_123="2500"
            data-gtm-vis-recent-on-screen126662172_1962="8824"
            data-gtm-vis-first-on-screen126662172_1962="8824"
            data-gtm-vis-total-visible-time126662172_1962="2500"
            data-gtm-vis-has-fired126662172_123="1"
            data-gtm-vis-has-fired126662172_1962="1"
          >
            <div class="relative z-5 inline-flex items-center justify-center w-full h-full before:absolute before:inset-0 before:size-full before:z-5 before:overflow-hidden min-w-8 min-h-[38px] before:bg-black/[2%] aspect-[5/6] overflow-hidden">
              <img
                class="max-w-full w-full absolute m-auto inset-0 h-auto z-0 visible object-cover"
                alt=${`${goodsName}`}
                aria-hidden="true"
                src=${`${thumbnail}`}
                loading="lazy"
                fetchpriority="auto"
              />
            </div>
          </a>
      <button class="sc-cPiJYC eDZaif sc-ikkyvV ioTNa-d my-like-btn ${isLiked ? 'liked' : ''}" aria-label="좋아요 버튼">
            <div class="inline-flex" style="transform: none;">
              <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class=""><path d="M9.80392 16.3294C9.91639 16.4275 10.0836 16.4275 10.1961 16.3294C11.0801 15.5587 14.7183 12.3692 16.25 10.75C16.9 10 17.5 9 17.5 7.5C17.5 5.25 16 3.5 13.75 3.5C11.85 3.5 10.8 4.65 10 6C9.2 4.65 8.15 3.5 6.25 3.5C4 3.5 2.5 5.25 2.5 7.5C2.5 9 3.1 10 3.75 10.75C5.28165 12.3692 8.91988 15.5587 9.80392 16.3294Z" stroke-miterlimit="10" fill-opacity="1" fill="" stroke="" class="stroke-red fill-red" vector-effect="non-scaling-stroke"></path></svg>

              <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class=""><path d="M9.80392 16.3294C9.91639 16.4275 10.0836 16.4275 10.1961 16.3294C11.0801 15.5587 14.7183 12.3692 16.25 10.75C16.9 10 17.5 9 17.5 7.5C17.5 5.25 16 3.5 13.75 3.5C11.85 3.5 10.8 4.65 10 6C9.2 4.65 8.15 3.5 6.25 3.5C4 3.5 2.5 5.25 2.5 7.5C2.5 9 3.1 10 3.75 10.75C5.28165 12.3692 8.91988 15.5587 9.80392 16.3294Z" stroke-miterlimit="10" fill-opacity="0.3" fill="" stroke="" class="stroke-white fill-gray-500" vector-effect="non-scaling-stroke"></path></svg>
            </div>
          </button>

        </div>
      </div>
      <div class="sc-bmzXxz kxGyUM">
        <div class="sc-iHGNiK buEwob">
          <div class="sc-dtBeHJ iFyEFD">
            <a
              href=${`${brandLinkUrl}`}
              target="_blank"
              rel="noreferrer"
              aria-label="브랜드로 이동"
            >
              <span class="text-body_13px_semi sc-dcJtft sc-iGgVNO jEEFmT laXDWb font-pretendard">
                ${`${brandName}`}
              </span>
            </a>
            <a
              href=${`${goodsLinkUrl}`}
              target="_blank"
              rel="noreferrer"
              class="gtm-select-item"
              data-item-id=${`${goodsNo}`}
              data-price=${`${price}`}
              data-original-price=${`${normalPrice}`}
              data-item-brand=${`${brand}`}
              data-quantity="1"
              data-item-category="(not set)"
              data-discount=${`${normalPrice - price}`}
              data-discount-rate=${`${saleRate}`}
              data-item-list-id="plp_goods"
              data-item-list-index="3"
              data-section-name="plp_goods"
              data-section-index="5"
              data-index="(not set)"
              data-brand-id=${`${brandName}`}
              data-item-applied-filter-group-1="(not set)"
              data-item-applied-filter-group-2="(not set)"
            >
              <span class="text-body_13px_reg sc-dcJtft sc-gsFSjX jEEFmT ecuaTR font-pretendard">
                ${`${goodsName}`}
              </span>
            </a>
            <div class="sc-gEvDqW sc-eqUzNf hXonC kyQaBg">
              ${
                saleRate > 0
                  ? `<span class="text-body_13px_semi sc-fqkwJk ioeSYE text-red font-pretendard">${`${saleRate}`}%</span>`
                  : ''
              }
              <span class="text-body_13px_semi sc-fqkwJk ioeSYE font-pretendard">${`${price.toLocaleString()}`}원</span>
            </div>
          </div>

  <div class='sc-jXbVAB fhQyNH'>
      <div class='sc-dhKdPU dYtGx'>
        <svg
          width='100%'
          height='100%'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          class='sc-dAlxHm bxEqYu'
        >
          <path
            d='M9.80392 16.3294C9.91639 16.4275 10.0836 16.4275 10.1961 16.3294C11.0801 15.5587 14.7183 12.3692 16.25 10.75C16.9 10 17.5 9 17.5 7.5C17.5 5.25 16 3.5 13.75 3.5C11.85 3.5 10.8 4.65 10 6C9.2 4.65 8.15 3.5 6.25 3.5C4 3.5 2.5 5.25 2.5 7.5C2.5 9 3.1 10 3.75 10.75C5.28165 12.3692 8.91988 15.5587 9.80392 16.3294Z'
            stroke-miterlimit='10'
            fill-opacity='1'
            fill=''
            stroke=''
            class='stroke-red fill-red'
            vector-effect='non-scaling-stroke'
          ></path>
        </svg>
        <span class='text-etc_11px_reg text-red font-pretendard'>${`${formatNumber(likeCount)}`}</span>
      </div>
      <div class='sc-dhKdPU dYtGx'>
        <svg
          width='100%'
          height='100%'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          class='sc-jlZhRR fHHKvu'
        >
          <path
            d='M10.2707 1.06689C10.162 0.839265 9.83799 0.839265 9.72928 1.06689L7.16594 6.43467C7.12297 6.52464 7.03812 6.58739 6.9395 6.60211L1.0893 7.4751C0.84556 7.51147 0.747211 7.80993 0.921583 7.98408L5.14053 12.1976C5.20921 12.2662 5.24046 12.3638 5.2244 12.4595L4.22835 18.3961C4.18708 18.6422 4.44661 18.8281 4.6663 18.71L9.85791 15.9182C9.94663 15.8705 10.0534 15.8705 10.1421 15.9182L15.3337 18.71C15.5534 18.8281 15.8129 18.6422 15.7716 18.3961L14.7756 12.4597C14.7595 12.3639 14.7909 12.2662 14.8596 12.1976L19.0783 7.99024C19.2527 7.81625 19.1547 7.51776 18.911 7.48116L13.0603 6.60223C12.9618 6.58744 12.8771 6.52472 12.8341 6.43484L10.2707 1.06689Z'
            class='fill-yellow'
            vector-effect='non-scaling-stroke'
          ></path>
        </svg>
        <div class='sc-kpDprT jwNDra'>
          <span class='text-etc_11px_reg text-yellow font-pretendard'>${`${(reviewScore / 20).toFixed(1)}`}</span>
          <span class='text-etc_11px_reg text-yellow font-pretendard'>(${`${formatNumber(reviewCount)}`})</span>
        </div>
      </div>
    </div>


          <div class="sc-gEvDqW sc-dtImxT hXonC cvmTLN">
            ${goodsLabelHTML}
          </div>
          <div class="pt-3">
            <div class="relative">
              <div
                class="block sc-hmdnzv kFfvIX gtm-click-button"
                tabindex="0"
                data-index="(not set)"
                data-section-name="plp_goods"
                data-section-index="5"
                data-brand-id="urbandtype"
                data-item-list-id="plp_goods"
                data-item-list-index="3"
                data-item-applied-filter-group-1="(not set)"
                data-item-applied-filter-group-2="(not set)"
                data-button-id="goods_option"
                data-button-name="상품옵션 열기"
              >
                <div style="position: relative;">
                  <div class="flex items-center relative">
                    <button type="button" class="sc-bXCLgj ecbxkW">
                      <span class="text-etc_11px_reg font-normal text-gray-500 font-pretendard">
                        옵션
                      </span>
                      <span class="sc-jsJARu hkbYuP">
                        <svg
                          width="100%"
                          height="100%"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                          class="stroke-black"
                          fill="none"
                        >
                          <path
                            d="M4 8L9.78787 13.7879C9.90503 13.905 10.095 13.905 10.2121 13.7879L16 8"
                            class="stroke-gray-500"
                            vector-effect="non-scaling-stroke"
                          ></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <span class="text-etc_11px_reg absolute top-0 right-0 text-gray-500 font-pretendard">
                남성
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

// <button type="button" class="category__sc-1xj7o0v-2 OvWlJ gtm-catch-click active
// ${isLiked ? 'liked' : ''}"
// data-gtm-action="like.product.cancel" data-gtm-cd-23="PLP_goods" data-gtm-cd-19="button" data-gtm-cd-20="/category" data-gtm-cd-21="3" data-gtm-category="PLP_goods" data-gtm-label="4240536">

//   <svg width="1em" height="1em" viewBox="0 0 30 30" fill="#ff0000" xmlns="http://www.w3.org/2000/svg" color="#ff0000" class="sc-1q5dvtp-0 epynNi"><path d="M24.1159 7.60884C21.9708 5.46372 18.4929 5.46372 16.3477 7.60884L16 7.95658L14.9765 8.98003L13.6523 7.65578C11.5072 5.51066 8.02923 5.51065 5.88411 7.65578C3.73899 9.8009 3.73899 13.2788 5.88411 15.424L14.9991 24.539L18.5247 21.0134C18.6733 20.8647 18.8126 20.7102 18.9424 20.5505L24.1159 15.377C26.261 13.2319 26.261 9.75397 24.1159 7.60884Z" stroke="currentColor" vector-effect="non-scaling-stroke"></path></svg>

// <svg width="1em" height="1em" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff" class="category__sc-1xj7o0v-1 eGmYVg"><path d="M24.1159 7.60884C21.9708 5.46372 18.4929 5.46372 16.3477 7.60884L16 7.95658L14.9765 8.98003L13.6523 7.65578C11.5072 5.51066 8.02923 5.51065 5.88411 7.65578C3.73899 9.8009 3.73899 13.2788 5.88411 15.424L14.9991 24.539L18.5247 21.0134C18.6733 20.8647 18.8126 20.7102 18.9424 20.5505L24.1159 15.377C26.261 13.2319 26.261 9.75397 24.1159 7.60884Z" stroke="currentColor" vector-effect="non-scaling-stroke"></path></svg>
// </button>

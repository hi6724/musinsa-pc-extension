function goodsItemTemplate({
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
  infoLabelList,
  imageLabelList,
  likeCount,
  isLiked,
  ranking,
  isOptionVisible,
  isAd,
  clickTrackers,
  impressionTrackers,
  snap,
}) {
  const goodsLabelHTML = infoLabelList
    ?.map((data) => {
      const { code, title, color } = data;
      return `<span
                class='inline text-etc_11px_reg py-[1px] px-1 rounded-sm h-4 text-white bg-gray-500 bg-opacity-10 sc-bBkKde jbyWrG'
                title=${`${code}`}
              >
                <span class='text-etc_11px_reg text-gray-600 font-pretendard'>${`${title}`}</span>
              </span>`;
    })
    .join('');
  const imageLabelHTML = imageLabelList
    ?.map((data) => {
      const { code, title, color } = data;
      return `<div class="sc-guDLey sc-ifyrAs jlrYiO jlRRYg"><span class="inline text-etc_11px_reg py-[1px] px-1 rounded-sm h-4 text-white bg-transparent sc-gYrqIg cMBWCJ" title=${`${code}`}><span class="text-etc_11px_reg sc-cCzLxZ hhGZPH font-pretendard">${`${title}`}</span></span></div>`;
    })
    .join('');

  return `
    <div class='sc-x7dw99-1 ghYdjv'>
      <div class='sc-khjJXk bQrEVy'>
        <div class='sc-fLseNd ikaYtH'>
          <div class='sc-fmKFGs fObkCV'>
            <a
              href=${`${goodsLinkUrl}`}
              target='_blank'
              rel='noreferrer'
              aria-label='상품 상세로 이동'
              class='sc-fHejqy iqtthR gtm-view-item-list gtm-select-item'
              data-item-id=${`${goodsNo}`}
              data-price=${`${price}`}
              data-original-price=${`${normalPrice}`}
              data-item-brand=${`${brandName}`}
              data-quantity='1'
              data-item-category='(not set)'
              data-discount=${`${normalPrice - price}`}
              data-discount-rate=${`${saleRate}`}
              data-item-list-id='goods_list'
              data-item-list-index='3'
              data-index='3'
              data-section-name='goods_list'
              data-section-index='19'
              data-item-applied-filter-group-1='성별:남성'
              data-item-applied-filter-group-2='(not set)'
              data-gtm-vis-recent-on-screen126662172_123='2867'
              data-gtm-vis-first-on-screen126662172_123='2867'
              data-gtm-vis-total-visible-time126662172_123='2500'
              data-gtm-vis-recent-on-screen126662172_1962='2868'
              data-gtm-vis-first-on-screen126662172_1962='2868'
              data-gtm-vis-total-visible-time126662172_1962='2500'
              data-gtm-vis-has-fired126662172_123='1'
              data-gtm-vis-has-fired126662172_1962='1'
            >
              <div class='relative z-5 inline-flex items-center justify-center w-full h-full before:absolute before:inset-0 before:size-full before:z-5 before:overflow-hidden min-w-8 min-h-[38px] before:bg-black/[2%] aspect-[5/6] overflow-hidden'>
                <img
                  class='max-w-full w-full absolute m-auto inset-0 h-auto z-0 visible object-cover'
                  alt=${`${goodsName}`}
                  aria-hidden='true'
                  src=${`${thumbnail}`}
                  loading='lazy'
                  fetchpriority='auto'
                ></img>
              </div>
              ${isSoldOut ? `<div class="sc-blmEgr jAgSIe"></div>` : ''}
            </a>

        ${imageLabelHTML}

      <button class='sc-ktwOfi guykBd sc-dJGMql iSPiuY my-like-btn ${isLiked ? 'liked' : ''}' aria-label='좋아요 버튼'>
              <div class="inline-flex" style="transform: none;">
                <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class=""><path d="M9.80392 16.3294C9.91639 16.4275 10.0836 16.4275 10.1961 16.3294C11.0801 15.5587 14.7183 12.3692 16.25 10.75C16.9 10 17.5 9 17.5 7.5C17.5 5.25 16 3.5 13.75 3.5C11.85 3.5 10.8 4.65 10 6C9.2 4.65 8.15 3.5 6.25 3.5C4 3.5 2.5 5.25 2.5 7.5C2.5 9 3.1 10 3.75 10.75C5.28165 12.3692 8.91988 15.5587 9.80392 16.3294Z" stroke-miterlimit="10" fill-opacity="1" fill="" stroke="" class="stroke-red fill-red" vector-effect="non-scaling-stroke"></path></svg>

                <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class=""><path d="M9.80392 16.3294C9.91639 16.4275 10.0836 16.4275 10.1961 16.3294C11.0801 15.5587 14.7183 12.3692 16.25 10.75C16.9 10 17.5 9 17.5 7.5C17.5 5.25 16 3.5 13.75 3.5C11.85 3.5 10.8 4.65 10 6C9.2 4.65 8.15 3.5 6.25 3.5C4 3.5 2.5 5.25 2.5 7.5C2.5 9 3.1 10 3.75 10.75C5.28165 12.3692 8.91988 15.5587 9.80392 16.3294Z" stroke-miterlimit="10" fill-opacity="0.3" fill="" stroke="" class="stroke-white fill-gray-500" vector-effect="non-scaling-stroke"></path></svg>
              </div>
            </button>

            ${
              ranking
                ? `<span class="inline text-etc_11px_reg py-[1px] px-1 rounded-sm h-4 text-white bg-white sc-1m4cyao-3 fYDLXM"><span class="text-etc_11px_semibold text-black font-pretendard">${formatNumber(
                    ranking
                  )}</span></span>`
                : ''
            }

          </div>
        </div>
        <div class='sc-eAKtBH edWhwq'>
          <div class='sc-bZHSRq lckcfh'>
            <div class='sc-kMzELR bXGDph'>
              <a
                href=${`${brandLinkUrl}`}
                target='_blank'
                rel='noreferrer'
                aria-label='브랜드로 이동'
              >
                <span class='text-body_13px_semi sc-eDLKkx sc-jTQCzO bnDFEJ cMkxIw font-pretendard'>
                  ${`${brandName}`}
                </span>
              </a>
              <a
                href=${`${goodsLinkUrl}`}
                target='_blank'
                rel='noreferrer'
                class='gtm-select-item'
                data-item-id=${`${goodsNo}`}
                data-price=${`${price}`}
                data-original-price=${`${normalPrice}`}
                data-item-brand=${`${brand}`}
                data-quantity='1'
                data-item-category='(not set)'
                data-discount=${`${price - normalPrice}`}
                data-discount-rate=${`${saleRate}`}
                data-item-list-id='goods_list'
                data-item-list-index='3'
                data-index='3'
                data-section-name='goods_list'
                data-section-index='19'
                data-item-applied-filter-group-1='성별:남성'
                data-item-applied-filter-group-2='(not set)'
              >
                <span class='text-body_13px_reg sc-eDLKkx sc-gLLuof bnDFEJ jtzgBJ font-pretendard'>
                  ${`${goodsName}`}
                </span>
              </a>
              <div class='sc-guDLey sc-dmyCSP jlrYiO tzoUH'>
                ${saleRate > 0 ? `<span class='text-body_13px_semi sc-hLQSwg iXeGsA text-red font-pretendard'>${`${saleRate}`}%</span>` : ''}
                <span class='text-body_13px_semi sc-hLQSwg iXeGsA font-pretendard'>${`${price.toLocaleString()}`}원</span>
              </div>
            </div>
            <div class='sc-qZrbh euUmLF'>
              <div class='sc-jsEeTM dizzij'>
                <svg
                  width='100%'
                  height='100%'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  class='sc-irLvIq bxFGHv'
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
              <div class='sc-jsEeTM dizzij'>
                <svg
                  width='100%'
                  height='100%'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  class='sc-csKJxZ hhGfkp'
                >
                  <path
                    d='M10.2707 1.06689C10.162 0.839265 9.83799 0.839265 9.72928 1.06689L7.16594 6.43467C7.12297 6.52464 7.03812 6.58739 6.9395 6.60211L1.0893 7.4751C0.84556 7.51147 0.747211 7.80993 0.921583 7.98408L5.14053 12.1976C5.20921 12.2662 5.24046 12.3638 5.2244 12.4595L4.22835 18.3961C4.18708 18.6422 4.44661 18.8281 4.6663 18.71L9.85791 15.9182C9.94663 15.8705 10.0534 15.8705 10.1421 15.9182L15.3337 18.71C15.5534 18.8281 15.8129 18.6422 15.7716 18.3961L14.7756 12.4597C14.7595 12.3639 14.7909 12.2662 14.8596 12.1976L19.0783 7.99024C19.2527 7.81625 19.1547 7.51776 18.911 7.48116L13.0603 6.60223C12.9618 6.58744 12.8771 6.52472 12.8341 6.43484L10.2707 1.06689Z'
                    class='fill-yellow'
                    vector-effect='non-scaling-stroke'
                  ></path>
                </svg>
                <div class='sc-kFCroH fyDqTQ'>
              <span class='text-etc_11px_reg text-yellow font-pretendard'>${`${(reviewScore / 20).toFixed(1)}`}</span>
                  <span class='text-etc_11px_reg text-yellow font-pretendard'>(${`${formatNumber(reviewCount)}`})</span>
                </div>
              </div>
            </div>
            <div class='sc-guDLey sc-jIBlqr jlrYiO dWwHhz'>
              ${goodsLabelHTML}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

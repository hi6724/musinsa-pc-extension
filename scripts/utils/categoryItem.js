function categoryItemTemplate({
  goodsNo,
  goodsName,
  linkUrl,
  imageUrl,
  normalPrice,
  price,
  saleRate,
  brandName,
  brandLinkUrl,
  relatedGoodsReviewCount,
  relatedGoodsReviewScore,
  goodsLabel,
  likeCount,
  isLiked,
}) {
  const goodsLabelHTML = goodsLabel
    .map((label) => {
      if (label.code === 'PLUS_DELIVERY')
        return `<span class="category__sc-1s8gukf-1 ihrQlY"><svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="22" height="22" fill="black"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M13.6249 7.43281H6.55387V6H15.0658L15.0646 7.59999L17.371 7.60185L20 10.3228V15.2507H18.6551C18.3465 16.3164 17.3594 17.0959 16.189 17.0959C15.0096 17.0959 14.016 16.304 13.7159 15.2254H11.5856C11.2855 16.3039 10.2921 17.0959 9.11249 17.0959C7.69523 17.0959 6.5464 15.9524 6.5464 14.5424V13.8006H7.98625V14.5424C7.98625 15.1612 8.49052 15.6631 9.11249 15.6631C9.73437 15.6631 10.2386 15.1613 10.2386 14.5424V13.8006H11.483V13.7926H13.6231V8.58908H13.624L13.6249 7.43281ZM15.0629 9.0328V14.5423C15.0629 15.1613 15.5672 15.6631 16.189 15.6631C16.8111 15.6631 17.3152 15.1613 17.3152 14.5423V13.8008H18.5602V10.8999L16.7575 9.03416L15.0629 9.0328ZM5.84808 11.2558V13.6511H4.40823V11.2558H2V9.82294H4.40823V7.42746H5.84808V9.82294H8.25418V11.2558H5.84808Z" fill="white"></path></svg></span>`;
      else if (label.code === 'EXCLUSIVE_LIMIT')
        return `
          <span class="category__sc-1s8gukf-1 TLcQ">${label.badgeShortTitle}</span>
      `;
      else if (label.code === 'EXCLUSIVE_MUSINSA')
        return `
          <span class="category__sc-1s8gukf-1 ccUkok">${label.badgeShortTitle}</span>
      `;
      else if (label.code === 'OUTLET')
        return `
          <span class="category__sc-1s8gukf-1 bLrMfP">${label.badgeShortTitle}</span>
      `;
      else
        return `
          <span class="category__sc-1s8gukf-1 exQRko">${label.badgeShortTitle}</span>
      `;
    })
    .join('');

  return `
    <div
      class='category__sc-rb2kzk-0 irgXw'
      data-goodsno='${goodsNo}'
      data-price='${normalPrice}'
      data-dimension17='${saleRate}'
      data-dimension18='PLP_goods'
      data-brand='${brandName}'
      data-position='1'
      data-gtm-cd-18='PLP_goods'
      data-gtm-cd-20='/category'
      data-gtm-action='impression'
      data-gtm-category='Ecommerce'
      data-visible-gtm-action='Impressions'
      data-visible-gtm-label='Impression View'
      data-gtm-cd-30=''
      data-dimension30=''
      data-gtm-cd-31='dprd_cate_sort_deepfm_v0'
      data-dimension31='dprd_cate_sort_deepfm_v0'
      data-gtm-cd-51='segment|segment_99_N|score|${relatedGoodsReviewScore}'
      data-dimension51='segment|segment_99_N|score|${relatedGoodsReviewScore}'
    >
      <div class='category__sc-rb2kzk-5 hWLdIX'>
        <figure class='category__sc-rb2kzk-6 AENnw'>
          <a
            class='category__sc-rb2kzk-7 ksmIyr'
            href='${linkUrl}'
            title='${brandName}(takeasy) ${goodsName} 자세히 보기'
          ></a>
          <div class='category__sc-rb2kzk-8 dYOBiv'>
            <img
              class='category__sc-rb2kzk-9 eSSKjG'
              id='thumb|${goodsNo}'
              src='${imageUrl}'
              alt='${brandName}(takeasy) ${goodsName}'
            />
          </div>
        </figure>
      <button type="button" class="category__sc-1xj7o0v-2 OvWlJ gtm-catch-click active
      ${isLiked ? 'liked' : ''}"
      data-gtm-action="like.product.cancel" data-gtm-cd-23="PLP_goods" data-gtm-cd-19="button" data-gtm-cd-20="/category" data-gtm-cd-21="3" data-gtm-category="PLP_goods" data-gtm-label="4240536">

        <svg width="1em" height="1em" viewBox="0 0 30 30" fill="#ff0000" xmlns="http://www.w3.org/2000/svg" color="#ff0000" class="sc-1q5dvtp-0 epynNi"><path d="M24.1159 7.60884C21.9708 5.46372 18.4929 5.46372 16.3477 7.60884L16 7.95658L14.9765 8.98003L13.6523 7.65578C11.5072 5.51066 8.02923 5.51065 5.88411 7.65578C3.73899 9.8009 3.73899 13.2788 5.88411 15.424L14.9991 24.539L18.5247 21.0134C18.6733 20.8647 18.8126 20.7102 18.9424 20.5505L24.1159 15.377C26.261 13.2319 26.261 9.75397 24.1159 7.60884Z" stroke="currentColor" vector-effect="non-scaling-stroke"></path></svg>

      <svg width="1em" height="1em" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff" class="category__sc-1xj7o0v-1 eGmYVg"><path d="M24.1159 7.60884C21.9708 5.46372 18.4929 5.46372 16.3477 7.60884L16 7.95658L14.9765 8.98003L13.6523 7.65578C11.5072 5.51066 8.02923 5.51065 5.88411 7.65578C3.73899 9.8009 3.73899 13.2788 5.88411 15.424L14.9991 24.539L18.5247 21.0134C18.6733 20.8647 18.8126 20.7102 18.9424 20.5505L24.1159 15.377C26.261 13.2319 26.261 9.75397 24.1159 7.60884Z" stroke="currentColor" vector-effect="non-scaling-stroke"></path></svg>
      </button>


        <div class="category__sc-1s8gukf-0 giyXT">
          ${goodsLabelHTML}
        </div>
      </div>
      <div aria-labelledby='thumb|${goodsNo}' class='category__sc-rb2kzk-10 cjDxkP'>
        <a
          class='category__sc-rb2kzk-11 kPDCPR'
          title='${brandName} 샵으로 이동'
          href='${brandLinkUrl}'
        >
          ${brandName}
        </a>
        <a
          class='category__sc-rb2kzk-12 gBkfRU'
          title='${goodsName} 상품 상세 보기로 이동'
          href='${linkUrl}'
        >
          ${goodsName}
        </a>
        <div class='category__sc-rb2kzk-13 qViG'>
          <div class='category__sc-79f6w4-0 hoYOuK'>
            <div class='category__sc-79f6w4-1 jnXOfj'>
              <div class='category__sc-79f6w4-2 eDQQUl'>
                <div class='category__sc-79f6w4-4 dPcEFH'>
                  <span aria-label='판매가격' class='category__sc-79f6w4-5 eTRmwC'>
                    ${price.toLocaleString()}원
                  </span>
                </div>
              </div>
              ${
                saleRate > 0
                  ? `<strong aria-label='할인율' class='category__sc-79f6w4-9 jNpLBZ'>
                ${saleRate}%
              </strong>`
                  : ''
              }
            </div>
            ${
              saleRate > 0
                ? `<del aria-label='정상가격' class='category__sc-79f6w4-6 iHtcSg'>
              ${normalPrice.toLocaleString()}원
            </del>`
                : ''
            }
          </div>
          <div class='category__sc-rb2kzk-14 kPhfC'>
            <div class='category__sc-rb2kzk-15 FDcJf'>
              <svg width='14px' height='14px' viewBox='0 0 14 14' version='1.1'>
                <title>좋아요 수</title>
                <g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
                  <path
                    d='M11.375,3.375 C12.4105339,4.41053391 12.4105339,6.08946609 11.375,7.125 L7,11.5 L2.625,7.125 C1.58946609,6.08946609 1.58946609,4.41053391 2.625,3.375 C3.66053391,2.33946609 5.33946609,2.33946609 6.375,3.375 L6.375,3.375 L6.99934957,3.99934957 L7.625,3.375 C8.66053391,2.33946609 10.3394661,2.33946609 11.375,3.375 Z'
                    fill='red'
                  ></path>
                </g>
              </svg>
              ${formatNumber(likeCount)}
            </div>
            <div class='category__sc-10xoa7r-0 crpSRG'>
              <div class='category__sc-10xoa7r-1 ielfuX'>
                <svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14'>
                  <title>평가수</title>
                  <path
                    fill='#FF923A'
                    fill-rule='evenodd'
                    d='M7 10.278L3.292 12.4 4.24 8.345 1 5.602 5.294 5.218 7 1.4 8.706 5.218 13 5.602 9.76 8.345 10.708 12.4z'
                  ></path>
                </svg>
              </div>
${formatNumber(relatedGoodsReviewCount)} / ${(relatedGoodsReviewScore / 20).toFixed(1)}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

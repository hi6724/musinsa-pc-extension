function snapTemplate({
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
  return `
  <article class='bg-white'>
        <div class='relative aspect-[5/6] overflow-hidden flex-none'>
                <button class='sc-ktwOfi guykBd sc-dJGMql iSPiuY my-like-btn ${
                  isLiked ? 'liked' : ''
                }' aria-label='좋아요 버튼'>
              <div class="inline-flex" style="transform: none;">
                <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class=""><path d="M9.80392 16.3294C9.91639 16.4275 10.0836 16.4275 10.1961 16.3294C11.0801 15.5587 14.7183 12.3692 16.25 10.75C16.9 10 17.5 9 17.5 7.5C17.5 5.25 16 3.5 13.75 3.5C11.85 3.5 10.8 4.65 10 6C9.2 4.65 8.15 3.5 6.25 3.5C4 3.5 2.5 5.25 2.5 7.5C2.5 9 3.1 10 3.75 10.75C5.28165 12.3692 8.91988 15.5587 9.80392 16.3294Z" stroke-miterlimit="10" fill-opacity="1" fill="" stroke="" class="stroke-red fill-red" vector-effect="non-scaling-stroke"></path></svg>

                <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class=""><path d="M9.80392 16.3294C9.91639 16.4275 10.0836 16.4275 10.1961 16.3294C11.0801 15.5587 14.7183 12.3692 16.25 10.75C16.9 10 17.5 9 17.5 7.5C17.5 5.25 16 3.5 13.75 3.5C11.85 3.5 10.8 4.65 10 6C9.2 4.65 8.15 3.5 6.25 3.5C4 3.5 2.5 5.25 2.5 7.5C2.5 9 3.1 10 3.75 10.75C5.28165 12.3692 8.91988 15.5587 9.80392 16.3294Z" stroke-miterlimit="10" fill-opacity="0.3" fill="" stroke="" class="stroke-white fill-gray-500" vector-effect="non-scaling-stroke"></path></svg>
              </div>
            </button>

          <a
            href='https://www.musinsa.com/snap/${snap.no}'
            target='_blank'
            rel='noreferrer'
            class='sc-sw0jx-1 QKYKz gtm-click-content'
            data-index='(not set)'
            data-section-name='snap'
            data-section-index='3'
            data-content-id='${goodsNo}'
            data-content-name='[무료반품] LOG 2.0 - L.BEIGE'
            data-brand-id='(not set)'
            data-content-type='snap'
          >
            <div class='relative z-5 inline-flex items-center justify-center w-full h-full before:absolute before:inset-0 before:size-full before:z-5 before:overflow-hidden before:bg-black/[2%] aspect-[5/6] overflow-hidden'>
              <img
                class='max-w-full w-full absolute m-auto inset-0 h-auto z-0 visible object-cover gtm-impression-content'
                aria-hidden='true'
                src='${snap.thumbnail}?w=780'
                data-index='(not set)'
                data-section-name='snap'
                data-section-index='3'
                data-content-id='1247847646846583390'
                data-content-name='[무료반품] LOG 2.0 - L.BEIGE'
                data-brand-id='(not set)'
                data-content-type='snap'
                data-gtm-vis-recent-on-screen126662172_1981='768'
                data-gtm-vis-first-on-screen126662172_1981='768'
                data-gtm-vis-total-visible-time126662172_1981='100'
                data-gtm-vis-has-fired126662172_1981='1'
                data-gtm-vis-recent-on-screen126662172_1986='814'
                data-gtm-vis-first-on-screen126662172_1986='814'
                data-gtm-vis-total-visible-time126662172_1986='100'
                data-gtm-vis-has-fired126662172_1986='1'
                data-gtm-vis-recent-on-screen126662172_293='850'
                data-gtm-vis-first-on-screen126662172_293='850'
                data-gtm-vis-total-visible-time126662172_293='2500'
                data-gtm-vis-recent-on-screen126662172_1792='851'
                data-gtm-vis-first-on-screen126662172_1792='851'
                data-gtm-vis-total-visible-time126662172_1792='2500'
                data-gtm-vis-has-fired126662172_293='1'
                data-gtm-vis-has-fired126662172_1792='1'
              />
            </div>
          </a>
        </div>
      </article>
  `;
}

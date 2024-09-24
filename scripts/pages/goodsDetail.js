function initGoodsDetailPage() {
  const layout = document.querySelector('#commonLayoutContainer');
  const iframe = document.createElement('iframe');
  const productId = location.href.split('/').at(-1);
  let isPhoto = true;

  iframe.src = `https://www.musinsa.com/review/image-gallery/${productId}`;
  iframe.className = 'goodsDetailIframe';

  const iframeHeader = document.createElement('div');
  const toggleButton = document.createElement('div');
  toggleButton.innerHTML = `
  <label class="toggle_switch">
    <input type="checkbox" id="reviewToggle">
    <span class="slider"></span>
  </label>
  <span id="toggleText">
  사진리뷰보기
  </span>
  `;

  toggleButton.className = 'toggleButtonContainer';
  iframeHeader.className = 'goodsDetailIframeHeader';
  iframeHeader.appendChild(toggleButton);

  layout.appendChild(iframe);
  layout.appendChild(iframeHeader);

  const toggleInput = document.querySelector('#reviewToggle');
  const toggleText = document.querySelector('#toggleText');
  toggleInput.addEventListener('change', (e) => {
    if (e.target.checked) {
      toggleText.innerHTML = '전체리뷰보기';
      iframe.src = `https://www.musinsa.com/review/goods/${productId}`;
    } else {
      toggleText.innerHTML = '사진리뷰보기';
      iframe.src = `https://www.musinsa.com/review/image-gallery/${productId}`;
    }
  });
}

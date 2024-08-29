function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function clearCustomComponents() {
  const goodsContainer = document.querySelector('.goods-container');
  const pagination = document.querySelector('.pagination');
  if (goodsContainer) await goodsContainer.remove();
  if (pagination) await pagination.remove();
}

function goodsContainerExists() {
  const goodsContainer = document.querySelector('.goods-container');
  if (goodsContainer) return true;
  return false;
}

function formatNumber(number) {
  if (number < 1000) return number.toString();
  if (number < 10000) return (number / 1000).toFixed(1) + '천+';
  return (number / 10000).toFixed(1) + '만+';
}

function getVirtualItemList() {
  return document.querySelector('div[data-testid="virtuoso-item-list"]');
}

function compareWithoutPage(obj1, obj2) {
  // page 속성을 제외한 객체 복사본 생성
  const filteredObj1 = { ...obj1 };
  const filteredObj2 = { ...obj2 };
  delete filteredObj1.page;
  delete filteredObj2.page;

  // JSON 문자열 비교를 통한 객체 비교
  return JSON.stringify(filteredObj1) === JSON.stringify(filteredObj2);
}

async function fetchUntilEnd(url, options = {}) {
  let nextCursor = null;
  let results = [];

  do {
    // URL에 nextCursor가 있으면 추가
    const fetchUrl = nextCursor ? `${url}?cursor=${nextCursor}` : url;

    try {
      const response = await fetch(fetchUrl, options);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const data = await response.json();

      // 응답 결과를 results 배열에 추가
      results = results.concat(data.items || []);

      // nextCursor 업데이트
      nextCursor = data.nextCursor;
    } catch (error) {
      console.error('Fetch error:', error);
      break; // 오류 발생 시 루프를 중단합니다.
    }
  } while (nextCursor);

  return results;
}

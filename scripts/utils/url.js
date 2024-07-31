function getQueryParams(queryString) {
  const params = new URLSearchParams(queryString);
  const queryParams = {};

  for (const [key, value] of params.entries()) {
    queryParams[key] = value;
  }

  return queryParams;
}

function getSearchParams(queryParams) {
  const params = new URLSearchParams();

  for (const key in queryParams) {
    if (queryParams.hasOwnProperty(key)) {
      params.append(key, queryParams[key]);
    }
  }

  return params;
}

function updateURLWithParams(queryParams) {
  const searchParams = getSearchParams(queryParams);
  const newURL = `${window.location.pathname}?${searchParams.toString()}`;

  // history.pushState를 사용하여 URL을 변경 (페이지 리로드 없음)
  history.pushState(null, '', newURL);
}

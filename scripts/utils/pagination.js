function handlePageClick(event) {
  const q = getQueryParams(window.location.search);
  const page = event.target.dataset.page;
  let newPage = parseInt(q.page ?? 1, 10);
  if (!page) return;
  else if (page === 'prev') newPage = Math.max(1, newPage - 5);
  else if (page === 'next') newPage = Math.min(newPage + 5, event.target.dataset.last);
  else newPage = page;
  q.page = newPage;
  updateURLWithParams(q);
}
function paginationTemplate({ currentPage, lastPage }) {
  // Ensure currentPage is within valid range
  currentPage = Math.max(1, Math.min(currentPage, lastPage));

  // Calculate the start and end page numbers
  let startPage = Math.max(1, currentPage - 4);
  let endPage = Math.min(lastPage, currentPage + 4);

  // Adjust if there are not enough pages on one side
  if (endPage - startPage < 8) {
    if (startPage === 1) {
      endPage = Math.min(lastPage, startPage + 8);
    } else if (endPage === lastPage) {
      startPage = Math.max(1, endPage - 8);
    }
  }

  let pages = '';
  for (let i = startPage; i <= endPage; i++) {
    const isCurrentPage = i === currentPage;
    pages += `<button ${!isCurrentPage && `data-page="${i}"`} ${isCurrentPage && 'disabled'} class="page${
      isCurrentPage ? ' active' : ''
    }">${i}</button>`;
  }

  return `
            <button data-page=prev class="page prev" ${currentPage == 1 && 'disabled'}>prev</button>
            ${pages}
            <button data-page=next data-last=${lastPage} class="page next"
            ${currentPage == lastPage && 'disabled'}>next</button>
    `;
}

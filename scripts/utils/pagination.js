function handlePageClick(event) {
  const q = getQueryParams(window.location.search);
  const page = event.target.dataset.page;
  if (!page) return;
  q.page = page;
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
            <button class="page prev">prev</button>
            ${pages}
            <button class="page next">next</button>
    `;
}

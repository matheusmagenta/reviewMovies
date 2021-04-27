/// TO BE REFACTORED TO MVC PATTERN

////////////////
// PAGINATION //
////////////////
export const createPaginationButtons = function (state) {
  // first page and there are more pages
  if (state.search.currentPage === 1 && state.search.totalPages > 1) {
    return `<button btn-light data-goto="${
      state.search.currentPage + 1
    }" class="btn--inline btn-light pagination__btn--next">
          <span>page ${state.search.currentPage + 1}</span>
        </button>`;
  }
  // last page
  if (state.search.currentPage === state.search.totalPages) {
    return `<button btn-light data-goto="${
      state.search.currentPage - 1
    }" class="btn--inline btn-light pagination__btn--prev">
        <span>page ${state.search.currentPage - 1}</span>
      </button>`;
  }
  // other page
  if (
    state.search.currentPage !== 1 &&
    state.search.currentPage !== state.search.totalPages
  ) {
    return `
      <button btn-light data-goto="${
        state.search.currentPage - 1
      }" class="btn--inline pagination__btn--prev">
        <span>page ${state.search.currentPage - 1}</span>
      </button>
      <button btn-light data-goto="${
        state.search.currentPage + 1
      }" class="btn--inline pagination__btn--next">
      <span>page ${state.search.currentPage + 1}</span>
    </button>`;
  }

  // single page
  return "";
};

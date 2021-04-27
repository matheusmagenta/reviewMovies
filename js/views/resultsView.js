import View from "./View.js";

class ResultsView extends View {
  _parentElement = document.querySelector(".movie-results");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      if (e.target.classList.contains("movie-details")) {
        console.log(e.target.dataset.id);
        handler(e.target.dataset.id);
      }
    });
  }

  _generateMarkup() {
    //console.log(this._data);
    const resultsList = [];
    this._data.results.map((result) => {
      // showing results from current search page
      const div = document.createElement("div");
      div.className = "movie-item";
      div.dataset.id = result.id;
      div.innerHTML = `${
        result.poster_path
          ? `
          <img
            src="https://image.tmdb.org/t/p/w500/${result.poster_path}"
            alt="movie-poster"
            class="movie-poster"
          />
        `
          : `<img src="no-poster.jpg" alt="no poster image"/>`
      }  
    <p class="movie-title">${result.title}</p>
    
    ${result.year ? `<p class="movie-year">${result.year.slice(0, 4)}</p>` : ""}
    <p class="vote-average"></i>${result.vote_average}</p>
    <a class="movie-details" data-id="${result.id}" href="#">see details ></a>
    `;

      resultsList.push(div);
    });
    return resultsList;
  }

  // search header with current page, total pages and total results
  _generateSearchHeader() {
    //console.log("search:", search);
    const dataSearch = document.createElement("div");
    dataSearch.className = "search-header";
    dataSearch.innerHTML = `${this._data.totalResults} movies found |
        page #${this._data.currentPage} of ${this._data.totalPages}`;
    return dataSearch;
  }

  _generatePagination() {
    const pagination = document.createElement("div");
    pagination.className = "search-pagination";
    if (this._data.currentPage === 1 && this._data.totalPages > 1) {
      pagination.innerHTML = `<button btn-light data-goto="${
        this._data.currentPage + 1
      }" class="btn--inline btn-light pagination__btn--next">
            <span>page ${this._data.currentPage + 1}</span>
          </button>`;
      return pagination;
    }
    // last page
    if (this._data.currentPage === this._data.totalPages) {
      pagination.innerHTML = `<button btn-light data-goto="${
        this._data.currentPage - 1
      }" class="btn--inline btn-light pagination__btn--prev">
          <span>page ${this._data.currentPage - 1}</span>
        </button>`;
      return pagination;
    }
    // other page
    if (
      this._data.currentPage !== 1 &&
      this._data.currentPage !== this._data.totalPages
    ) {
      pagination.innerHTML = `
        <button btn-light data-goto="${
          this._data.currentPage - 1
        }" class="btn--inline btn-light pagination__btn--prev">
          <span>page ${this._data.currentPage - 1}</span>
        </button>
        <button data-goto="${
          this._data.currentPage + 1
        }" class="btn--inline btn-light pagination__btn--next">
        <span>page ${this._data.currentPage + 1}</span>
      </button>`;
      return pagination;
    }

    // single page
    return "";
  }
}

export default new ResultsView();

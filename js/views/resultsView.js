import View from "./View.js";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      if (e.target.classList.contains("movie-details")) {
        //console.log(e.target.dataset.id);
        handler(e.target.dataset.id);
      }
    });
  }

  _generateMarkup() {
    //console.log(this._data);
    const resultsList = [];
    this._data.map((result) => {
      // showing results from current search page
      const div = document.createElement("div");
      div.className = `movie-item data-id=${result.id}`;
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
    <a class="movie-details" data-id="${result.id}" href="#">see details</a>
    ${result.year ? `<p class="movie-year">${result.year.slice(0, 4)}</p>` : ""}
    <p class="vote-average">${result.vote_average}</p>
    `;

      resultsList.push(div);
    });
    //console.log(resultsList);
    return resultsList.map((movie) => movie.outerHTML);
  }

  // search header with current page, total pages and total results
  /*  _generateHeader() {
    const dataSearch = document.createElement("div");
    dataSearch.className = "search-header";
    dataSearch.innerHTML = `your search found ${state.search.totalResults} movies |
        showing page #${state.search.currentPage} of ${state.search.totalPages}`;
    mainView.appendChild(dataSearch);
  } */
}

export default new ResultsView();

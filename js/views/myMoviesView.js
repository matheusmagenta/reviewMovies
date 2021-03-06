import View from "./View.js";

class MyMoviesView extends View {
  _parentElement = document.querySelector(".mainView");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      if (e.target.classList.contains("movie-details")) {
        //console.log(e.target.dataset.id);
        handler(e.target.dataset.id);
      }
    });
  }

  /*  addHandlerSearch(handler) {
    this._parentElement.addEventListener("click", function (e) {
      // prevent actual submit
      e.preventDefault();
      handler();
    });
  } */

  _generateMarkup() {
    //console.log(this._data);
    const myMoviesList = [];
    this._data.map((result) => {
      // showing results from myMovies list
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
      ${
        result.year
          ? `<p class="movie-year">${result.year.slice(0, 4)}</p>`
          : ""
      }
      <p class="vote-average">${result.vote_average}</p>
      `;
      myMoviesList.push(div);
    });
    //console.log(myMoviesList);
    return myMoviesList.map((movie) => movie.outerHTML);
  }
}

export default new MyMoviesView();

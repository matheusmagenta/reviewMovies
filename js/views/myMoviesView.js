import View from "./View.js";

class MyMoviesView extends View {
  _parentElement = document.querySelector(".movie-results");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      if (e.target.classList.contains("movie-details")) {
        console.log("e.target", e.target);
        console.log("e.target.dataset.id:", e.target.dataset.id);
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
    this._data.forEach((result) => {
      // showing results from myMovies list
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
              style="transform: scale(0.8)"
            />
          `
          : `<img src="no-poster.jpg" alt="no poster image" style="transform: scale(0.8)"/>`
      }  
      <p class="movie-title">${result.title}</p>
      
      ${
        result.year
          ? `<div class="movie-info"><p class="movie-year">${result.year.slice(
              0,
              4
            )}</p>`
          : ""
      }
      <p class="vote-average"><img class="imdb-logo" src="./imdb-logo.png"> ${
        result.vote_average
      }</p>
      </div>
      <a class="movie-details" data-id="${result.id}" href="#">see details ></a>
      `;
      myMoviesList.push(div);
    });
    return myMoviesList;
  }
}

export default new MyMoviesView();

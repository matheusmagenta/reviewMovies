"use strict";

// example of api request with my api_key
// https://api.themoviedb.org/3/movie/550?api_key=21545d3f8c898a2b27bafd3db0854b12

// reference fetch
// https://javascript.info/fetch

const API_URL = "https://api.themoviedb.org/3/";
const apiKey = "21545d3f8c898a2b27bafd3db0854b12";
const id = "";
const dataRequest = `${API_URL}movie/${560}?api_key=${apiKey}`;

//////////////////////
// STATE MANAGEMENT //
//////////////////////

const state = {
  movie: {},
  search: {
    querySearch: "",
    results: [],
  },
  movieStorage: [],
};

/////////////////
// MOVIE MODEL //
/////////////////

// movie class: represents a movie
class Movie {
  constructor(title, id, year, overview, poster_path, vote_average, review) {
    (this.title = title),
      (this.id = id),
      (this.year = year),
      (this.overview = overview),
      (this.poster_path = poster_path),
      (this.vote_average = vote_average),
      (this.review = review);
  }
}

// selecting elements from the DOM
const mainView = document.querySelector(".mainView");
const body = document.querySelector("body");

//////////////////////////////////
// FUNCTIONS
/////////////////////////////////

// 1. USER SEARCHS FOR A MOVIE
// 1a. user types a keyword on the search form
const inputSearch = document.querySelector("#movie-form");

inputSearch.addEventListener("submit", (e) => {
  // prevent actual submit
  e.preventDefault();

  // get search value
  let querySearch = document.querySelector("#movie-search").value;

  //console.log(querySearch);
  loadResults(querySearch);

  // clear search form
  document.querySelector("#movie-search").value = "";
});

// 1b. using the keyword, get results from api search
const loadResults = async function (querySearch) {
  state.search.querySearch = querySearch;
  state.search.results = []; //clear other results
  let response = await fetch(
    `${API_URL}search/movie?api_key=${apiKey}&query=${state.search.querySearch}`
  );
  // console.log("response: ", response);
  let dataResults = await response.json();
  //console.log("results: ", dataResults.results);

  dataResults.results.forEach((result) => {
    //console.log(result);
    state.search.results.push(
      new Movie(
        result.title,
        result.id,
        result.release_date,
        result.overview,
        result.poster_path,
        result.vote_average
      )
    );
  });
  showResultsView(state);
};

// 1c. after receive data from API, show results on the page
const showResultsView = function (state) {
  clearMainView();
  // parentElement = document.querySelector(".body");

  state.search.results.map((movie) => {
    const div = document.createElement("div");
    div.className = "movie-item";
    div.innerHTML = `
  <img src="https://image.tmdb.org/t/p/w500/${
    movie.poster_path
  }" alt="movie-poster" class="movie-poster">
  <p class="movie-title">${movie.title}</p>
  <a onclick="showMovieView(${movie.id})" href="#">see details</a>
  <p class="movie-year">${movie.year.slice(0, 4)}</p>
  <p class="vote-average">${movie.vote_average}</p>
  `;
    mainView.appendChild(div);
  });
};

////////////////////////////////
// 2. USER CLICKS TO SEE MOVIE DETAILS

// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
// 2a. show data in the view
const showMovieView = async function (id) {
  clearMainView();

  let response = await fetch(
    `${API_URL}movie/${id}?api_key=${apiKey}&language=en-US`
  );
  // console.log("response: ", response);
  let dataResult = await response.json();
  //console.log("dataResults: ", dataResult);

  state.movie = new Movie(
    dataResult.title,
    dataResult.id,
    dataResult.release_date,
    dataResult.overview,
    dataResult.poster_path,
    dataResult.vote_average
  );

  const movieId = state.movie.id;
  // check if the movie is already in the movieStorage
  const isMovieStored = function () {
    // compare id of movie on the view and ids in the storage
    const checkMovieStored = state.movieStorage.filter(
      (movie) => movie.id === dataResult.id
    );
    if (checkMovieStored.length > 0) {
      console.log("movie already in the storage");
      return true;
    } else {
      console.log("movie is not in the storage");
      return false;
    }
  };
  isMovieStored(movieId);

  // show the movie clicked in the view
  const div = document.createElement("div");
  div.className = "movie-details";

  const markupInfo = `
  <img src="https://image.tmdb.org/t/p/w500/${
    state.movie.poster_path
  }" alt="movie-poster" class="movie-poster">
    <p class="movie-title">${state.movie.title}</p>
    <p class="movie-year">${state.movie.year.slice(0, 4)}</p>
    <p class="vote-average">${state.movie.vote_average}</p>
    <p class="overview">
    ${state.movie.overview}
    </p>`;

  const markupRemove =
    '<a href="#" class="btn btn-danger btn-sm remove">remove</a>';

  const markupAdd = `
  <a href="#" class="btn btn-outline-warning btn-md watch-later">watch later list</a>
  <form>
    <div class="form-group">
      <label for="myReview"></label>
      <textarea class="form-control" id="myReview" rows="3" placeholder="write my review"></textarea>
    </div>
    <input type="submit" id="submit-myreview" value="add watched movie" class="btn btn-outline-primary btn-md btn-block add"/>
  </form>`;

  const backButton = `<a href="#" class="btn btn-outline-dark btn-sm btn-back" onclick="showResultsView(state)"> back to results</a>`;

  const markupHandler = `${isMovieStored(movieId) ? markupRemove : markupAdd}`;

  div.innerHTML = markupInfo + markupHandler + backButton;

  mainView.appendChild(div);
};

////////////////
// CLEAR VIEW //
////////////////

// function to clear results
const clearMainView = function () {
  mainView.innerHTML = "";
};
const navBarBrand = document.querySelector(".navbar-brand");
navBarBrand.addEventListener("click", clearMainView);

///////////////////
// MYMOVIES VIEW //
///////////////////

// USER ADDS MOVIE TO MYMOVIES LIST
// adding movie to list mymovies with event propagation
const btnAddMovie = document.querySelector(".mainView");
btnAddMovie.addEventListener("click", function (e) {
  if (e.target.classList.contains("add")) {
    MovieStorage.addMovies(state.movie);
  }
});

// USER REMOVES MOVIE OF MYMOVIES LIST
// remove movie of list mymovies with event propagation
const btnRemoveMovie = document.querySelector(".mainView");
btnRemoveMovie.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove")) {
    MovieStorage.removeMovies(state.movie.id);
  }
});

// showing mymovies list
body.addEventListener("click", function (e) {
  if (e.target.classList.contains("my-movies")) {
    // clearing main view
    clearMainView();

    // getting my-movies list from local storage
    state.movieStorage = MovieStorage.getMovies();

    // iterating over the list and displaying each item
    state.movieStorage.forEach((movie) => {
      const div = document.createElement("div");
      div.className = "movie-item";
      div.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500/${
        movie.poster_path
      }" alt="movie-poster" class="movie-poster">
    <p class="movie-title">${movie.title}</p>
    <a onclick="showMovieView(${movie.id})" href="#">see details</a>
    <p class="movie-year">${movie.year.slice(0, 4)}</p>
    <p class="vote-average">${movie.vote_average}</p>
    `;
      mainView.appendChild(div);
    });
  }
});

///////////////////
// LOCAL STORAGE //
///////////////////

class MovieStorage {
  static getMovies() {
    if (localStorage.getItem("state.movieStorage") === null) {
      state.movieStorage = [];
    } else {
      state.movieStorage = JSON.parse(
        localStorage.getItem("state.movieStorage")
      );
    }
    return state.movieStorage;
  }

  static addMovies(movie) {
    const movieStorage = MovieStorage.getMovies();
    movieStorage.push(movie);
    localStorage.setItem(
      "state.movieStorage",
      JSON.stringify(state.movieStorage)
    );
  }

  static removeMovies(id) {
    const movieStorage = MovieStorage.getMovies();

    movieStorage.forEach((movie, index) => {
      if (movie.id === id) {
        movieStorage.splice(index, 1);
      }
    });

    localStorage.setItem(
      "state.movieStorage",
      JSON.stringify(state.movieStorage)
    );
  }
}

/////////////////////
// STORE MY REVIEW //
/////////////////////

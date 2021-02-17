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
  movieShelf: [],
};

/////////////////
// MOVIE MODEL //
/////////////////

// movie class: represents a movie
class Movie {
  constructor(title, id, year, overview, poster_path, vote_average) {
    (this.title = title),
      (this.id = id),
      (this.year = year),
      (this.overview = overview),
      (this.poster_path = poster_path),
      (this.vote_average = vote_average);
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
  console.log("results: ", dataResults.results);

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
    div.innerHTML = `
  <h1 class="movie-title">${movie.title}</h1>
  <a onclick="showMovieView(${movie.id})" href="#">see details</a>
  <p class="movie-year">${movie.year.slice(0, 4)}</p>
  <p class="vote-average">${movie.vote_average}</p>
  `;
    mainView.appendChild(div);
  });
};

////////////////////////////////
// 2. USER CLICKS TO SEE MOVIE DETAILS

// 2a. show data in the view
const showMovieView = function (id) {
  clearMainView();
  // filter results with id of the movie clicked
  const movie = state.search.results.filter(function (el) {
    return el.id === id;
  });

  //update the state with the movie clicked
  state.movie = movie[0];

  // show the movie clicked in the view
  const div = document.createElement("div");
  div.innerHTML = `
    <h1 class="movie-title">${state.movie.title}</h1>
    <p class="movie-year">${state.movie.year.slice(0, 4)}</p>
    <p class="vote-average">${state.movie.vote_average}</p>
    <p class="overview">
    ${state.movie.overview}
    </p>
    <a href="#" class="btn btn-success btn-sm add">add</a> 
    <form>
    <div class="form-group">
      <label for="myReview">write your own review</label>
      <textarea class="form-control" id="myReview" rows="3"></textarea>
    </div>
    <input
        type="submit"
        id="submit-myreview"
        value="submit myReview"
        class="btn btn-primary btn-block"
      />
    </form>
    <a href="#" class="btn btn-success btn-sm" onclick="showResultsView(state)">back to results</a>
    `;
  mainView.appendChild(div);
};

////////////////
// CLEAR VIEW //
////////////////

// function to clear results
const clearMainView = function () {
  mainView.innerHTML = "";
};

///////////////////
// MYMOVIES VIEW //
///////////////////

// USER ADDS MOVIE TO MYMOVIES LIST

// adding movie to list mymovies with event propagation
const btnAddMovie = document.querySelector(".mainView");
btnAddMovie.addEventListener("click", function (e) {
  if (e.target.classList.contains("add")) {
    state.movieShelf.push(state.movie);
    console.log(state.movieShelf);
  }
});

// showing mymovies list
body.addEventListener("click", function (e) {
  if (e.target.classList.contains("my-movies")) {
    clearMainView();
    //console.log(e.target);
    state.movieShelf.forEach((movie) => {
      const div = document.createElement("div");
      div.innerHTML = `
    <h1 class="movie-title">${movie.title}</h1>
    <a onclick="showMovieView(${movie.id})" href="#">see details</a>
    <p class="movie-year">${movie.year.slice(0, 4)}</p>
    <p class="vote-average">${movie.vote_average}</p>
    `;
      mainView.appendChild(div);
    });
  }
});

// example of api request with my api_key
// https://api.themoviedb.org/3/movie/550?api_key=21545d3f8c898a2b27bafd3db0854b12

// reference fetch
// https://javascript.info/fetch

const API_URL = "https://api.themoviedb.org/3/";
const apiKey = "21545d3f8c898a2b27bafd3db0854b12";
const id = "";
const dataRequest = `${API_URL}movie/${560}?api_key=${apiKey}`;

//console.log(dataRequest);

////////////////
// MOVIE VIEW //
////////////////
const state = {
  movie: {},
  search: {
    querySearch: "",
    results: [],
  },
};

// creates movie object model
const createMovieObject = function (data) {
  const movie = data;
  return {
    title: movie.title,
    id: movie.id,
    year: movie.release_date,
    overview: movie.overview,
    poster_path: movie.poster_path,
    origin_country: movie.origin_country,
    vote_average: movie.vote_average,
  };
};

// function responsible for fetch the movie data from the TMDb api
const getMovie = async function (id) {
  let response = await fetch(`${API_URL}movie/${id}?api_key=${apiKey}`);
  //console.log("response: ", response);
  let data = await response.json();
  //console.log("json: ", data);
  state.movie = createMovieObject(data);
  showMovieView(state);
};

// show data in the view
const showMovieView = function (state) {
  parentElement = document.querySelector(".display");
  clearDisplay();
  const markup = `
      <h1 class="movie-title">${state.movie.title}</h1>
      <p class="movie-year">${state.movie.year.slice(0, 4)}</p>
      <span class="vote-average">${state.movie.vote_average}</span>
      <p class="overview">
      ${state.movie.overview}
      </p>
    `;
  parentElement.insertAdjacentHTML("beforeend", markup);
};

//////////////////
// RESULTS VIEW //
//////////////////

// create results
const createResultObject = function (movie) {
  return {
    title: movie.title,
    id: movie.id,
    year: movie.release_date,
    vote_average: movie.vote_average,
  };
};

// get results
const loadResults = async function (querySearch) {
  state.search.querySearch = querySearch;
  state.search.results = []; //clear other results
  let response = await fetch(
    `${API_URL}search/movie?api_key=${apiKey}&query=${state.search.querySearch}`
  );
  // console.log("response: ", response);
  let dataResults = await response.json();
  //console.log("results: ", dataResults.results);

  dataResults.results.map((result) =>
    state.search.results.push(createResultObject(result))
  );
  showResultsView(state);
};

// show results
const showResultsView = function (state) {
  clearDisplay();
  parentElement = document.querySelector(".display");
  //console.log(state);
  state.search.results.map((movie) => {
    markup = `
  <h1 class="movie-title">${movie.title}</h1>
  <a onclick="getMovie(${movie.id})" href="#">see details</a>
  <p class="movie-year">${movie.year.slice(0, 4)}</p>
  <span class="vote-average">${movie.vote_average}</span>
  `;
    parentElement.insertAdjacentHTML("beforeend", markup);
  });
};

////////////
// SEARCH //
////////////

const inputSearch = document.querySelector("#movie-form");

inputSearch.addEventListener("submit", (e) => {
  // prevent actual submit
  e.preventDefault();

  // get search value
  let querySearch = document.querySelector("#movie-search").value;

  console.log(querySearch);
  loadResults(querySearch);

  // clear search form
  document.querySelector("#movie-search").value = "";
});

///////////
// CLEAR //
///////////

// function to clear results
const clearDisplay = function () {
  const display = document.querySelector(".display");
  display.innerHTML = "";
};

//////////////////////////////////////////
/// TASKS - TO BE DONE
// create model, views and controller (MVC)
// create back button in movie view
// improve data model
// fix submit input
// fix event listeners on button
// implement bookmark - my movies
// implement filters to search or results
// implement stars feature with SLIDER
// implement own review feature
// implement user login auth feature
// sort search results
// sort bookmark results
// search only in bookmark results

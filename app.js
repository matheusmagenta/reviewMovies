const apiKey = "21545d3f8c898a2b27bafd3db0854b12";

// example of api request with my api_key
// https://api.themoviedb.org/3/movie/550?api_key=21545d3f8c898a2b27bafd3db0854b12

// reference fetch
// https://javascript.info/fetch

const API_URL = "https://api.themoviedb.org/3/";
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

const createMovieObject = function (data) {
  const movie = data;
  return {
    title: movie.title,
    id: movie.id,
    year: movie.year,
    overview: movie.overview,
    poster_path: movie.poster_path,
    origin_country: movie.origin_country,
    vote_average: movie.vote_average,
  };
};

// function responsible for fetch the movie data from the TMDb api
async function getMovie() {
  let response = await fetch(`${API_URL}${530}?api_key=${apiKey}`);
  console.log("response: ", response);
  let data = await response.json();
  console.log("json: ", data);
  state.movie = createMovieObject(data);
}

// show data in the view
async function showMovie(state) {
  parentElement = document.querySelector(".movie");
  const markup = `
      <h1 class="movie-title">${state.movie.title}</h1>
      <p class="movie-year">${state.movie.year}</p>
      <p class="movie-country">${state.movie.origin_country}</p>
      <span class="vote-average">${state.movie.vote_average}</span>
      <p class="overview">
      ${state.movie.overview}
      </p>
    `;
  parentElement.insertAdjacentHTML("beforeend", markup);
}

function getValue() {
  const nameValue = document.getElementById(".search").getValue;
  console.log(nameValue);
}

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
const getResults = async function (querySearch) {
  state.search.querySearch = querySearch;
  state.search.results = []; //clear other results
  let response = await fetch(
    `${API_URL}search/movie?api_key=${apiKey}&query=${state.search.querySearch}`
  );
  //console.log("response: ", response);
  let dataResults = await response.json();
  console.log("results: ", dataResults.results);

  dataResults.results.map((result) =>
    state.search.results.push(createResultObject(result))
  );
};

// show results
const showResults = async function (state) {
  parentElement = document.querySelector(".movie");
  console.log(state);
  state.search.results.map((result) => {
    markup = `
  <h1 class="movie-title">${result.title}</h1>
  <p class="movie-year">${result.year.slice(0, 4)}</p>
  <span class="vote-average">${result.vote_average}</span>
  `;
    parentElement.insertAdjacentHTML("beforeend", markup);
  });
};

////////////
// SEARCH //
////////////

const getSearchQuery = async function () {
  // selecting the input element and get its value
  const querySearch = document.getElementById("search").value;
  await getResults(querySearch);
  await showResults(state);
  // displaying the value
  //console.log(querySearch);
};

//let btnSearch = document.querySelector(".search");
//console.log(btnSearch);
//btnSearch.addEventListener("click", getSearchQuery);

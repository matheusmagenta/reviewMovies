import * as model from "./model.js";
import movieView from "./views/movieView.js";
import searchView from "./views/searchView.js";
import { API_URL, API_KEY } from "./config.js";
import resultsView from "./views/resultsView.js";

// example of api request with my api_key
// https://api.themoviedb.org/3/movie/550?api_key=21545d3f8c898a2b27bafd3db0854b12

// reference fetch
// https://javascript.info/fetch

const id = "";

// selecting elements from the DOM
const mainView = document.querySelector(".mainView");
const body = document.querySelector("body");
const searchHeader = document.querySelector(".searchHeader");

// adding handler click
// function addHandlerClick(loadSearchResults) {
/* mainView.addEventListener("click", function (e) {
  const btn = e.target.closest(".btn--inline");
  if (!btn) return;

  const goToPage = +btn.dataset.goto;
  console.log(goToPage);

  model.loadSearchResults(state.search.querySearch, goToPage);
}); */
//}

///////////////////////////////////
// REFACTORING CONTROLLER
//////////////////////////////////

// CONTROLLER - USER CLICKS TO SEE MOVIE DETAILS
// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
// 2a. show data in the view
const controlMovies = async function (id) {
  try {
    // clearMainView();

    // get movie clicked id

    // 1) loading movie
    await model.loadMovie(id);

    // 2) rendering movie
    movieView.render(model.state.movie);
  } catch (err) {
    alert(err);
  }
};

// CONTROLLER - USER SUBMIT A SEARCH
const controlSearchResults = async function () {
  try {
    // 1. get search query
    const query = searchView.getQuery();
    if (!query) return; // without query, guard clause return immediately

    // 2. load search results
    await model.loadSearchResults(query);

    // 3. render search results
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

//////////
// INIT //
//////////
const init = function () {
  movieView.addHandlerRender(controlMovies);
  searchView.addHandlerSearch(controlSearchResults);
  resultsView.addHandlerClick(controlMovies);
};
init();

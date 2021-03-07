import * as model from "./model.js";
import movieView from "./views/movieView.js";
import searchView from "./views/searchView.js";
import { API_URL, API_KEY } from "./config.js";
import resultsView from "./views/resultsView.js";
import myMoviesView from "./views/myMoviesView.js";

// example of api request with my api_key
// https://api.themoviedb.org/3/movie/550?api_key=21545d3f8c898a2b27bafd3db0854b12

// reference fetch
// https://javascript.info/fetch

// selecting elements from the DOM
const mainView = document.querySelector(".mainView");
const body = document.querySelector("body");
const searchHeader = document.querySelector(".searchHeader");

///////////////////////////////////
// REFACTORING CONTROLLER
//////////////////////////////////

// CONTROLLER - USER CLICKS TO SEE MOVIE DETAILS
const controlMovies = async function (id) {
  try {
    //clearMainView();

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
    model.state.search.query = query;
    console.log(model.state);
    // 2. load search results
    await model.loadSearchResults(query);

    // 3. render search results
    //resultsView.render(model.state.search.results);
    resultsView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

///////////////////
// MYMOVIES LIST //
///////////////////

// SHOW MYMOVIES LIST - BUTTON TOP NAVBAR
// NEED TO BE REFACTORED AS FUNCTION OR CLASS
body.addEventListener("click", function (e) {
  if (e.target.classList.contains("my-movies")) {
    // getting my-movies list from local storage
    model.state.movieStorage = MovieStorage.getMovies();

    // showing mymovies list
    myMoviesView.render(model.state.movieStorage);
  }
});

// REMOVE MOVIE OF MYMOVIES LIST
// remove movie of list mymovies with event propagation
body.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove")) {
    MovieStorage.removeMovies(model.state.movie.id);
  }
});

// EDIT/UPDATE REVIEW MYMOVIE
const editMyReview = function (movie) {
  // selecting textarea element
  const textArea = document.querySelector("#myReview");
  const movieToBeEdited = model.state.movieStorage.filter(
    (element) => element.id === movie.id
  )[0];
  const reviewToBeEdited = movieToBeEdited.review;
  console.log("reviewToBeEdited: ", reviewToBeEdited);
  // form with review's old version in the textarea
  textArea.innerHTML = `<form>
      <div class="form-group">
        <label for="myReview"></label>
        <textarea class="form-control" id="myReview" rows="3">${reviewToBeEdited}</textarea>
      </div>
      </form>
      `;
};

// EDIT MOVIE OF MYMOVIES LIST
body.addEventListener("click", function (e) {
  if (e.target.classList.contains("edit")) {
    editMyReview(model.state.movie);
  }
});

//////////////////////////////
// STORING IN MYMOVIES LIST //
//////////////////////////////

// USER ADDS MOVIE TO MYMOVIES LIST + REVIEW
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("save-movie")) {
    // getting written review
    let review = document.querySelector("#myReview.form-control").value;

    //let review = document.querySelector("#myReview").value;
    console.log("review: ", review);

    // check if user wrote review. if not, insert msg
    if (review === "") review = "movie saved without review";

    // update state with review
    model.state.movie.review = review;

    console.log("review to be stored: ", model.state.movie.review);

    // store movie+review in LocalStorage
    MovieStorage.saveMovies(model.state.movie);

    // clear page
    //clearMainView();
  }
});

//////////
// INIT //
//////////
const init = function () {
  movieView.addHandlerRender(controlMovies);
  searchView.addHandlerSearch(controlSearchResults);
  resultsView.addHandlerClick(controlSearchResults);
  myMoviesView.addHandlerClick(controlMovies);
};
init();

///////////////////
// LOCAL STORAGE //
///////////////////

class MovieStorage {
  static getMovies() {
    if (localStorage.getItem("model.state.movieStorage") === null) {
      model.state.movieStorage = [];
    } else {
      model.state.movieStorage = JSON.parse(
        localStorage.getItem("model.state.movieStorage")
      );
    }
    return model.state.movieStorage;
  }

  static removeMovies(id) {
    const movieStorage = MovieStorage.getMovies();

    movieStorage.forEach((movie, index) => {
      if (movie.id === id) {
        movieStorage.splice(index, 1);
      }
    });

    localStorage.setItem(
      "model.state.movieStorage",
      JSON.stringify(model.state.movieStorage)
    );
    console.log("current state movieStorage: ", model.state.movieStorage);
  }

  static saveMovies(movie) {
    const movieStorage = MovieStorage.getMovies();
    console.log("movie saved: ", movie);
    console.log("movieStorage", movieStorage);
    movieStorage.forEach((element, index) => {
      if (element.id == movie.id) {
        console.log("movie already in storage!!");
        movieStorage.splice(index, 1);
      }
    });
    movieStorage.push(movie);
    localStorage.setItem(
      "model.state.movieStorage",
      JSON.stringify(model.state.movieStorage)
    );
    console.log("current state movieStorage: ", model.state.movieStorage);
  }
}

////////////////
// CLEAR VIEW //
////////////////

// function to clear results
const clearMainView = function () {
  if (document.querySelector(".results"))
    document.querySelector(".results").innerHTML = "";
  if (document.querySelector(".movie-details"))
    document.querySelector(".movie-details").innerHTML = "";
};
// clean view clicking brand icon
const navBarBrand = document.querySelector(".navbar-brand");
navBarBrand.addEventListener("click", clearMainView);

////////////////
// PAGINATION //
////////////////

mainView.addEventListener("click", async function (e) {
  // selecting button
  const btn = e.target.closest(".btn--inline");
  if (!btn) return;

  // getting number page
  const goToPage = +btn.dataset.goto;
  // console.log("goToPage: ", goToPage);
  // console.log("model.state.search.query: ", model.state.search.query);

  // getting search results data from that page
  await model.loadSearchResults(model.state.search.query, goToPage);

  // send search results data to view
  resultsView.render(model.state.search);
});

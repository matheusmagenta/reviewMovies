import { API_URL, API_KEY } from "./config.js";
import { getJSON } from "./helpers.js";

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

//////////////////////
// STATE MANAGEMENT //
//////////////////////

export const state = {
  movie: {},
  search: {
    query: "",
    results: [],
    resultsPerPage: 20,
    currentPage: 0,
    totalPages: 0,
    totalResults: 0,
  },
  movieStorage: [],
};

// load movie with details
export const loadMovie = async function (id) {
  try {
    // getting the data from api
    //console.log("loadMovie argument:", id);
    const dataResult = await getJSON(
      `${API_URL}movie/${id}?api_key=${API_KEY}&language=en-US`
    );
    console.log("dataResult: ", dataResult);

    if (!isMovieStored(dataResult)) {
      state.movie = new Movie(
        dataResult.title,
        dataResult.id,
        dataResult.release_date,
        dataResult.overview,
        dataResult.poster_path,
        dataResult.vote_average
      );
    } else {
      state.movie = state.movieStorage.filter(
        (movie) => movie.id === dataResult.id
      )[0];
    }
  } catch (err) {
    // temp error handling
    console.log(err);
    throw err;
  }
};

// load search - using the keyword, get results from api search
export const loadSearchResults = async function (query, currentPage = 1) {
  try {
    //clear other results
    state.search.results = [];

    // getting the data from api
    let dataResults = await getJSON(
      `${API_URL}search/movie?api_key=${API_KEY}&query=${query}&page=${currentPage}`
    );
    //console.log("results: ", dataResults.results);

    // storing current page, total of results and pages from result search
    state.search.currentPage = dataResults.page;
    state.search.totalPages = dataResults.total_pages;
    state.search.totalResults = dataResults.total_results;

    // storing movies to be shown
    dataResults.results.forEach((result) => {
      //console.log(result);
      state.search.results.push(
        new Movie(
          result.title,
          result.id,
          result.release_date,
          result.overview,
          result.poster_path,
          result.vote_average,
          result.page
        )
      );
    });
    // showResultsView(state);
  } catch (err) {
    // temp error handling
    console.log(err);
    throw err;
  }
};

//////////////////////////////
// CHECK IF MOVIE IS STORED //
//////////////////////////////

// check if the movie is already in the movieStorage
export const isMovieStored = function (dataResult) {
  // compare id of movie on the view and ids in the storage
  if (!state.movieStorage) {
    state.movieStorage = [];
  } else {
    state.movieStorage = JSON.parse(
      localStorage.getItem("model.state.movieStorage")
    );
    const compareMovieWithStorage = state.movieStorage.filter(
      (movie) => movie.id === dataResult.id
    );
    if (compareMovieWithStorage.length > 0) {
      console.log(
        "movie already in the storage",
        state.movieStorage.filter((movie) => movie.id === dataResult.id)[0]
      );
      return true;
    } else {
      console.log("movie is not in the storage", dataResult);

      return false;
    }
  }
};

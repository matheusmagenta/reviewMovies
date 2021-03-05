/////////////////////////////////////////////////////////////

/////////////////////
// STORE MY REVIEW //
/////////////////////

// selecting textarea element

const storeMyReview = function (movie) {
  // storing in a variable the textarea value
  const textArea = document.querySelector("textarea");
  const textAreaContent = textArea.value;

  movie.review = textAreaContent;
};

////////////////////
// EDIT MY REVIEW //
////////////////////

const editMyReview = function (movie) {
  // selecting textarea element
  const textArea = document.querySelector("#myReview");
  const movieToBeEdited = state.movieStorage.filter(
    (element) => element.id === movie.id
  )[0];
  const reviewToBeEdited = movieToBeEdited.review;
  console.log("reviewToBeEdited: ", reviewToBeEdited);
  // form with review's old version in the textarea
  textArea.innerHTML = `<form>
      <div class="form-group">
        <label for="myReview"></label>
        <textarea class="form-control" id="myReview" rows="3">${reviewToBeEdited}</textarea>
        <input type="submit" id="submit-myreview" value="save watched movie" class="btn btn-outline-primary btn-md btn-block save-review"/>
      </div>
      </form>`;
};

///////////////////
// MYMOVIES VIEW //
///////////////////

// USER ADDS MOVIE TO MYMOVIES LIST
// adding movie to list mymovies with event propagation
const btnSaveMovie = document.querySelector(".mainView");
btnSaveMovie.addEventListener("click", function (e) {
  if (e.target.classList.contains("save-review")) {
    storeMyReview(state.movie);
    MovieStorage.saveMovies(state.movie);
  }
});

// USER REMOVES MOVIE OF MYMOVIES LIST
// remove movie of list mymovies with event propagation
// !!!!!!!!! NEED TO BE REFACTOR !!!!!!!!!!! TARGETING THE SAME ELEMENT
const btnRemoveMovie = document.querySelector(".mainView");
btnRemoveMovie.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove")) {
    MovieStorage.removeMovies(state.movie.id);
  }
});

// USER EDIT MOVIE OF MYMOVIES LIST
// !!!!!!!!! NEED TO BE REFACTOR !!!!!!!!!!! TARGETING THE SAME ELEMENT
const btnEditMovie = document.querySelector(".mainView");
btnEditMovie.addEventListener("click", function (e) {
  if (e.target.classList.contains("edit")) {
    editMyReview(state.movie);
  }
});

// showing mymovies list
body.addEventListener("click", function (e) {
  if (e.target.classList.contains("my-movies")) {
    // clearing main view
    clearMainView();

    // getting my-movies list from local storage
    model.state.movieStorage = MovieStorage.getMovies();

    // iterating over the list and displaying each item
    model.state.movieStorage.forEach((movie) => {
      const div = document.createElement("div");
      div.className = "movie-item";
      div.innerHTML = `${
        movie.poster_path
          ? `
            <img
              src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
              alt="movie-poster"
              class="movie-poster"
            />
          `
          : `<img src="no-poster.jpg" alt="no poster image"/>`
      }  
      <p class="movie-title">${movie.title}</p>
      <a onclick="controlMovies(${movie.id})" href="#">see details</a>
      ${movie.year ? `<p class="movie-year">${movie.year.slice(0, 4)}</p>` : ""}
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
  }

  static saveMovies(movie) {
    const movieStorage = MovieStorage.getMovies();
    console.log("movie saved: ", movie);
    movieStorage.forEach((element, index) => {
      if (element.id === movie.id) {
        movieStorage.splice(index, 1);
      }
    });
    movieStorage.push(movie);
    localStorage.setItem(
      "model.state.movieStorage",
      JSON.stringify(model.state.movieStorage)
    );
  }
}

////////////////
// CLEAR VIEW //
////////////////

// function to clear results
const clearMainView = function () {
  mainView.innerHTML = "";
};
// clean view clicking brand icon
const navBarBrand = document.querySelector(".navbar-brand");
navBarBrand.addEventListener("click", clearMainView);

//////////////////////////////
// CHECK IF MOVIE IS STORED //
//////////////////////////////

// check if the movie is already in the movieStorage
const isMovieStored = function (dataResult) {
  // compare id of movie on the view and ids in the storage
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
};

///////////////////////////////
// CHECK IF MOVIE HAS REVIEW //
///////////////////////////////
const hasReview = function (movie) {
  if (movie.review) {
    console.log("has review");
    return true;
  } else {
    console.log("has not review");
    return false;
  }
};

////////////////
// PAGINATION //
////////////////
const createPaginationButtons = function (state) {
  // first page and there are more pages
  if (state.search.currentPage === 1 && state.search.totalPages > 1) {
    return `<button data-goto="${
      state.search.currentPage + 1
    }" class="btn--inline pagination__btn--next">
        <span>go to page ${state.search.currentPage + 1}</span>
      </button>`;
  }
  // last page
  if (state.search.currentPage === state.search.totalPages) {
    return `<button data-goto="${
      state.search.currentPage - 1
    }" class="btn--inline pagination__btn--prev">
      <span>go to page ${state.search.currentPage - 1}</span>
    </button>`;
  }
  // other page
  if (
    state.search.currentPage !== 1 &&
    state.search.currentPage !== state.search.totalPages
  ) {
    return `
    <button data-goto="${
      state.search.currentPage - 1
    }" class="btn--inline pagination__btn--prev">
      <span>go to page ${state.search.currentPage - 1}</span>
    </button>
    <button data-goto="${
      state.search.currentPage + 1
    }" class="btn--inline pagination__btn--next">
    <span>go to page ${state.search.currentPage + 1}</span>
  </button>`;
  }

  // single page
  return "";
};

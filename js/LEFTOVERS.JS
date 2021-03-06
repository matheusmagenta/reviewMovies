/////////////////////////////////////////////////////////////

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

const mainView = document.querySelector(".mainView");
// USER ADDS MOVIE TO MYMOVIES LIST
// adding movie to list mymovies with event propagation
mainView.addEventListener("click", function (e) {
  if (e.target.classList.contains("save-review")) {
    storeMyReview(state.movie);
    MovieStorage.saveMovies(state.movie);
  }
});

// USER REMOVES MOVIE OF MYMOVIES LIST
// remove movie of list mymovies with event propagation
mainView.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove")) {
    MovieStorage.removeMovies(state.movie.id);
  }
});

// USER EDIT MOVIE OF MYMOVIES LIST
mainView.addEventListener("click", function (e) {
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

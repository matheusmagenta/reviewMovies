import View from "./View.js";
import * as model from "../model.js";

class MovieView extends View {
  // !!!!! check if _parentElement is the correct one !!!!
  _parentElement = document.querySelector(".mainView");

  addHandlerRender(handler) {
    //window.addEventListener("click", handler);
  }

  _generateMarkup() {
    // show the movie clicked in the view
    const div = document.createElement("div");
    div.className = "movie-details";
    console.log("this data: ", this._data);
    // show movie info
    const markupInfo = `${
      this._data.poster_path
        ? `
      <img
        src="https://image.tmdb.org/t/p/w500/${this._data.poster_path}"
        alt="movie-poster"
        class="movie-poster"
      />
    `
        : `<img src="no-poster.jpg" alt="no poster image"/>`
    }  
    <p class="movie-title">${this._data.title}</p>
    ${
      this._data.year
        ? `<p class="movie-year">${this._data.year.slice(0, 4)}</p>`
        : ""
    } 
    <p class="vote-average">${this._data.vote_average}</p>
    <p class="overview">
    ${this._data.overview}
    </p>`;

    // show remove/edit buttons
    const removeAndEditButton =
      '<a href="#" class="btn btn-danger btn-sm remove">remove</a><a href="#" class="btn btn-warning btn-sm edit">edit</a>';

    const markupReviewForm = `<form>
    <div class="form-group">
      <label for="myReview"></label>
      <textarea class="form-control" id="myReview" rows="3" placeholder="write my review"></textarea>
      <input type="submit" id="submit-myreview" value="save watched movie" class="btn btn-outline-primary btn-md btn-block save-movie"/>
    </div>
    </form>
    `;

    // show write review area or edit review
    const markupReview = `${
      this._hasReview(this._data)
        ? `${removeAndEditButton}<div id='myReview'>${this._data.review}</div><input type="submit" id="submit-myreview" value="save watched movie" class="btn btn-outline-primary btn-md btn-block save-movie"/>`
        : markupReviewForm
    }`;

    // back button
    const backButton = `<a href="#" class="btn btn-outline-dark btn-sm btn-back" onclick="showResultsView(state)"> back to results</a>`;

    // show entire movie profile
    div.innerHTML = markupInfo + markupReview + backButton;
    console.log("div: ", div);
    return div;
  }

  // check if the movie has review
  _hasReview() {
    if (this._data.review) {
      console.log("has review");
      return true;
    } else {
      console.log("has not review");
      return false;
    }
  }

  //////////////////////////////
  // CHECK IF MOVIE IS STORED //
  //////////////////////////////

  // check if the movie is already in the movieStorage
  _isMovieStored() {
    // compare id of movie on the view and ids in the storage
    const compareMovieWithStorage = model.state.movieStorage.filter(
      (movie) => movie.id === this._data.id
    );
    if (compareMovieWithStorage.length > 0) {
      console.log(
        "movie already in the storage",
        model.state.movieStorage.filter(
          (movie) => movie.id === this._data.id
        )[0]
      );
      return true;
    } else {
      console.log("movie is not in the storage", this._data);

      return false;
    }
  }
}

export default new MovieView();

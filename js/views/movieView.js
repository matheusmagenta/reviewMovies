import View from "./View.js";

class MovieView extends View {
  // !!!!! check if _parentElement is the correct one !!!!
  _parentElement = document.querySelector(".mainView");

  // publisher method ---> publisher-subscriber pattern
  /* addHandlerRender(handler) {
    console.log("this parentElement: ", this._parentElement);
    console.log("this data: ", this._data);
    this._parentElement.addEventListener("click", function (e) {
      if (e.target.classList.contains("movie-details")) {
        console.log("this clicked: ", this);
        handler();
      }
    });
  } */

  addHandlerRender(handler) {
    //window.addEventListener("click", handler);
  }

  _generateMarkup() {
    // show the movie clicked in the view
    const div = document.createElement("div");
    div.className = "movie-details";

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

    // show save button, textarea to write review
    const saveButton =
      '<a href="#" class="btn btn-outline-warning btn-md watch-later">watch later list</a>';

    const markupReviewForm = `<form>
    <div class="form-group">
      <label for="myReview"></label>
      <textarea class="form-control" id="myReview" rows="3" placeholder="write my review"></textarea>
      <input type="submit" id="submit-myreview" value="save watched movie" class="btn btn-outline-primary btn-md btn-block save-review"/>
    </div>
  </form>
  ${saveButton}
  `;

    // show write review area or edit review
    /*   const markupReview = `${
      hasReview(this._data)
        ? `${removeAndEditButton}<div id="myReview"><p>${this._data.review}</p></div>`
        : markupReviewForm
    }`; */

    // back button
    const backButton = `<a href="#" class="btn btn-outline-dark btn-sm btn-back" onclick="showResultsView(state)"> back to results</a>`;

    // show entire movie profile
    div.innerHTML = markupInfo; //+ markupReview + backButton;
    // console.log("div: ", div);
    return div.innerHTML;
  }
}

export default new MovieView();

import View from "./View.js";

class SearchView extends View {
  // !!!!! check if _parentElement is the correct one !!!!
  _parentElement = document.querySelector("#movie-form");

  getQuery() {
    const query = this._parentElement.querySelector("#movie-search").value;
    this._clearInput();
    return query;
  }
  _clearInput() {
    this._parentElement.querySelector("#movie-search").value = "";
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      // prevent actual submit
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();

export default class View {
  _data;

  render(data) {
    // receiving data from model via controller
    this._data = data;
    //console.log("this._data: ", this._data);

    // gets markup generated below in this class with the data above
    const markup = this._generateMarkup();
    // console.log("markup: ", markup);
    // clear the page
    this._clear(); // console.log("this._parentElement: ", this._parentElement);

    // check if this._data is search results
    if (this._data.results) {
      const moviePagination = document.querySelector(".movie-pagination");
      moviePagination.appendChild(this._generateSearchHeader());
      moviePagination.appendChild(this._generatePagination());
    }

    Array.isArray(markup)
      ? markup.forEach((item) => this._parentElement.appendChild(item))
      : this._parentElement.appendChild(markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }
}

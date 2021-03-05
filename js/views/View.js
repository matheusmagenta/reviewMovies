export default class View {
  _data;

  render(data) {
    // receiving data from model via controller
    this._data = data;
    // gets markup generated below in this class with the data above
    const markup = this._generateMarkup();
    //console.log("markup: ", markup);
    // clear the page
    this._clear();
    // show movie profile in the main view
    //console.log(this._parentElement);
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }
}

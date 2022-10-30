export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }
  renderItems(data, myID) {
    data.forEach((item) => {
      this._renderer(item, myID);
    })
  }
  addItem(element) {
    this._containerSelector.prepend(element)
  }
}

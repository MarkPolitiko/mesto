export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  renderItems(data, myID) {
    data.forEach((item) => {
      this._renderer(item, myID);
    });
  }

  addItem(element, newEl) {
    if (newEl) {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }
}

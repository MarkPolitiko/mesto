export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }
  renderItems() {
    this._items.forEach(item => this._renderer(item));
  }

  addItem(element) { // возможно, тут по-другому
    this._containerSelector.prepend(element);

/*     if (first) {
      this._containerSelector.prepend(element);
    } else {
      this._containerSelector.append(element);
    } */
  }
}

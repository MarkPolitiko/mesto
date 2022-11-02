export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }
  renderItems(/* data, myId */) {
    /* data */this._items.forEach((item) => {
      this./* _renderer */addItem(item)
    });
  }

  addItem(item/* element */) { // возможно, тут по-другому
    /* this._containerSelector.prepend(element); */

    if (item) {
      const newItem = this._renderer(item);
      this._containerSelector.prepend(newItem);
    }
  }
}

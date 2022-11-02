export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }
  renderItems(data, myID) {
    data.forEach((item) => {
      this._renderer(item, myID)
    });
  }

  addItem(element, first) { // ЗАМЕНИТЬ FIRST?
    if (first) {
      this._containerSelector.prepend(element);
    } else {
      this._containerSelector.append(element); // ОНО НУЖНО?
    }
  }
}

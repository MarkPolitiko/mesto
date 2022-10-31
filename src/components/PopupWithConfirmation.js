import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, option) {
    super(popupSelector);
    this._btnAgree = this._popup.querySelector(".popup__save-button");
    this._option = option;
  }

  open(data) {
    super.open();
    this._data = data;
  }

  setEventListeners() {
    super.setEventListeners();
    this._btnAgree.addEventListener("click", () => {
      this._option(this._data);
    });
  }
}

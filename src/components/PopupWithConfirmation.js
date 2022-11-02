import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {

  constructor(popupSelector, option) {
    super(popupSelector);
    this._btnAgree = this._popup.querySelector(".popup__save-button");
    this._option = option;
  }

  open(values) {
    super.open();
    this._values = values;
  }

  setEventListeners() {
    super.setEventListeners();
    /* this.popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitForm(this._values);
    }); */

    this._btnAgree.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._option(this._values);
    });
  }

  renderLoading(isLoading) { // ПОКА ОСТАВЛЮ
    if (isLoading) {
      this._popupSaveBtn.textContent = "Сохранение...";
    } else {
      this._popupSaveBtn.textContent = "Сохранить";
    }
  }
}

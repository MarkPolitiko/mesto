import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {

  constructor(popupSelector, submitForm, func) {
    super(popupSelector);
    //this._popupForm = this._popup.querySelector(".popup__form"); //del _
    this._submitForm = submitForm;
    this._btnAgree = this.popup.querySelector(".popup__save-button"); // вместо this._popup
    this._func = func;
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
      this._func(this._values);
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._popupSaveBtn.textContent = "Сохранение...";
    } else {
      this._popupSaveBtn.textContent = "Сохранить";
    }
  }
}

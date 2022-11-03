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

    this._btnAgree.addEventListener("click", (evt) => {
      this.renderSaving(true);
      evt.preventDefault();
      this._option(this._values);
    });
  }

  renderSaving(isSaving) {
    if (isSaving) {
      this._popupSaveBtn.textContent = "Сохранение...";
    } else {
      this._popupSaveBtn.textContent = "Сохранить";
    }
  }
}

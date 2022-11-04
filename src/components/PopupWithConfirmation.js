import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleAgreeBtn) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector(".popup__form");
    this._btnAgree = this._popup.querySelector(".popup__save-button");
    this._handleAgreeBtn = handleAgreeBtn;
    this._btnName = this._btnAgree.textContent
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
      this._handleAgreeBtn(this._values);
    });
  }

  renderSaving(isSaving) {
    if (isSaving) {
      this._btnAgree.textContent = "Удаление...";
    } else {
      this._btnAgree.textContent = this._btnName;
    }
  }
}

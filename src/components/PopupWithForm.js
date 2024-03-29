import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputList = Array.from(
      this._popupForm.querySelectorAll(".popup__input")
    );
    this._popupSaveBtn = this._popupForm.querySelector(".popup__save-button");
    this._btnName = this._popupSaveBtn.textContent
  }

  _getInputValues() {
    return this._inputList.reduce(function (formData, input) {
      formData[input.name] = input.value;
      return formData;
    }, {});
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener("submit", (evt) => {
      this.renderSaving(true);
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }

  renderSaving(isSaving) {
    if (isSaving) {
      this._popupSaveBtn.textContent = "Сохранение...";
    } else {
      this._popupSaveBtn.textContent = this._btnName;
    }
  }
}

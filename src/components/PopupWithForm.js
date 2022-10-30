import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputList = Array.from(this._popup.querySelectorAll(".popup__input"));
    this._popupSaveBtn = document.querySelector(".popup__save-button"); // или переместить в Popup?
  }

  _getInputValues() {
    return this._inputList.reduce(function (formData, input) {
      formData[input.name] = input.value;
      return formData;
    }, {});
  }

  closePopupWithForm() {
    super.close();
    this._popupForm.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      this.renderLoading(true);
      evt.preventDefault();
      this._submitForm(this._getInputValues());
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

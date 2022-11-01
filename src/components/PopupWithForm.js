import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputList = /* Array.from( */this._popupForm.querySelectorAll(".popup__input")/* ) */;
    this._popupSaveBtn = this._popup.querySelector(".popup__save-button"); // или переместить в Popup?
    // this._isLoading = false;
  }

  _getInputValues() {
    const values = {};

    this._inputList.forEach(function (input) {
      values[input.name] = input.value;
    })
    return values;

    /* const values = {};
    this._inputList.forEach((input) => {
      values[input.name] = input.value
    })
    return values; */
  }

  setInputs(values) {
    this._inputList.forEach(function (input) {
      if (values[input.name]) {
        input.value = values[input.name];
      }
    });
  }

  returnFormElement() {
    return this._popupForm;
  }

  closePopupWithForm() {
    super.close();
    this._popupForm.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      //this.renderLoading(true);
      evt.preventDefault();
      this._submitForm(this._getInputValues());
      this.closePopupWithForm();
    });
  }

/*   renderLoading(isLoading) {
    if (isLoading) {
      this._popupSaveBtn.textContent = "Сохранение...";
    } else {
      this._popupSaveBtn.textContent = "Сохранить";
    }
  } */
}
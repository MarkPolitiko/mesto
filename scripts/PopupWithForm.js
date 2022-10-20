import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._popupForm = this._popup.querySelector(".popup__form"); // вместо .popup__form_edit_profile
    /* this._popupElementNameInput = this._popup.querySelector(".popup__input_type_name");
    this._popupElementLinkInput = this._popup.querySelector(".popup__input_type_description"); */
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input')); //why not _popupForm?
  }

  _getInputValues() {
    /* return {name: this._popupElementNameInput.value, link: this._popupAddElementNameInput.value}; */ // ВОТ ЗДЕСЬ МОЖЕТ БЫТЬ ОШИБКА
    return this._inputList.reduce(function (formData, input) {
      formData[input.name] = input.value;
      return formData;
    }, {})

    /* this._formData = {};
    this._inputList.forEach(input => this._formData[input.name] = input.value);
    return this._formData; */
  }

  _closePopupWithForm() {
    super.close();
    this._popupForm.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
      //this.closePopupWithForm();
    })
  }
}

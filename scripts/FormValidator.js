export default class FormValidator {
  constructor(config, formElement) {
    (this._inputSelector = config.inputSelector),
    (this._submitButtonSelector = config.submitButtonSelector),
    (this._inactiveButtonClass = config.inactiveButtonClass),
    (this._inputErrorClass = config.inputErrorClass),
    (this._errorClass = config.errorClass);
    this._formElement = formElement;
    this._inputsList = this._formElement.querySelectorAll(this._inputSelector);
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _hasInvalidInput() {
    return Array.from(this._inputsList).some((inputItem) => {
      return !inputItem.validity.valid;
    });
  }

  _checkInputValidity(inputItem) {
    if (!inputItem.validity.valid) {
      this._showInputError(inputItem);
    } else {
      this._hideInputError(inputItem);
    }
  }

  _setButtonDisabled() {
    this._submitButton.setAttribute("disabled", "disabled");
    this._submitButton.classList.add(this._inactiveButtonClass);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._setButtonDisabled();
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute("disabled", "disabled");
    }
  }

  _setEventListeners() {
    this._formElement.addEventListener("reset", () => {
      this._setButtonDisabled();
      this._inputsList.forEach((inputElement) => {
        this._hideInputError(inputElement);
      });
    });
    this._toggleButtonState();
    this._inputsList.forEach((inputComponent) => {
      const errorElement = this._formElement.querySelector(
        `.${inputComponent.id}-error`
      );
      inputComponent.addEventListener("input", () => {
        this._checkInputValidity(inputComponent);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

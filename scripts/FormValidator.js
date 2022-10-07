export default class FormValidator {
  constructor(config, formElement) {
    (this._inputSelector = config.inputSelector),
    (this._submitButtonSelector = config.submitButtonSelector),
    (this._inactiveButtonClass = config.inactiveButtonClass),
    (this._inputErrorClass = config.inputErrorClass),
    (this._errorClass = config.errorClass);
    this._formElement = formElement;
  }

  _showInputError(inputElement, error) {
    inputElement.classList.add(this._inputErrorClass);
    error.textContent = inputElement.validationMessage;
    error.classList.add(this._errorClass);
  };

  _hideInputError(inputElement, error) {
    inputElement.classList.remove(this._inputErrorClass);
    error.classList.remove(this._errorClass);
    error.textContent = '';
  };

  _hasInvalidInput() {
    return Array.from(this._inputsList).some((inputItem) => {
      return !inputItem.validity.valid
    })
  }

  _checkInputValidity(inputItem, errorElement) {
    if (!inputItem.validity.valid) {
      this._showInputError(
        inputItem,
        errorElement,
        this._inputErrorClass,
        this._errorClass
      );
    } else {
      this._hideInputError(
        inputItem,
        errorElement,
        this._inputErrorClass,
        this._errorClass
      );
    }
  }

  _setButtonDisabled() {
    this._submitButton.setAttribute("disabled", "disabled");
    this._submitButton.classList.add(this._inactiveButtonClass);
  }

  _toggleButtonState(_inputsList, _submitButton, inactiveButtonClass) {
    if (this._hasInvalidInput(this._inputsList)) {
      this._setButtonDisabled();
    } else {
      this._submitButton.classList.remove(inactiveButtonClass);
      this._submitButton.removeAttribute('disabled', 'disabled');
    }
  }

  _setEventListeners() {
    this._inputsList = this._formElement.querySelectorAll(this._inputSelector);
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    this._formElement.addEventListener('reset', () => {
      this._setButtonDisabled();
      this._inputsList.forEach((inputElement) => {
          const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
          this._hideInputError(inputElement, this._inputErrorClass, errorElement, this._errorClass)
      })
    });
    this._toggleButtonState();
    this._inputsList.forEach((inputComponent) => {
      const errorElement = this._formElement.querySelector(`.${inputComponent.id}-error`);
      inputComponent.addEventListener('input', () => {
          this._checkInputValidity(inputComponent, errorElement);
          this._toggleButtonState(this._inputsList, this._submitButton, this._inactiveButtonClass);
      })
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

}

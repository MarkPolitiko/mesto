export default class FormValidator {
  #inputSelector;
  #submitButtonSelector;
  #inactiveButtonClass;
  #inputErrorClass;
  #errorClass;
  #formElement;
  #inputList
  #submitButton

  constructor(formElement, config) {
    (this.#inputSelector = config.inputSelector),
      (this.#submitButtonSelector = config.submitButtonSelector),
      (this.#inactiveButtonClass = config.inactiveButtonClass),
      (this.#inputErrorClass = config.inputErrorClass),
      (this.#errorClass = config.errorClass);
    this.#formElement = formElement;
    this.#inputList = Array.from(
      this.#formElement.querySelectorAll(this._inputSelector)
    );
    this.#submitButton = this.#formElement.querySelector(
      this.#submitButtonSelector
    );
  }

  #showInputError(inputElement) {
    const errorElement = this.#formElement.querySelector(
      `.${inputElement.id}-error`
    );

    inputElement.classList.add(this.#inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this.#errorClass);
  }

  #hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  #hasInvalidInput() {
    return this.#inputList.some((inputElement) => !inputElement.validity.valid);
  }

  #checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this.#showInputError(inputElement);
    } else {
      this.#hideInputError(inputElement);
    }
  }

  #toggleButtonState() {
    if (this.#hasInvalidInput()) {
      this.#submitButton.setAttribute("disabled", "disabled");
      this.#submitButton.classList.add(this.#inactiveButtonClass);
    } else {
      this.#submitButton.classList.remove(this.#inactiveButtonClass);
      this.#submitButton.removeAttribute("disabled", "disabled");
    }
  }

  enableValidation() {
    this.#formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    this.#inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.#checkInputValidity(inputElement);
        this.#toggleButtonState();
      });
    });
  }

  resetValidation() { // УТОЧНИТЬ
    this.#toggleButtonState();

    this.#inputList.forEach((inputElement) => {
      this.#hideInputError(inputElement);
      inputElement.addEventListener("input", () => {
        this.#checkInputValidity(inputElement);
        this.#toggleButtonState();
      });
    });
  }
}

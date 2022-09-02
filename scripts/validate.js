const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute("disabled", false);
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

  const enableValidation = (config) => {

  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

enableValidation(config);

const resetForm = (form) => {
  form.reset();
}

const resetErrorMessages = (errorList, inputList) => {
  errorList.forEach((errorElement) => {
    errorElement.textContent = "";
  })
  inputList.forEach((formInput) => {
    formInput.classList.remove('popup__input_type_error');
  })
}

const resetWholePopup = (popup) => {
  const submitButton = popup.querySelector('.popup__save-button');
  const form = popup.querySelector('.popup__form');

  if (popup.querySelector('.popup__form')) {
    const errorList = Array.from(form.querySelectorAll('.popup__input-error'));
    const inputList = Array.from(form.querySelectorAll('.popup__input'));
    resetErrorMessages(errorList, inputList);
    resetForm(form);

    toggleButtonState(inputList, submitButton, 'popup__save-button_inactive');
  }
}

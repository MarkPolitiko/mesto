export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error",
};

export const profileEditForm = document.querySelector(
  ".popup__form_edit_profile"
);
export const profileInputName = document.querySelector(
  ".popup__input_type_name"
);
export const profileInputDescription = document.querySelector(
  ".popup__input_type_description"
);
export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const popupAddForm = document.querySelector(".popup__form_add_element");
export const profileAddButton = document.querySelector(".profile__add-button");

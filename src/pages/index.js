import "./index.css";
import { initialCards } from "../utils/cards.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";

import {
  config,
  profileEditForm,
  profileInputName,
  profileInputDescription,
  profileEditButton,
  popupAddForm,
  profileAddButton,
} from "../utils/constants.js";

const imageOpenedPopup = new PopupWithImage(".popup_image_open");
const userInfo = new UserInfo({
  name: ".profile__title",
  information: ".profile__subtitle",
});
const popupProfileEditWindow = new PopupWithForm(
  ".popup_open_edit-window",
  submitFormChanges
);
const popupAddElement = new PopupWithForm(".popup_open_add-window", addCard);
const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, popupAddForm);

// открытие формы для изменения профиля
function handleEditProfileButtonClick() {
  popupProfileEditWindow.open();
  const userInputs = userInfo.getUserInfo();
  profileInputName.value = userInputs.name;
  profileInputDescription.value = userInputs.information;
  editFormValidator.resetValidation();
}

function handleAddElementButtonClick() {
  popupAddElement.open();
  addFormValidator.resetValidation();
}

// сохранение изменений профиля
function submitFormChanges (formData) {
  userInfo.setUserInfo(formData.name, formData.description);
  popupProfileEditWindow.closePopupWithForm();
}

function initiateCard(data) {
  const newCard = new Card(
    { name: data.name, link: data.link },
    ".elements-template",
    imageOpenedPopup.open.bind(imageOpenedPopup)
  );
  return newCard.createCard();
}

// добавление массива приложенных карточек
const addInitialElements = new Section(
  {
    items: initialCards,
    renderer: (item) => addInitialElements.addItem(initiateCard(item)),
  },
  ".elements"
);

// создание новой карточки
function addCard(formData) {
  addInitialElements.addItem(initiateCard(formData));
  popupAddElement.closePopupWithForm();
}

imageOpenedPopup.setEventListeners();
popupProfileEditWindow.setEventListeners();
popupAddElement.setEventListeners();

editFormValidator.enableValidation();
addFormValidator.enableValidation();

addInitialElements.renderItems();

profileEditButton.addEventListener("click", handleEditProfileButtonClick);
profileAddButton.addEventListener("click", handleAddElementButtonClick);

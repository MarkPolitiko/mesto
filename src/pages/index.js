import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import API from "../components/Api.js";
import { data } from "autoprefixer";

const profileEditForm = document.querySelector(".popup__form_edit_profile");
const profileInputName = document.querySelector(".popup__input_type_name");
const profileInputDescription = document.querySelector(
  ".popup__input_type_description"
);
const profileEditButton = document.querySelector(".profile__edit-button");
const popupAddForm = document.querySelector(".popup__form_add_element");
const profileAddButton = document.querySelector(".profile__add-button");
const imageOpened = document.querySelector(".popup_image_open");
const profileAvatar = document.querySelector(".profile__image");
const profileAvatarForm = document.querySelector(".popup__form_avatar-change");
const popupAvatarChange = document.querySelector(".popup_avatar-change");
const popupEditProfile = document.querySelector(".popup_open_edit-window");
const popupAddElement = document.querySelector(".popup_open_add-window");
const usernameInput = document.querySelector(".profile__title");
const aboutInput = document.querySelector(".profile__subtitle");
const popupConfirmEl = document.querySelector(".popup-confirm");
const elements = document.querySelector(".elements");

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error",
};

const api = new API({
  url: "https://mesto.nomoreparties.co/v1/cohort-52",
  headers: {
    Authorization: "bf036392-6320-48e8-bc39-fe0e751cfef6",
    "Content-Type": "application/json",
  },
});

const imageOpenedPopup = new PopupWithImage(imageOpened);

const userInfo = new UserInfo({
  name: usernameInput,
  about: aboutInput,
  avatar: profileAvatar,
});

const popupAvatarEditWindow = new PopupWithForm(popupAvatarChange, (data) => {
  api
    .patchAvatar({ avatar: data.avatarLink })
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
      popupAvatarEditWindow.close();
    })
    .catch((err) => console.error(err))
    .finally(() => popupAvatarEditWindow.renderSaving(false));
});

const popupProfileEditWindow = new PopupWithForm(popupEditProfile, (data) => {
  api
    .patchProfile({ name: data.name, about: data.about })
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
      popupProfileEditWindow.close();
    })
    .catch((err) => console.error(err))
    .finally(() => popupProfileEditWindow.renderSaving(false));
});

const popupAddCard = new PopupWithForm(popupAddElement, (data) => {
  popupAddCard.renderSaving(true);
  api
    .postNewCard({ name: data.name, link: data.link })
    .then((res) => {
      addInitialElements.addItem(initiateCard(res, res.owner._id), true);
      popupAddCard.close();
    })
    .catch((err) => console.error(err))
    .finally(() => popupAddCard.renderSaving(false));
});

const confirmationPopup = new PopupWithConfirmation(
  popupConfirmEl,
  ({ id, option }) => {
    api
      .deleteCard(id)
      .then(() => {
        option();
        confirmationPopup.close();
      })
      .catch((err) => console.error(err))
      .finally(() => confirmationPopup.renderSaving(false));
  }
);

const handleChangeAvatarClick = () => {
  popupAvatarEditWindow.open();
  avatarFormValidator.resetValidation();
};

// открытие формы для изменения профиля
const handleEditProfileButtonClick = () => {
  popupProfileEditWindow.open();
  const userInputs = userInfo.getUserInfo();
  profileInputName.value = userInputs.name;
  profileInputDescription.value = userInputs.about;
  editFormValidator.resetValidation();
};

const handleAddElementButtonClick = () => {
  popupAddCard.open();
  addFormValidator.resetValidation();
};

const initiateCard = (data, myID) => {
  const newItem = new Card(
    data,
    ".elements-template",
    imageOpenedPopup.open.bind(imageOpenedPopup),
    () => {
      confirmationPopup.open({
        id: data._id,
        option: () => newItem.deleteCard(),
      });
    },
    (myLike) => {
      if (!myLike) {
        api
          .putLike(data._id)
          .then((res) => newItem.addLike(res.likes.length))
          .catch((err) => console.error(err));
      } else {
        api
          .deleteLike(data._id)
          .then((res) => newItem.removeLike(res.likes.length))
          .catch((err) => console.error(err));
      }
    },
    myID,
    elements
  );
  return newItem.createCard();
};

const addInitialElements = new Section(
  {
    renderer: (data, myID) =>
      addInitialElements.addItem(initiateCard(data, myID)),
  },
  elements
);

Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(([data, initialCards]) => {
    const myID = data._id;
    userInfo.setUserInfo(data.name, data.about, data.avatar);
    addInitialElements.renderItems(initialCards, myID);
  })
  .catch((err) => console.error(err));

popupAvatarEditWindow.setEventListeners();
confirmationPopup.setEventListeners();
imageOpenedPopup.setEventListeners();
popupProfileEditWindow.setEventListeners();
popupAddCard.setEventListeners();

const editFormValidator = new FormValidator(profileEditForm, config);
const addFormValidator = new FormValidator(popupAddForm, config);
const avatarFormValidator = new FormValidator(profileAvatarForm, config);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();

profileAvatar.addEventListener("click", handleChangeAvatarClick);
profileEditButton.addEventListener("click", handleEditProfileButtonClick);
profileAddButton.addEventListener("click", handleAddElementButtonClick);

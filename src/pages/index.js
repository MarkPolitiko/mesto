import "./index.css";
//import { initialCards } from "../utils/cards.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import API from "../components/Api.js";
import { data } from "autoprefixer";

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error",
};

const profileEditForm = document.querySelector(".popup__form_edit_profile");
const profileInputName = document.querySelector(".popup__input_type_name");
const profileInputDescription = document.querySelector(".popup__input_type_description");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupAddForm = document.querySelector(".popup__form_add_element");
const profileAddButton = document.querySelector(".profile__add-button");
const imageOpened = document.querySelector(".popup_image_open");
const profileAvatar = document.querySelector(".profile__image");
const profileAvatarForm = document.querySelector(".popup__form_avatar-change");
const popupAvatarChange = document.querySelector(".popup_avatar-change");
const popupEditProfile = document.querySelector(".popup_open_edit-window");
const popupAddElement = document.querySelector(".popup_open_add-window");

/* import {
  config,
  profileEditForm,
  profileInputName,
  profileInputDescription,
  profileEditButton,
  popupAddForm,
  profileAddButton,
} from "../utils/constants.js"; */

const api = new API({
  url: "https://mesto.nomoreparties.co/v1/cohort-52",
  headers: {
    Authorization: "bf036392-6320-48e8-bc39-fe0e751cfef6",
    "Content-Type": "application/json",
  },
});

/* api.getInitialCards();
api.getID();
api.editProfile();
api.postNewCard();
api.deleteCard();
api.addLike();
api.removeLike();
api.updateAvatar(); */

//
const confirmationPopup = new PopupWithConfirmation(confirmPopup, (item) => {
  confirmationPopup.renderLoading(true)
  api.deleteCard(item.cardId)
      .then(() => {
        item.deleteCard();
        confirmationPopup.close();
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        confirmationPopup.renderLoading(false)
      })
});

//
const imageOpenedPopup = new PopupWithImage(imageOpened);
const confirmPopup = new PopupWithConfirmation(".confirm-popup");
const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__image');

//
const popupAvatarEditWindow = new PopupWithForm(popupAvatarChange, (avatar) => {
  popupAvatarEditWindow.renderLoading(true)
  api.updateAvatar(newAva)
    .then((newAva) => {
      userInfo.setUserInfo(newAva)
      popupAvatarEditWindow.close()
    })
    .catch((err) => console.log(err.message))
    .finally(() => popupAvatarEditWindow.renderLoading(false));

});

//
const popupProfileEditWindow = new PopupWithForm(
  popupEditProfile, (values) => {
    popupEditProfile.renderLoading(true)
    api.editProfile(values)
      .then((values) => {
        userInfo.setUserInfo(values);
        popupProfileEditWindow.close() //res.name, res.information, res.avatar
      })
      .catch((err) => console.log(err.message))
      .finally(() => popupProfileEditWindow.renderLoading(false));
  }
  /*   ".popup_open_edit-window",
  submitFormChanges */
);

//
const popupAddCard = new PopupWithForm(popupAddElement, (values) => {
  popupAddCard.renderLoading(true)
  api.postNewCard(values)
    .then((values) => {
      addInitialElements.addItem(values/* initiateCard(res, res.owner._id), true */);
      popupAddCard.close()
    })
    .catch((err) => console.log(err.message))
    .finally(() => popupAddCard.renderLoading(false));
});

//
const editFormValidator = new FormValidator(config, profileEditForm/* .returnFormElement() */); // Добавил returnFormElement()
const addFormValidator = new FormValidator(config, popupAddForm/* .returnFormElement() */);
const avatarFormValidator = new FormValidator(config, popupAvatarEditWindow.returnFormElement());

//
editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();

//
function handleChangeAvatarClick() {
  //profileAvatarForm.reset(); // удалять ли???
  avatarFormValidator.resetValidation();
  popupAvatarEditWindow.open();
};

//
// открытие формы для изменения профиля
function handleEditProfileButtonClick() {
  popupProfileEditWindow.open();
  const userInputs = userInfo.getUserInfo();
  profileInputName.value = userInputs.name;
  profileInputDescription.value = userInputs.about;
  //popupProfileEditWindow.setInputs(userInfo.getUserInfo());
  editFormValidator.resetValidation();
}

//
function handleAddElementButtonClick() {
  popupAddCard.open();
  addFormValidator.resetValidation();
}

const clickOnCard = (item) => {
  imageOpenedPopup.open(item);
};

const openPopupConfirm = (item) => {
  confirmPopup.open(item);
}

const cardLike = (item) => {
  if (item.likeByMe) {
    api.removeLike(item.id)
      .then((res) => {
        item.dislikeHandler(res.likes.length)
      })
      .catch(err => console.error(err))
  } else {
    api.addLike(item.id)
      .then((res) => {
        item.addLike(res.likes.length)
      })
      .catch(err => console.error(err))
  }
}

Promise.all([api.getID(), api.getInitialCards()])
  .then(res => {
    const [profileData, initialCards] = res
    userInfo.setUserInfo({ username: profileData.name, about: profileData.about, avatar: profileData.avatar, _id: profileData._id })
    addInitialElements = new Section(initialCards, (item) => {
      const newCard = new Card(item, userInfo.getID(), '.elements-template', clickOnCard, openPopupConfirm, cardLike)
      return newCard.createCard()
    }, '.elements-wrapper')

    addInitialElements.renderItems()

  })
  .catch((err) => console.error(`Ошибка: ${err}`))

//
popupAvatarEditWindow.setEventListeners();
confirmationPopup.setEventListeners();
imageOpenedPopup.setEventListeners();
popupProfileEditWindow.setEventListeners();
//popupAddElement.setEventListeners();
popupAddCard.setEventListeners();

//
profileAvatar.addEventListener("click", handleChangeAvatarClick);
profileEditButton.addEventListener("click", handleEditProfileButtonClick);
profileAddButton.addEventListener("click", handleAddElementButtonClick);

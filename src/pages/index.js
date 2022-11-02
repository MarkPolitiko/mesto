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
const usernameInput = document.querySelector(".profile__title");
const aboutInput = document.querySelector(".profile__subtitle");
const userAvatar = document.querySelector(".profile__image");
const popupConfirmEl = document.querySelector(".popup-confirm");
const elements = document.querySelector(".elements");
const elementsTemplate = document.querySelector(".elements-template");

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error",
};


/* import {
  config,
  profileEditForm,
  profileInputName,
  profileInputDescription,
  profileEditButton,
  popupAddForm,
  profileAddButton,
} from "../utils/constants.js"; */

//
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
const confirmationPopup = new PopupWithConfirmation(popupConfirmEl, ({id, option}) => {
  api.deleteCard(id)
      .then(() => {
        option(); // ИЛИ ПЕРЕИМЕНОВАТЬ?
      })
      .then(() => {
        confirmationPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
/*       .finally(() => {
        confirmationPopup.renderLoading(false)
      }) */
});

//
const imageOpenedPopup = new PopupWithImage(imageOpened);
//const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__image');

//
const userInfo = new UserInfo({
  name: usernameInput,
  about: aboutInput,
  avatar: userAvatar,
})

//
const popupAvatarEditWindow = new PopupWithForm(popupAvatarChange, (data) => {
  //popupAvatarEditWindow.renderLoading(true)
  api.patchAvatar({avatar: data.avatarLink})
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar)
      popupAvatarEditWindow.close()
    })
    //.then(() => popupAvatarEditWindow.close())
    .catch((err) => console.log(err))
    .finally(() => popupAvatarEditWindow.renderLoading(false));
});

//
const popupProfileEditWindow = new PopupWithForm(
  popupEditProfile, (data) => { // можно заменить на values?
    //popupEditProfile.renderLoading(true)
    api.patchProfile({name: data.name, about: data.about})
      .then((res) => {
        userInfo.setUserInfo(res.name, res.about, res.avatar);
        popupProfileEditWindow.close()
      })
      .catch((err) => console.log(err))
      .finally(() => popupProfileEditWindow.renderLoading(false));
  }
  /*   ".popup_open_edit-window",
  submitFormChanges */
);

//
const popupAddCard = new PopupWithForm(popupAddElement, (data) => {
  popupAddCard.renderLoading(true)
  api.postNewCard({name: data.name, link: data.link})
    .then((res) => {
      addInitialElements.addItem(initiateCard(res, res.owner._id), true);
      popupAddCard.close()
    })
    .catch((err) => console.log(err))
    .finally(() => popupAddCard.renderLoading(false));
});

//
const editFormValidator = new FormValidator(config, profileEditForm/* .returnFormElement() */); // Добавил returnFormElement()
const addFormValidator = new FormValidator(config, popupAddForm/* .returnFormElement() */);
const avatarFormValidator = new FormValidator(config, profileAvatarForm /* popupAvatarEditWindow.returnFormElement() */);

//
function handleChangeAvatarClick() {
  profileAvatarForm.reset(); // удалять ли???
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

/* Promise.all([api.getID(), api.getInitialCards()])
  .then(res => {
    const [data, initialCards] = res
    userInfo.setUserInfo(values)
    addInitialElements = new Section(initialCards, (item) => {
      const newCard = new Card(item, userInfo.getID(), '.elements-template', clickOnCard, openPopupConfirm, cardLike)
      return newCard.createCard()
    }, '.elements-wrapper')

    addInitialElements.renderItems()

  })
  .catch((err) => console.log(err)) */
//
  function initiateCard(data, myID/* {name, link} */) {
  const newCard = new Card(
    /* { name, link } */data,
    elementsTemplate,
    imageOpenedPopup.open.bind(imageOpenedPopup),
    () => {
      confirmationPopup.open({
        id: data._id,
        option: () => newCard.deleteCard(),
      });
    },
    (myLike) => {
      if (!myLike) {
        api.putLike(data._id)
          .then((res) => {
            newCard.addLike(res.likes.length);
          })
          .catch((err) => console.log(err));
      } else {
        api.deleteLike(data._id)
          .then((res) => {
            newCard.removeLike(res.likes.length);
          })
          .catch((err) => console.log(err));
      }
    },
    myID,
    elements);
  return newCard.createCard();
}

//
const addInitialElements = new Section(
    {
      renderer: (data, myID) =>
        addInitialElements.addItem(initiateCard(data, myID)),
    },
    elements
);


  Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(([data, initialCards]) => { // можно ли values?
    const myID = data._id;
    userInfo.setUserInfo(data.name, data.about, data.avatar);
    addInitialElements.renderItems(initialCards, myID);
  })
  .catch((err) => console.log(err));

//
popupAvatarEditWindow.setEventListeners();
confirmationPopup.setEventListeners();
imageOpenedPopup.setEventListeners();
popupProfileEditWindow.setEventListeners();
//popupAddElement.setEventListeners();
popupAddCard.setEventListeners();

//
editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();

profileAvatar.addEventListener("click", handleChangeAvatarClick);
profileEditButton.addEventListener("click", handleEditProfileButtonClick);
profileAddButton.addEventListener("click", handleAddElementButtonClick);

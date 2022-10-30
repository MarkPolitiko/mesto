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

import {
  config,
  profileEditForm,
  profileInputName,
  profileInputDescription,
  profileEditButton,
  popupAddForm,
  profileAddButton,
} from "../utils/constants.js";

const api = new API({
  url: 'https://mesto.nomoreparties.co/v1/cohort-52',
  headers: {
    Authorization: 'bf036392-6320-48e8-bc39-fe0e751cfef6',
    'Content-Type': 'application/json'
  }
});

/* api.getInitialCards();
api.getID();
api.editProfile();
api.postNewCard();
api.deleteCard();
api.addLike();
api.removeLike();
api.updateAvatar(); */

const confirmPopup = document.querySelector(".confirm-popup")

const confirmationPopup = new PopupWithConfirmation(
  confirmPopup,
  ({ id, option }) => {
    api
      .deleteCard(id)
      .then(() => {
        option();
      })
      .then(() => {
        confirmationPopup.close();
      })
      .catch((err) => {
        Promise.reject(err);
      });
  }
);

const imageOpenedPopup = new PopupWithImage(".popup_image_open");
const userInfo = new UserInfo({
  name: ".profile__title",
  information: ".profile__subtitle",
  avatar: ".profile__image"
});

const profileAvatar = document.querySelector(".profile__image");
const profileAvatarForm = document.querySelector(".profile__image-content");
const popupAvatarChange = document.querySelector(".popup_avatar-change");

const popupAvatarEditWindow = new PopupWithForm(popupAvatarChange, (data) => {
  api
    .updateAvatar({ avatar: data.avatarLinkInput })
    .then((res) =>//
      info.setUserInfo(res.name, res.information, res.avatarr)
    )
    .then(() => popupAvatarEditWindow.close())
    .catch((err) => console.log(err/* .message */))
    .finally(() => popupAvatarEditWindow.renderLoading(false));
});


const popupEditProfile = document.querySelector(".popup_open_edit-window");
const popupProfileEditWindow = new PopupWithForm(popupEditProfile, (data) => {
  api
  .editProfileData({ name: data.name, about: data.description })
  .then((res) => {//
    info.setUserInfo(res.name, res.information, res.avatar);
  })
  .then(() => popupProfileEditWindow.close())
  .catch((err) => console.log(err/* .message */))
  .finally(() => popupProfileEditWindow.renderLoading(false));
}
/*   ".popup_open_edit-window",
  submitFormChanges */

);


const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, popupAddForm);
const avatarFormValidation = new FormValidator(config, profileAvatarForm);


function handleChangeAvatarClick() {
  profileAvatarForm.reset();
  avatarFormValidation.restartFormValidation();
  popupAvatarEditWindow.open();
};

profileAvatar.addEventListener


// открытие формы для изменения профиля
function handleEditProfileButtonClick() {
  popupProfileEditWindow.open();
  const userInputs = userInfo.getUserInfo();
  profileInputName.value = userInputs.name;
  profileInputDescription.value = userInputs.information;
  editFormValidator.resetValidation();
}



// сохранение изменений профиля
/* function submitFormChanges (formData) {
  userInfo.setUserInfo(formData.name, formData.description);
  popupProfileEditWindow.closePopupWithForm();
} */

function initiateCard(data, myID) {
  const newCard = new Card(
    { name: data.name, link: data.link },
    ".elements-template",
    imageOpenedPopup.open.bind(imageOpenedPopup),


    () => {
      confirmationPopup.open({
        id: data._id,
        func: () => newCard.deleteCard(),
      });
    },
    (likeByMe) => {
      if (!likeByMe) {
        api
          .setLike(data._id)
          .then((res) => {
            newCard.addLike(res.likes.length);
          })
          .catch((err) => console.log(err/* .message */));
      } else {
        api
          .removeLike(data._id)
          .then((res) => {
            newCard.removeLike(res.likes.length);
          })
          .catch((err) => console.log(err/* .message */));
      }
    },
    myID,
    ".elements"


  );
  return newCard.createCard();
}

// добавление массива приложенных карточек
/* const addInitialElements = new Section(
  {
    items: initialCards,
    renderer: (item) => addInitialElements.addItem(initiateCard(item)),
  },
  ".elements"
); */

const addInitialElements = new Section(
  {
    renderer: (data, myID) => addInitialElements.addItem(initiateCard(data, myID)),
  },
  ".elements"//photos
);

//const popupAddElement = new PopupWithForm(".popup_open_add-window", addCard);

function handleAddElementButtonClick() {
  popupAddElement.open();
  addFormValidator.resetValidation();
}


const popupAddElement = document.querySelector(".popup_open_add-window");
// создание новой карточки
//function addCard(formData) {



/*   addInitialElements.addItem(initiateCard(formData));
  popupAddElement.closePopupWithForm(); */
//}



const popupAddCard = new PopupWithForm(popupAddElement, (data) => {
  api
    .addNewCard({ name: data.name, link: data.link })
    .then((res) => {
      addInitialElements.addItem(initiateCard(res, res.owner._id), true);
    })
    .then(() => popupAddCard.close())
    .catch((err) => console.log(err/* .message */))
    .finally(() => popupAddCard.renderLoading(false));
});
/* profileAddButton.addEventListener("click", () => {
  popupAddElement.open();
  addFormValidator.resetValidation();

}); */



Promise.all([api.getID(), api.getInitialCards()])
  .then(([profileData, initialCards]) => {
    const myID = profileData._id;
    info.setUserInfo(res.name, res.information, res.avatar);
    addInitialElements.renderItems(initialCards, myID);
  })
  .catch((err) => console.log(err/* .message */));



popupAvatarEditWindow.setEventListeners();
confirmationPopup.setEventListeners();
imageOpenedPopup.setEventListeners();
popupProfileEditWindow.setEventListeners();
popupAddElement.setEventListeners();
popupAddCard.setEventListeners();

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidation.enableFormValidation();

addInitialElements.renderItems();

profileAvatar.addEventListener("click", handleChangeAvatarClick);
profileEditButton.addEventListener("click", handleEditProfileButtonClick);
profileAddButton.addEventListener("click", handleAddElementButtonClick);

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
const confirmPopup = document.querySelector(".confirm-popup");
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

/* const confirmationPopup = new PopupWithConfirmation( //ПОКА УБИРАЮ
  confirmPopup,
  ({ id, option }) => {
    api.deleteCard(id)
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
); */

//
const imageOpenedPopup = new PopupWithImage(imageOpened);

//
const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__image');

/* const userInfo = new UserInfo({
  name: ".profile__title",
  about: ".profile__subtitle",
  avatar: ".profile__image",
}); */

//
api.getID()
.then((data) => {
  console.log(data);
  const info = data;
  userInfo.setUserInfo(info);
  userInfo.setAvaInfo(info.avatar);
  userInfo.setID(info._id);
})

//
const popupAvatarEditWindow = new PopupWithForm(popupAvatarChange, (values) => {
  api.updateAvatar(values.link)
    .then(
      /* (res) =>  */userInfo.setAvaInfo(/* { avatar:  */values.link /* } */      /* res.name, res.information, res.avatar */)
    )

    /* .then(() => popupAvatarEditWindow.close())
    .catch((err) => console.log(err.message))
    .finally(() => popupAvatarEditWindow.renderLoading(false)); */

});

//
const popupProfileEditWindow = new PopupWithForm(
  popupEditProfile, (values) => {
    api.editProfile(values)
      .then((values) => {
        information.setUserInfo(values); //res.name, res.information, res.avatar
      })
      /* .then(() => popupProfileEditWindow.close())
      .catch((err) => console.log(err.message))
      .finally(() => popupProfileEditWindow.renderLoading(false)); */
  }
  /*   ".popup_open_edit-window",
  submitFormChanges */
);

//
const popupAddCard = new PopupWithForm(popupAddElement, (values) => {
  api.postNewCard(values)
    .then((data) => {
      addInitialElements.addItem(data/* initiateCard(res, res.owner._id), true */); //addInitialElements правильно указано???
    })
    /* .then(() => popupAddCard.close())
    .catch((err) => console.log(err.message))
    .finally(() => popupAddCard.renderLoading(false)); */
});


/* profileAddButton.addEventListener("click", () => {
  popupAddElement.open();
  addFormValidator.resetValidation();

}); */

//
const editFormValidator = new FormValidator(config, profileEditForm/* .returnFormElement() */); // Добавил returnFormElement()
const addFormValidator = new FormValidator(config, popupAddForm/* .returnFormElement() */);
const avatarFormValidator = new FormValidator(config, profileAvatarForm/* .returnFormElement() */);

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
/*   const userInputs = userInfo.getUserInfo();
  profileInputName.value = userInputs.name;
  profileInputDescription.value = userInputs.about; */
  popupProfileEditWindow.setInputs(userInfo.getUserInfo());
  editFormValidator.resetValidation();
}

//
function handleAddElementButtonClick() {
  popupAddCard.open();
  addFormValidator.resetValidation();
}

// сохранение изменений профиля
/* function submitFormChanges (formData) {
  userInfo.setUserInfo(formData.name, formData.description);
  popupProfileEditWindow.closePopupWithForm();
} */

//
function initiateCard({name, link}) {
  const newCard = new Card(
    { name, link },
    ".elements-template",
    imageOpenedPopup.open.bind(imageOpenedPopup),
    // все что после и до return нужно ли?

    /* () => {
      confirmationPopup.open({
        id: data._id,
        func: () => newCard.deleteCard(),
      });
    },
    (likeByMe) => {
      if (!likeByMe) {
        api
          .addLike(data._id)
          .then((res) => {
            newCard.addLike(res.likes.length);
          })
          .catch((err) => console.log(err.message));
      } else {
        api
          .removeLike(data._id)
          .then((res) => {
            newCard.removeLike(res.likes.length);
          })
          .catch((err) => console.log(err.message));
      }
    },
    myID,
    ".elements" */

  );
  return newCard.createCard();
}

//const popupAddElement = new PopupWithForm(".popup_open_add-window", addCard);


// создание новой карточки
//function addCard(formData) {

/*   addInitialElements.addItem(initiateCard(formData));
  popupAddElement.closePopupWithForm(); */
//}

/* Promise.all([api.getID(), api.getInitialCards()])
  .then(([profileData, initialCards]) => {
    const myID = profileData._id;
    info.setUserInfo(data);
    addInitialElements.renderItems(initialCards, myID);
  })
  .catch((err) => console.log(err.message)); */

//
api.getInitialCards()
  .then((data) => {
    const initialCards = data;
    const addInitialElements = new Section(
      {
        items: initialCards,
        renderer: (item) =>
          addInitialElements.addItem(initiateCard(item)),
      },
      ".elements" //photos
    );
    addInitialElements.renderItems();
  })

//
popupAvatarEditWindow.setEventListeners();
//confirmationPopup.setEventListeners();              // ЭТО НУЖНО???
imageOpenedPopup.setEventListeners();
popupProfileEditWindow.setEventListeners();
//popupAddElement.setEventListeners();
popupAddCard.setEventListeners();

//
profileAvatar.addEventListener("click", handleChangeAvatarClick);
profileEditButton.addEventListener("click", handleEditProfileButtonClick);
profileAddButton.addEventListener("click", handleAddElementButtonClick);


// добавление массива приложенных карточек
/* const addInitialElements = new Section(
  {
    items: initialCards,
    renderer: (item) => addInitialElements.addItem(initiateCard(item)),
  },
  ".elements"
);

addInitialElements.renderItems(); */

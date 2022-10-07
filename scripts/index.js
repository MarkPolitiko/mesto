import { initialCards } from "./cards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const profileEditButton = document.querySelector(".profile__edit-button");

const popupProfileEditWindow = document.querySelector(
  ".popup_open_edit-window"
);
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__subtitle");
const profileInputName = document.querySelector(".popup__input_type_name");
const profileInputDescription = document.querySelector(
  ".popup__input_type_description"
);

const profileAddButton = document.querySelector(".profile__add-button");
const popupAddElement = document.querySelector(".popup_open_add-window");
const popupAddElementNameInput = document.querySelector(
  ".popup__input_type_place"
); // название фото
const popupAddElementLinkInput = document.querySelector(
  ".popup__input_type_link"
); // ссылка на фото

//const elementsTemplate = document.querySelector("#elements-template").content;

const cardsContainer = document.querySelector(".elements");

const popupButtonsClose = document.querySelectorAll(".popup__close-button");
const popupImage = document.querySelector(".popup__image");
const popupOpenImage = document.querySelector(".popup_image_open");
const popupCaption = document.querySelector(".popup__caption");

/* const popupButtonEdit = document.querySelector(".popup__save-button_edit");
const popupButtonAdd = document.querySelector(".popup__save-button_add"); */

const profileForm = document.querySelector(".popup__form_edit_profile");
const popupAddForm = document.querySelector(".popup__form_add_element");

//const formAddElement = document.forms.account;

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error",
};

const validationProfileEditWindow = new FormValidator(config, profileForm);
const validationAddImageWindow = new FormValidator(config, popupAddForm);

function enrollValidation() {
  validationProfileEditWindow.enableValidation();
  validationAddImageWindow.enableValidation();
}

export { popupImage, popupOpenImage, popupCaption };

// открытие формы для изменения профиля
function showPopupProfile() {
  profileInputName.value = profileName.textContent;
  profileInputDescription.value = profileDescription.textContent;
  showPopup(popupProfileEditWindow);
}

// сохранение изменений профиля
function submitFormChanges(evt) {
  evt.preventDefault();
  profileName.textContent = profileInputName.value;
  profileDescription.textContent = profileInputDescription.value;
  closePopup(popupProfileEditWindow);
}

function initiateCard(title, image, template) {
  return new Card(title, image, template, makeCardClick).createCard();
}

// добавление массива приложенных карточек
function addInitialElements() {
  initialCards.forEach((item) => {
    const elementName = item.name;
    const elementLink = item.link;
    cardsContainer.prepend(
      initiateCard(elementName, elementLink, ".elements-template")
    );
  });
}

addInitialElements();

// создание новой карточки

function addCard(card) {
  cardsContainer.prepend(
    initiateCard(card.name, card.link, ".elements-template")
  );
}

initialCards.forEach(addCard);

function submitAddElementForm(evt) {
  evt.preventDefault();
  addCard({
    link: popupAddElementLinkInput.value,
    name: popupAddElementNameInput.value,
  });
  evt.target.reset();
  closePopup(popupAddElement);
}

export function showPopup(popup) {
  popup.classList.add("popup_show");
  document.addEventListener("keydown", closePopupByEsc);
  popup.addEventListener("mousedown", closePopupByOverlay);
}

function closePopup(popup) {
  popup.classList.remove("popup_show");
}

//закрытие через Esc
function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_show");
    closePopup(popup);
  }
}

//закрытие через click вне формы
function closePopupByOverlay(evt) {
  if (evt.target.classList.contains("popup_show")) {
    closePopup(evt.target);
  }
}

export function makeCardClick(name, link) {
  newElementTitle.textContent = name;
  newElementImage.setAttribute("src", link);
  newElementImage.setAttribute("alt", name);
  showPopup();
}

function initializeCloseButtonsListeners() {
  popupButtonsClose.forEach((item) => {
    item.addEventListener("click", (evt) => {
      const evtTarget = evt.target.closest(".popup");
      closePopup(evtTarget);
    });
  });
}

initializeCloseButtonsListeners();

enrollValidation();

profileEditButton.addEventListener("click", showPopupProfile);

profileForm.addEventListener("submit", submitFormChanges);

profileAddButton.addEventListener("click", () => {
  showPopup(popupAddElement);
});

popupAddForm.addEventListener("submit", submitAddElementForm);

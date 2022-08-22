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

const elementsTemplate = document.querySelector("#elements-template").content;
const element = document.querySelector(".elements");

const popupButtonsClose = document.querySelectorAll(".popup__close-button");
const popupImage = document.querySelector(".popup__image");
const popupOpenImage = document.querySelector(".popup_image_open");
const popupCaption = document.querySelector(".popup__caption");

const profileForm = document.querySelector(".popup__form_edit_profile");
const popupAddForm = document.querySelector(".popup__form_add_element");

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error'
};

const formAddElement = document.forms.account;

// механизм редактирования профиля

function showPopupProfile() {
  // форма для изменения профиля
  profileInputName.value = profileName.textContent;
  profileInputDescription.value = profileDescription.textContent;
  showPopup(popupProfileEditWindow);
}

function submitFormChanges(evt) {
  // сохранение изменений профиля
  evt.preventDefault();
  const evtTarget = evt.target.closest(".popup");
  profileName.textContent = profileInputName.value;
  profileDescription.textContent = profileInputDescription.value;
  closePopup(evtTarget);
}

function addInitialElements() {
  initialCards.forEach((item) => {
    const elementName = item.name;
    const elementLink = item.link;
    element.prepend(createCard(elementName, elementLink));
  });
}

addInitialElements();

function createCard(elementName, elementLink) {
  const newCard = elementsTemplate
    .querySelector(".elements__card")
    .cloneNode(true);
  const newElementTitle = newCard.querySelector(".elements__title");
  const newElementImage = newCard.querySelector(".elements__image");
  const likeButton = newCard.querySelector(".elements__like-button");
  const newElementDeleteButton = newCard.querySelector(
    ".elements__delete-button"
  );

  newElementTitle.textContent = elementName;
  newElementImage.setAttribute("src", elementLink);
  newElementImage.setAttribute("alt", elementName);

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("elements__like-button_active");
  });

  newElementDeleteButton.addEventListener("click", (evt) => {
    newCard.remove();
  });

  newElementImage.addEventListener("click", (evt) => {
    popupImage.setAttribute("src", elementLink);
    popupImage.setAttribute("alt", elementName);
    popupCaption.textContent = elementName;
    showPopup(popupOpenImage);
  });

  return newCard;
}

function submitAddElementForm(evt) {
  evt.preventDefault();
  formAddElement.setAttribute("disable", "disable");
  const evtTarget = evt.target.closest(".popup");
  if (popupAddElementNameInput.value && popupAddElementLinkInput.value) {
    element.prepend(createCard(popupAddElementNameInput.value, popupAddElementLinkInput.value));
  }
  closePopup(evtTarget);
  evt.target.reset();
}

function showPopup(popupOpen, ) {
  formAddElement.reset();
  formAddElement.setAttribute("disable", "disable");
  popupOpen.classList.add("popup_show");
  document.addEventListener("keydown", closePopupByEsc);
  document.addEventListener("click", closePopupByOverlay);
}

function closePopup(popupClose) {
  popupClose.classList.remove("popup_show");
  document.removeEventListener("keydown", closePopupByEsc);
  document.removeEventListener("click", closePopupByOverlay);
}

//закрытие через Esc
function closePopupByEsc () {
  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      const popup = document.querySelectorAll(".popup");
      popup.forEach((popup) => {
        closePopup(popup);
      });
    }
  });
}

//закрытие через click вне формы
function closePopupByOverlay () {
  document.addEventListener("click", function(evt) {
    const popups = Array.from(document.querySelectorAll('.popup_show'));
      if (evt.target.classList.contains('popup_show')) {
        popups.forEach((popup) => {
          closePopup(popup);
        });
      };
  });
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


profileEditButton.addEventListener("click", showPopupProfile);
profileForm.addEventListener("submit", submitFormChanges);

profileAddButton.addEventListener("click", () => {
  showPopup(popupAddElement);
});

popupAddForm.addEventListener("submit", submitAddElementForm);



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
const cardsContainer = document.querySelector(".elements");

const popupButtonsClose = document.querySelectorAll(".popup__close-button");
const popupImage = document.querySelector(".popup__image");
const popupOpenImage = document.querySelector(".popup_image_open");
const popupCaption = document.querySelector(".popup__caption");

const profileForm = document.querySelector(".popup__form_edit_profile");
const popupAddForm = document.querySelector(".popup__form_add_element");

const formAddElement = document.forms.account;

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

// добавление массива приложенных карточек
function addInitialElements() {
  initialCards.forEach((item) => {
    const elementName = item.name;
    const elementLink = item.link;
    cardsContainer.prepend(createCard(elementName, elementLink));
  });
}

addInitialElements();

// создание новой карточки
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

  // механизм лайка
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("elements__like-button_active");
  });

  // удаление карточки
  newElementDeleteButton.addEventListener("click", (evt) => {
    newCard.remove();
  });

  // всплытие картинки из карточки
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
  formAddElement.setAttribute("disabled", "disabled");
  cardsContainer.prepend(createCard(popupAddElementNameInput.value, popupAddElementLinkInput.value));
  evt.target.reset();
  closePopup(popupAddElement);
}

function showPopup(popup) {
  popup.classList.add("popup_show");
  document.addEventListener("keydown", closePopupByEsc);
  popup.addEventListener("mousedown", closePopupByOverlay);
}

function closePopup(popup) {
  popup.classList.remove("popup_show");
  document.removeEventListener("keydown", closePopupByEsc);
  document.removeEventListener("click", closePopupByOverlay);
}

//закрытие через Esc
function closePopupByEsc (evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector('.popup_show');
    closePopup(popup);
  }
}

//закрытие через click вне формы
function closePopupByOverlay (evt) {
  if (evt.target.classList.contains("popup_show")) {
    const popup = document.querySelector('.popup_show');
    closePopup(popup);
  };
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
})

popupAddForm.addEventListener("submit", submitAddElementForm);

const profileEditButton = document.querySelector('.profile__edit-button');
const profileForm = document.querySelector('.popup__form_edit_profile');
const popupProfileEditWindow = document.querySelector('.popup_open_edit-window');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__subtitle');
const profileInputName = document.querySelector('.popup__input_type_name');
const profileInputDescription = document.querySelector('.popup__input_type_description');

const profileAddButton = document.querySelector('.profile__add-button');
const popupAddForm = document.querySelector('.popup__form_add_element');
const popupAddElement = document.querySelector('.popup_open_add-window');
const popupAddElementNameInput = document.querySelector('.popup__input_type_place'); // название фото
const popupAddElementLinkInput = document.querySelector('.popup__input_type_link'); // ссылка на фото

const elementsTemplate = document.querySelector('#elements-template').content;
const elements = document.querySelector('.elements');

const popupButtonsClose = document.querySelectorAll('.popup__close-button');
const popupImage = document.querySelector('.popup__image');
const popupOpenImage = document.querySelector('.popup_image_open');
const popupCaption = document.querySelector('.popup__caption');


// механизм редактирования профиля

function showPopupProfile() { // форма для изменения профиля
  profileInputName.value = profileName.textContent;
  profileInputDescription.value = profileDescription.textContent;
  showPopup(popupProfileEditWindow)
}

function submitFormChanges(evt) { // сохранение изменений профиля
  evt.preventDefault();
  const evtTarget = evt.target.closest('.popup');
  profileName.textContent = profileInputName.value;
  profileDescription.textContent = profileInputDescription.value;
  closePopup(evtTarget);
}

function addInitialElements() {
  const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  initialCards.forEach(item => {
    const elementName = item.name;
    const elementLink = item.link;
    elements.prepend(createCard(elementName, elementLink));
  })
}

addInitialElements();

function createCard(elementName, elementLink) {
  const newCard = elementsTemplate.querySelector('.elements__card').cloneNode(true);
  const newElementTitle = newCard.querySelector('.elements__title');
  const newElementImage = newCard.querySelector('.elements__image');
  const likeButton = newCard.querySelector('.elements__like-button');
  const newElementDeleteButton = newCard.querySelector('.elements__delete-button');

  newElementTitle.textContent = elementName;
  newElementImage.setAttribute('src', elementLink);
  newElementImage.setAttribute('alt', elementName);

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('elements__like-button_active');
  })

  newElementDeleteButton.addEventListener('click', (evt) => {
    newCard.remove();
  })

  newElementImage.addEventListener('click', (evt) => {
    const evtTarget = evt.target;
    popupImage.setAttribute('src', evtTarget.src);
    popupImage.setAttribute('alt', evtTarget.alt);
    popupCaption.textContent = newCard.querySelector('.elements__title').textContent;
    showPopup(popupOpenImage);
  })

  return newCard;

}

function submitAddElementForm (evt) {
  evt.preventDefault();
  const evtTarget = evt.target.closest('.popup');
  elements.prepend(createCard (popupAddElementNameInput.value, popupAddElementLinkInput.value))
  closePopup(evtTarget);
  evt.target.reset();
}

function showPopup(popupOpen) {
  popupOpen.classList.add('popup_show');
}

function closePopup(popupClose) {
  popupClose.classList.remove('popup_show');
}

function initializeCloseButtonsListeners() {
  popupButtonsClose.forEach((item) => {
    item.addEventListener('click', (evt) => {
        const evtTarget = evt.target.closest('.popup');
        closePopup(evtTarget);
      });
  })
}

initializeCloseButtonsListeners();

profileEditButton.addEventListener('click', showPopupProfile);
profileForm.addEventListener('submit', submitFormChanges);

profileAddButton.addEventListener('click', () => {
  showPopup(popupAddElement)
});

popupAddForm.addEventListener('submit', submitAddElementForm);

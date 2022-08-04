const profileOpenButton = document.querySelector('.profile__edit-button');
const profileButtonClose = document.querySelector('.edit__close-button');
const profileForm = document.querySelector('.edit__form');
const profileButtonEdit = document.querySelector('.edit');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__subtitle');
const profileInputName = document.querySelector('.edit__input_type_name');
const profileInputDescription = document.querySelector('.edit__input_type_description');

const profileAddButton = document.querySelector('.profile__add-button');
const addWindowShow = document.querySelector('.add__window');
const addButtonClose = document.querySelector('.add__close-button');
const addForm = document.querySelector('.add__form');
const toAdd = document.querySelector('.add');
const addInputName = document.querySelector('.add__input_type_name'); // название фото
const addInputLink = document.querySelector('.add__input_type_link'); // ссылка на фото

const elementsTemplate = document.querySelector('#elements-template').content;
const elements = document.querySelector('.elements');
const elementsImage = document.querySelector('.elements__image');
const elementsTitle = document.querySelector('.elements__title');

const popupButtonClose = document.querySelectorAll('.popup__close-button');
const popupImage = document.querySelector('.popup__image');
const popupOpenImage = document.querySelector('.popup_image_open');
const popupCaption = document.querySelector('.popup__caption');


// механизм редактирования профиля

function editShow() { // форма для изменения профиля
  profileInputName.value = profileName.textContent;
  profileInputDescription.value = profileDescription.textContent;
  profileButtonEdit.classList.add('edit_show');
}

function formSaveChanges(evt) { // сохранение изменений профиля
  evt.preventDefault();
  profileName.textContent = profileInputName.value;
  profileDescription.textContent = profileInputDescription.value;
  editClose();
}

function editClose() { // закрытие формы редактирования профиля
  profileButtonEdit.classList.remove('edit_show');
}

function addElements() {
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
    elements.prepend(createInitial(elementName, elementLink));
  })
}

addElements();

function addShow() {
  toAdd.classList.add('add_show');
}

function addClose() { // закрытие формы добавления фото
  toAdd.classList.remove('add_show');
}

function createInitial(elementName, elementLink) {
  const newCard = elementsTemplate.querySelector('.elements__card').cloneNode(true);
  const initialTitle = newCard.querySelector('.elements__title');
  const initialImage = newCard.querySelector('.elements__image');
  const elementsDeleteButton = newCard.querySelector('.elements__delete-button');
  const likeButton = newCard.querySelectorAll('.elements__like-button');

  initialTitle.textContent = elementName;
  initialImage.setAttribute('src', elementLink);
  initialImage.setAttribute('alt', elementName);

  likeButton.forEach(item => {
    item.addEventListener('click', (evt) => {
        evt.target.classList.toggle('elements__like-button_active');
    })
  })

  elementsDeleteButton.addEventListener('click', (evt) => {
    const evtTarget = evt.target;
    const newCard = evtTarget.closest('.elements__card');
    newCard.remove();
  })

  initialImage.addEventListener('click', (evt) => {
    const evtTarget = evt.target;
    popupImage.setAttribute('src', evtTarget.src);
    popupImage.setAttribute('alt', evtTarget.alt);
    popupCaption.textContent = newCard.querySelector('.elements__title').textContent;
    showPopup(popupOpenImage);
  })

 return newCard;

}

function submitAddElement (evt) {
  evt.preventDefault();
  const evtTarget = evt.target.closest('.add');
  if (addInputName.value && addInputLink.value) {
  elements.prepend(createInitial (addInputName.value, addInputLink.value))
  }
  addClose(evtTarget);
  evt.target.reset();
}

profileAddButton.addEventListener('click', () => {
  addShow(addWindowShow);
});


function showPopup(popupOpen) {
  popupOpen.classList.add('popup_show');
}

function closePopup(popupClose) {
  popupClose.classList.remove('popup_show');
}

function toClosePopupButton() {
  popupButtonClose.forEach((item) => {
    item.addEventListener('click', (evt) => {
        const evtTarget = evt.target.closest('.popup');
        closePopup(evtTarget);
      });
  })
}

toClosePopupButton();

profileOpenButton.addEventListener('click', editShow);
profileForm.addEventListener('submit', formSaveChanges);
profileButtonClose.addEventListener('click', editClose);

profileAddButton.addEventListener('click', addShow);
addButtonClose.addEventListener('click', addClose);

addForm.addEventListener('submit', submitAddElement);

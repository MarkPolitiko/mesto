// создание новой карточки

export default class Card {
  constructor(data, myID, templateSelector, handleCardClick, deleteCardClick, userInfo, addLikeToCard, deleteCardLike, deleteCardConfirmation) {
    this._title = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._myID = myID
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._deleteCardClick = deleteCardClick;
    this._addLikeToCard = addLikeToCard;
    this._creator = data.owner._id;
    this._myLike = Boolean(this._likes.find((like) => like._id == myID));
    this._likeCounter = Boolean(data.likes.length >= 0);
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);

    return cardTemplate;
  }

  // всплытие картинки из карточки
  _openImage() {
    this._handleCardClick(this._image, this._title);
  }

  _clickDeleteBtn() {
    this._deleteCardClick();
  }

  _clickLikeButton() {
    this._addLikeToCard(this._myLike);
  }

  addLike(value) {
    this._likeButton.classList.add("elements__like-button_active");
    this._cardPlace.querySelector(".elements__like-counter").textContent =
      value;
    this._myLike = true;
  }

  removeLike(value) {
    this._likeButton.classList.remove("elements__like-button_active");
    this._cardPlace.querySelector(".elements__like-counter").textContent =
      value;
    this._myLike = false;
  }

  deleteCard() {
    this._cardPlace.remove();
    this._cardPlace = null;
  }

  _setEventListeners() {
    this._likeButton = this._cardPlace.querySelector(".elements__like-button");
    this._cardDelete = this._cardPlace.querySelector(".elements__delete-button");
    this._popupImage = this._cardPlace.querySelector(".elements__image");

    this._likeButton.addEventListener("click", () => {
      this._handleCardClick(this);
    });

    this._popupImage.addEventListener("click", () => {
      this._openImage();
    });

    this._deleteButton.addEventListener('click', () => {
      this._clickDeleteBtn(); // может, просто без метода? this._deleteCardClick();
    });
  }

  _removeDeleteBtn() {
    if (this._creator !== this._myID) {
      this._deleteButton.classList.add("elements__delete-button_remove");
    }
  }

  createCard() {
    this._cardPlace = this._getTemplate();

    this._popupImage = this._cardPlace.querySelector(".elements__image");
    this._cardText = this._cardPlace.querySelector(".elements__title");
    this._cardLikesNmbr = this._cardPlace.querySelector(".elements__like-counter");

    this._popupImage.src = this._image;
    this._popupImage.alt = this._title;
    this._cardText.textContent = this._title;

    this._setEventListeners();
    this._removeDeleteBtn();

    if(!!this._myLike) { // отавить !! ?
      this._likeButton.classList.add("elements__like-button_active");
    }

    if(this._likeCounter) {
      this._cardLikesNmbr.textContent = this._likes.length;
    }

    return this._cardPlace;
  }
}

// создание новой карточки

export default class Card {
  constructor(cardData, myId, templateSelector, handleCardClick, deleteCardClick, userInfo, addLikeToCard, deleteCardLike, deleteCardConfirmation) {
    this._title = cardData.name;
    this._image = cardData.link;
    this._likes = cardData.likes;
    this._myId = myId//
    this._creator = cardData.owner._id; //added ._id
    this._cardId = cardData._id;
    this._myCard = this._myId === this._creator; //added
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._addLikeToCard = addLikeToCard;
    this._deleteCardConfirmation = deleteCardConfirmation;
  }

  //
  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);

    return cardTemplate;
  }

  //
  addLike(value) {
    this._likeButton.classList.add("elements__like-button_active");
    this._cardPlace.querySelector(".elements__like-counter").textContent =
      value;
    this._likeByMe = true;
  }

  //
  removeLike(value) {
    this._likeButton.classList.remove("elements__like-button_active");
    this._cardPlace.querySelector(".elements__like-counter").textContent =
      value;
    this._likeByMe = false;
  }

  //
  deleteCard() {
    // убрал нижнее подчеркивание
    this._cardPlace.remove();
    this._cardPlace = null;
  }

  //
  // всплытие картинки из карточки
  _openImage() {
    this._handleCardClick(this._image, this._title);
  }

  _setEventListeners() {

    this._likeButton.addEventListener("click", () => {
      this._handleCardClick(this);
    });

    if (!this._myCard) {
      this._deleteButton.remove()
      this._deleteButton = null
    } else {
      this._deleteButton.addEventListener('click', () => {
        this._deleteCardConfirmation(this)
      })
    }

    this._popupImage.addEventListener("click", () => {
      this._openImage();
    });
  }

  //
  createCard() {
    this._cardPlace = this._getTemplate();

    this._popupImage = this._cardPlace.querySelector(".elements__image");
    this._cardText = this._cardPlace.querySelector(".elements__title");
    this._deleteButton = this._cardPlace.querySelector(".elements__delete-button");
    this._likeButton = this._cardPlace.querySelector(".elements__like-button");
    this._cardLikesNmbr = this._cardPlace.querySelector(".elements__like-counter");

    this._popupImage.src = this._image;
    this._popupImage.alt = this._title;
    this._cardText.textContent = this._title;

    this._cardLikesNmbr.textContent = this._likes.length;
    this.likeByMe = this._likes.some((like) => like._id === this._myId);

    this._setEventListeners();


    if (!!this._likeByMe) {
      this._likeButton.classList.add("elements__like-button_active");
    }

    return this._cardPlace;
  }
}

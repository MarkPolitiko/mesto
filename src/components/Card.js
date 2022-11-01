// создание новой карточки

export default class Card {
  constructor({name, link}, templateSelector, handleCardClick, cardLiked/* , deleteCardClick, myID, addLikeToCard */) {
    this._title = name;
    this._image = link;
    //this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    /* this._deleteCardClick = deleteCardClick;
    this._myID = myID;
    this._creator = data.owner._id;
    this._addLikeToCard = addLikeToCard;
    this._likeByMe = Boolean(this._likes.find((like) => like._id == myID)); */
    this._cardLiked = cardLiked/* Boolean(data.likes.length >= 0) */;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);

    return cardTemplate;
  }

  // механизм лайка
  _clickLikeButton() {
    /* this._addLikeToCard(this._likeByMe); */
    this._likeButton.classList.toggle("elements__like-button_active");
  }

  addLike(number) {
    this._likeButton.classList.add("elements__like-button_active");
    this._cardPlace.querySelector(".elements__like-counter").textContent =
      number;
    this._likeByMe = true;
  }

  removeLike(number) {
    this._likeButton.classList.remove("elements__like-button_active");
    this._cardPlace.querySelector(".elements__like-counter").textContent =
      number;
    this._likeByMe = false;
  }

  // удаление карточки
  _handleDeleteBtn() {
    this._deleteCardClick();
  }

  _deleteCard() { // добавил нижнее подчеркивание
    // убрал нижнее подчеркивание
    this._cardPlace.remove();
    this._cardPlace = null;
  }
  /*   _deleteCardButton() {
    this._cardPlace.remove();
  } */

  _removeDeleteBtn() {
    if (this._creator !== this._myID) {
      this._cardDelete.classList.add("elements__delete-button_remove");
    }
  }

  // всплытие картинки из карточки
  _openImage() {
    this._handleCardClick(this._image, this._title);
  }

  _setEventListeners() {
    this._likeButton = this._cardPlace.querySelector(".elements__like-button");
    this._cardDelete = this._cardPlace.querySelector(
      ".elements__delete-button"
    );
    this._popupImage = this._cardPlace.querySelector(".elements__image");

    this._likeButton.addEventListener("click", () => {
      this._clickLikeButton();
    });

    this._cardDelete.addEventListener("click", () => {
      this._deleteCard();
    });

    this._popupImage.addEventListener("click", () => {
      this._openImage();
    });
  }

  createCard() {
    this._cardPlace = this._getTemplate();

    this._popupImage = this._cardPlace.querySelector(".elements__image");
    this._cardText = this._cardPlace.querySelector(".elements__title");

    this._popupImage.src = this._image;
    this._popupImage.alt = this._title;
    this._cardText.textContent = this._title;

    this._setEventListeners();
    /* this._removeDeleteBtn();

    if (this._cardLiked) {
      this._cardPlace.querySelector(".elements__like-counter").textContent =
        this._likes.length;
    }

    if (this._likeByMe) {
      this._likeButton.classList.add("elements__like-button_active");
    } */

    return this._cardPlace;
  }
}

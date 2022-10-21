// создание новой карточки

export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._title = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {

    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".elements__card")
      .cloneNode(true);

    return cardTemplate;
  }

  // механизм лайка
  _clickLikeButton() {
    this._likeButton.classList.toggle("elements__like-button_active");
  }

  // удаление карточки
  _deleteCardButton() {
    this._cardPlace.remove();
  }

  // всплытие картинки из карточки
  _openImage() {
    this._handleCardClick(this._image, this._title);
  }

  _setEventListeners() {

    this._likeButton = this._cardPlace.querySelector(".elements__like-button");
    this._cardDelete = this._cardPlace.querySelector(".elements__delete-button");
    this._popupImage = this._cardPlace.querySelector(".elements__image");

    this._likeButton.addEventListener("click", () => {
      this._clickLikeButton()
    });

    this._cardDelete.addEventListener("click", () => {
      this._deleteCardButton()
    });

    this._popupImage.addEventListener("click", () => {
      this._openImage()
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

    return this._cardPlace;
  }
}




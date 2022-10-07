// создание новой карточки
import {
  popupImage,
  popupOpenImage,
  popupCaption,
  showPopup,
  makeCardClick,
} from "./index.js";

export default class Card {
  constructor(title, image, templateSelector) {
    this._title = title;
    this._image = image;
    this._templateSelector = templateSelector;
    this._makeCardClick = makeCardClick;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);

    return cardTemplate;
  }

  createCard() {
    this._cardPlace = this._getTemplate();

    this._likeButton = this._cardPlace.querySelector(".elements__like-button");
    this._cardDelete = this._cardPlace.querySelector(
      ".elements__delete-button"
    );
    this._popupImage = this._cardPlace.querySelector(".elements__image");
    this._cardText = this._cardPlace.querySelector(".elements__description");
    this._setEventListeners();

    this._popupImage.src = this._image;
    this._popupImage.alt = this._title;
    this._cardPlace.querySelector(".elements__title").textContent = this._title;

    return this._cardPlace;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._clickLikeButton();
    });

    this._cardDelete.addEventListener("click", () => {
      this._deleteCardButton();
    });

    this._popupImage.addEventListener("click", () => {
      this._openImage();
    });
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
    popupImage.setAttribute("src", this._image);
    popupImage.setAttribute("alt", this._title);
    popupCaption.textContent = this._title;
    showPopup(popupOpenImage);
  }
}

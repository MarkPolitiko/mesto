// создание новой карточки
import { popupImage, popupOpenImage, popupCaption } from "./index.js";

export default class Card {
  constructor(elementName, elementLink) {
    this._templateSelector = templateSelector;
    this._newElementTitle = newCard.querySelector(".elements__title");
    this._newElementImage = newCard.querySelector(".elements__image");
    const likeButton = newCard.querySelector(".elements__like-button");
    const newElementDeleteButton = newCard.querySelector(
      ".elements__delete-button"
    );
  }

  _getTemplate() {
    const newCard = document
      .querySelector(this._templateSelector)
      .content.querySelector("#elements-template")
      .cloneNode(true);

    return newCard;
  }

  /*     newElementTitle.textContent = elementName;
    newElementImage.setAttribute("src", elementLink);
    newElementImage.setAttribute("alt", elementName); */

  // механизм лайка
  _clickLikeButton() {
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("elements__like-button_active");
    });
  }

  // удаление карточки
  _deleteCardButton() {
    newElementDeleteButton.addEventListener("click", (evt) => {
      newCard.remove();
    });
  }

  // всплытие картинки из карточки
  _openImage() {
    newElementImage.addEventListener("click", (evt) => {
      popupImage.setAttribute("src", elementLink);
      popupImage.setAttribute("alt", elementName);
      popupCaption.textContent = elementName;
      showPopup(popupOpenImage);
    });
  }

  createCard() {
    this.cardPlace = this._getTemplate();

    this.likeButton = this.cardPlace.querySelector(".elements__like-button_active");
    this.cardDelete = this.cardPlace.querySelector(".elements__delete-button");
    this.popupImage = this.cardPlace.querySelector(".elements__image");
    this.cardText = this.cardPlace.querySelector(".elements__description");

    newElementTitle.textContent = elementName;
    newElementImage.setAttribute("src", elementLink);
    newElementImage.setAttribute("alt", elementName);

    this._setEventListeners();

    return this.cardPlace;
  }
}

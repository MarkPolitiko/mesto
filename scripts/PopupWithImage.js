import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__image"); //правильный класс?
    this._popupCaption = this._popup.querySelector(".popup__caption");
  }

  open(link, name) {
    super.open();
    /* super.setEventListeners();
    this._popupImage.setAttribute("src", image);
    this._popupImage.setAttribute("alt", title);
    this._popupCaption.textContent = title; */
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupCaption.textContent = name;
  }
}

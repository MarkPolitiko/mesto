export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector); // или просто popupSelector ?
    //this._closePopupButton = this._popup.querySelector(".popup__close-button");
  }

  open() {
    this._popup.classList.add("popup_show");
    document.addEventListener("keydown", this._handleEscClose);
    /* this._popup */document.addEventListener("mousedown", this._handleOverlayClose);
  }

  close() {
    this._popup.classList.remove("popup_show");
    document.removeEventListener("keydown", this._handleEscClose);
    /* this._popup */document.removeEventListener("mousedown", this._handleOverlayClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClose = (evt) => {
    if (evt.target.classList.contains("popup_show")) {
      this.close(evt.target);
    }
  }

  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      if (evt.target === evt.target.classList.contains("popup__close-button") || evt.currentTarget) {
        this.close();
      }
    })
  }
}

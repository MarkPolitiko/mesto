export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._aboutSelector = document.querySelector(aboutSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      about: this._aboutSelector.textContent,
    };
  }

  setUserInfo(formData) {
    this._nameSelector.textContent = formData.name;
    this._aboutSelector.textContent = formData.about;
    this._avatarSelector.src = formData.avatar;
  }
}

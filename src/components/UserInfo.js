export default class UserInfo {
  constructor({ name, about, avatar }) {
    this._name = name;
    this._information = about;
    this._avatar = avatar;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._information.textContent,
    };
  }

  setUserInfo(name, about, avatar) {
    this._name.textContent = name;
    this._information.textContent = about;
    this._avatar.src = avatar;
  }
}

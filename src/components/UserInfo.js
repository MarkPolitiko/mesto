export default class UserInfo {
  constructor({ name, information, avatar }) {
    this._name = document.querySelector(name);
    this._information = document.querySelector(information);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      information: this._information.textContent,
    };
  }

  setUserInfo(name, information, avatar) {
    this._name.textContent = name;
    this._information.textContent = information;
    this._avatar.src = avatar;
  }
}

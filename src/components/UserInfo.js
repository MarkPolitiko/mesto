export default class UserInfo {
  constructor({username, about, avatar}) {
    this._name = document.querySelector(username);
    this._information = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      username: this._name.textContent,
      about: this._information.textContent, // точно information???
    };
  }

  setUserInfo(username, about, avatar) {
    this._name.textContent = username;
    this._information.textContent = about;
    this._avatar.src = avatar;
  }
}

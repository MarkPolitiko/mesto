export default class UserInfo {
  constructor({name, information, avatar}) {
    this._name = document.querySelector(name);
    this._information = document.querySelector(information);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._information.textContent, // точно information???
    };
  }

  /* getAvaInfo() {
    return avatar = this._avatar.src;
  } */

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._information.textContent = data.about;
    this._avatar.src = data.avatar;
    this._id = data._id
  }

  /* setAvaInfo(avatar) {
    this._avatar.src = avatar;
  } */

/*   editProfile(data) {
    this._name.textContent = data.name;
    this._information.textContent = data.about;
  } */

  /* updateAvatar(data) {
    this._avatar.src = data.avatar;
  } */

  /* setId(id) {
    this._id = id;
  }*/

  getID() {
    return this._id;
  }
}

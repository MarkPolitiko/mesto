export default class API {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-52/cards", {
      headers: {
        Authorization: 'bf036392-6320-48e8-bc39-fe0e751cfef6',
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkRes)
      .catch((err) => {
        console.log(err);
      });
  }

  getID() {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-52/users/me", {
      headers: {
        Authorization: 'bf036392-6320-48e8-bc39-fe0e751cfef6',
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkRes)
      .catch((err) => {
        console.log(err);
      });
  }

  editProfile() {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-52/users/me", {
      method: 'PATCH',
      headers: {
        Authorization: 'bf036392-6320-48e8-bc39-fe0e751cfef6',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Jacques-Yves Cousteau',
        about: 'Oceanographer, Filmmaker and Author'
      })
    })
      .then(this._checkRes)
      .catch((err) => {
        console.log(err);
      });
  }

  postNewCard() {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-52/cards", {
      method: 'POST',
      headers: {
        Authorization: 'bf036392-6320-48e8-bc39-fe0e751cfef6',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Grand Canyon',
        link: 'https://stazztravel.com/wp-content/uploads/2020/01/03.jpg'
      })
    })
      .then(this._checkRes)
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCard() {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-52/cards/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'bf036392-6320-48e8-bc39-fe0e751cfef6',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Grand Canyon',
        link: 'https://stazztravel.com/wp-content/uploads/2020/01/03.jpg'
      })
    })
      .then(this._checkRes)
      .catch((err) => {
        console.log(err);
      });
  }

  addLike() {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-52/${id}/likes`, {
      method: 'PUT',
      headers: {
        Authorization: 'bf036392-6320-48e8-bc39-fe0e751cfef6',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Grand Canyon',
        link: 'https://stazztravel.com/wp-content/uploads/2020/01/03.jpg'
      })
    })
      .then(this._checkRes)
      .catch((err) => {
        console.log(err);
      });
  }

  removeLike() {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-52/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        Authorization: 'bf036392-6320-48e8-bc39-fe0e751cfef6',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Grand Canyon',
        link: 'https://stazztravel.com/wp-content/uploads/2020/01/03.jpg'
      })
    })
      .then(this._checkRes)
      .catch((err) => {
        console.log(err);
      });
  }

  updateAvatar() {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-52/users/me/avatar", {
      method: 'PATCH',
      headers: {
        Authorization: 'bf036392-6320-48e8-bc39-fe0e751cfef6',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        link: 'https://stazztravel.com/wp-content/uploads/2020/01/03.jpg'
      })
    })
      .then(this._checkRes)
      .catch((err) => {
        console.log(err);
      });
  }
}

export default class API {
  constructor({url, ...headers}) {
    this._url = url;
    this._headers = headers;
  }

  async _processFetch(track, method = "GET", body) {
    const params = { ...this._headers, method };
    if(body) {
      if(typeof body === "string") {
        params.body = body;
      }
      else {
        params.body = JSON.stringify(body);
      }
    }
    //const json = await res.json()
    const res = await fetch(this._url + track, params)
    //return res.ok ? await res.json() : Promise.reject(`Ошибка: ${res.status}`)
    if (res.ok) {
      res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getID() {
    return this._processFetch('/users/me', 'GET')
  }

  getInitialCards() {
    return this._processFetch('/cards', 'GET')
  }

  editProfile(values) {
    return this._processFetch('/users/me', 'PATCH', values) // или заменить data на values?
  }

  postNewCard(values) {
    return this._processFetch('/cards', 'POST', values)
  }

  deleteCard() {
    return this._processFetch('/cards' + id, 'DELETE') // or '/cards' + id  ?
  }

  addLike(id) {
    return this._processFetch('/cards' + id + '/likes', 'PUT')
  }

  removeLike(id) {
    return this._processFetch('/cards' + id + '/likes', 'DELETE')
  }

  updateAvatar(avatar) {
    return this._processFetch(`/users/me/avatar`, 'PATCH', avatar)
  }







/*   _checkRes(res) {
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
        Promise.reject(err);
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
        Promise.reject(err);
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
        Promise.reject(err);
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
        Promise.reject(err);
      });
  }

  deleteCard() {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-52/cards/635f63ac5fe6740e891625c4", {
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
        Promise.reject(err);
      });
  }

  addLike() {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-52/635f63ac5fe6740e891625c4/likes", {
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
        Promise.reject(err);
      });
  }

  removeLike() {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-52/cards/635f63ac5fe6740e891625c4/likes", {
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
        Promise.reject(err);
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
        Promise.reject(err);
      });
  } */






/*   processFetch(link, newMethod = "GET", newBody) {
    return fetch(this._url+link, {method: newMethod , headers: this._headers, body: JSON.stringify(newBody)})
    .then(res => this._checkResult(res))
  }*/














  /* getInitialCards() {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-52/cards", {
      headers: {
        Authorization: 'bf036392-6320-48e8-bc39-fe0e751cfef6',
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkRes)
      .catch((err) => {
        Promise.reject(err);
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
        Promise.reject(err);
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
        Promise.reject(err);
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
        Promise.reject(err);
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
        Promise.reject(err);
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
        Promise.reject(err);
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
        Promise.reject(err);
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
        Promise.reject(err);
      });
  } */
}

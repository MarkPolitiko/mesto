export default class API {
  constructor({url, ...headers}) {
    this._url = url;
    this._headers = headers;
  }

  async _processFetch(path, method = "GET", body) {
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
    const res = await fetch(this._url + path, params)
    return res.ok ? await res.json() : Promise.reject(`Ошибка: ${res.status}`)
/*     if (res.ok) {
      res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`); */
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
}

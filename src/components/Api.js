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
    const res = await fetch(this._url + path, params)
    return res.ok ? await res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }

  getID() {
    return this._processFetch('/users/me', 'GET')
  }

  getInitialCards() {
    return this._processFetch('/cards', 'GET')
  }

  patchProfile(values) {
    return this._processFetch('/users/me', 'PATCH', values) // или заменить data на values?
  }

  postNewCard(values) {
    return this._processFetch('/cards', 'POST', values)
  }

  deleteCard(id) {
    return this._processFetch('/cards' + id, 'DELETE') // or '/cards' + id  ?
  }

  putLike(id) {
    return this._processFetch('/cards' + id + '/likes', 'PUT')
  }

  deleteLike(id) {
    return this._processFetch('/cards' + id + '/likes', 'DELETE')
  }

  patchAvatar(avatar) {
    return this._processFetch(`/users/me/avatar`, 'PATCH', avatar)
  }
}

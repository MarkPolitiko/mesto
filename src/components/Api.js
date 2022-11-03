export default class API {
  #url;
  #headers;

  constructor({ url, ...headers }) {
    this.#url = url;
    this.#headers = headers;
  }

  async #processFetch(track, method = "GET", body) {
    const params = { ...this.#headers, method };
    if (body) {
      if (typeof body === "string") {
        params.body = body;
      } else {
        params.body = JSON.stringify(body);
      }
    }
    const res = await fetch(this.#url + track, params);
    if (res.ok) {
      return res.json()
    }
      return Promise.reject(`Ошибка: ${res.status}`)
  }

  getProfileInfo() {
    return this.#processFetch("/users/me", "GET");
  }

  getInitialCards() {
    return this.#processFetch("/cards", "GET");
  }

  patchProfile(values) {
    return this.#processFetch("/users/me", "PATCH", values);
  }

  postNewCard(values) {
    return this.#processFetch("/cards", "POST", values);
  }

  deleteCard(id) {
    return this.#processFetch(`/cards/${id}`, "DELETE");
  }

  putLike(id) {
    return this.#processFetch(`/cards/${id}/likes`, "PUT");
  }

  deleteLike(id) {
    return this.#processFetch(`/cards/${id}/likes`, "DELETE");
  }

  patchAvatar(values) {
    return this.#processFetch(`/users/me/avatar`, "PATCH", values);
  }
}

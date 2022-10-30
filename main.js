(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n,r,o){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._title=e.name,this._image=e.link,this._likes=e.likes,this._templateSelector=n,this._handleCardClick=r,this._deleteCardClick=deleteCardClick,this._myID=o,this._creator=e.owner._id,this._addLikeToCard=addLikeToCard,this._likeByMe=Boolean(this._likes.find((function(e){return e._id==o}))),this._cardLiked=Boolean(e.likes.length>=0)}var n,r;return n=t,(r=[{key:"_getTemplate",value:function(){return document.querySelector(this._templateSelector).content.querySelector(".elements__card").cloneNode(!0)}},{key:"_clickLikeButton",value:function(){this._addLikeToCard(this._likeByMe)}},{key:"addLike",value:function(){this._likeButton.classList.add("elements__like-button_active"),this._cardPlace.querySelector(".elements__like-counter").textContent=number,this._likeByMe=!0}},{key:"removeLike",value:function(){this._likeButton.classList.remove("elements__like-button_active"),this._cardPlace.querySelector(".elements__like-counter").textContent=number,this._likeByMe=!1}},{key:"_handleDeleteBtn",value:function(){this._deleteCardClick()}},{key:"deleteCard",value:function(){this._element.remove(),this._element=null}},{key:"_hideDeleteBtn",value:function(){this._creator!==this._myID&&this._cardDelete.classList.add("elements__delete-button_remove")}},{key:"_openImage",value:function(){this._handleCardClick(this._image,this._title)}},{key:"_setEventListeners",value:function(){var e=this;this._likeButton=this._cardPlace.querySelector(".elements__like-button"),this._cardDelete=this._cardPlace.querySelector(".elements__delete-button"),this._popupImage=this._cardPlace.querySelector(".elements__image"),this._likeButton.addEventListener("click",(function(){e._clickLikeButton()})),this._cardDelete.addEventListener("click",(function(){e._handleDeleteBtn()})),this._popupImage.addEventListener("click",(function(){e._openImage()}))}},{key:"createCard",value:function(){return this._cardPlace=this._getTemplate(),this._popupImage=this._cardPlace.querySelector(".elements__image"),this._cardText=this._cardPlace.querySelector(".elements__title"),this._popupImage.src=this._image,this._popupImage.alt=this._title,this._cardText.textContent=this._title,this._setEventListeners(),this._hideDeleteBtn(),this._cardLiked&&(this._cardPlace.querySelector(".elements__like-counter").textContent=this._likes.length),this._likeByMe&&this._likeButton.classList.add("elements__like-button_active"),this._cardPlace}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._inputSelector=t.inputSelector,this._submitButtonSelector=t.submitButtonSelector,this._inactiveButtonClass=t.inactiveButtonClass,this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass,this._formElement=n,this._inputList=Array.from(this._formElement.querySelectorAll(this._inputSelector)),this._submitButton=this._formElement.querySelector(this._submitButtonSelector)}var t,r;return t=e,(r=[{key:"_showInputError",value:function(e){var t=this._formElement.querySelector(".".concat(e.id,"-error"));e.classList.add(this._inputErrorClass),t.textContent=e.validationMessage,t.classList.add(this._errorClass)}},{key:"_hideInputError",value:function(e){var t=this._formElement.querySelector(".".concat(e.id,"-error"));e.classList.remove(this._inputErrorClass),t.classList.remove(this._errorClass),t.textContent=""}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e)}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?(this._submitButton.setAttribute("disabled","disabled"),this._submitButton.classList.add(this._inactiveButtonClass)):(this._submitButton.classList.remove(this._inactiveButtonClass),this._submitButton.removeAttribute("disabled","disabled"))}},{key:"enableValidation",value:function(){var e=this;this._toggleButtonState(),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._checkInputValidity(t),e._toggleButtonState()}))}))}},{key:"resetValidation",value:function(){var e=this;this._inputList.forEach((function(t){e._hideInputError(t)})),this._toggleButtonState()}}])&&n(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=function(){function e(t){var n,r,o=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),r=function(e){"Escape"===e.key&&o.close()},(n="_handleEscClose")in this?Object.defineProperty(this,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):this[n]=r,this._popup=document.querySelector(t)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add("popup_show"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_show"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"setEventListeners",value:function(){var e=this;this._popup.addEventListener("click",(function(t){(t.target===t.currentTarget||t.target.classList.contains("popup__close-button"))&&e.close()}))}}])&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function a(e){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a(e)}function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function u(){return u="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=s(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},u.apply(this,arguments)}function s(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=f(e)););return e}function l(e,t){return l=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},l(e,t)}function p(e,t){if(t&&("object"===a(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function f(e){return f=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},f(e)}var h=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&l(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=f(r);if(o){var n=f(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return p(this,e)});function a(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e))._submitForm=t,n._popupForm=n._popup.querySelector(".popup__form"),n._inputList=Array.from(n._popup.querySelectorAll(".popup__input")),n._popupSaveBtn=document.querySelector(".popup__save-button"),n}return t=a,(n=[{key:"_getInputValues",value:function(){return this._inputList.reduce((function(e,t){return e[t.name]=t.value,e}),{})}},{key:"closePopupWithForm",value:function(){u(f(a.prototype),"close",this).call(this),this._popupForm.reset()}},{key:"setEventListeners",value:function(){var e=this;u(f(a.prototype),"setEventListeners",this).call(this),this._popupForm.addEventListener("submit",(function(t){e.renderLoading(!0),t.preventDefault(),e._submitForm(e._getInputValues())}))}},{key:"renderLoading",value:function(e){this._popupSaveBtn.textContent=e?"Сохранение...":"Сохранить"}}])&&c(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(i);function d(e){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},d(e)}function y(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _(){return _="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=m(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},_.apply(this,arguments)}function m(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=k(e)););return e}function v(e,t){return v=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},v(e,t)}function b(e,t){if(t&&("object"===d(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function k(e){return k=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},k(e)}var g=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&v(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=k(r);if(o){var n=k(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return b(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._popupImage=t._popup.querySelector(".popup__image"),t._popupCaption=t._popup.querySelector(".popup__caption"),t}return t=a,(n=[{key:"open",value:function(e,t){_(k(a.prototype),"open",this).call(this),this._popupImage.src=e,this._popupImage.alt=t,this._popupCaption.textContent=t}}])&&y(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(i);function w(e){return w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},w(e)}function S(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function C(){return C="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=j(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},C.apply(this,arguments)}function j(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=E(e)););return e}function O(e,t){return O=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},O(e,t)}function P(e,t){if(t&&("object"===w(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function E(e){return E=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},E(e)}var L=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&O(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=E(r);if(o){var n=E(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return P(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._btnAgree=t._popup.querySelector(".popup__save-button"),t._option=option,t}return t=a,(n=[{key:"open",value:function(e){C(E(a.prototype),"open",this).call(this),this._data=e}},{key:"setEventListeners",value:function(){var e=this;C(E(a.prototype),"setEventListeners",this).call(this),this._btnAgree.addEventListener("click",(function(){e._option(e._data)}))}}])&&S(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(i);function I(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var B=function(){function e(t){var n=t.name,r=t.information;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=document.querySelector(n),this._information=document.querySelector(r),this._avatar=document.querySelector(avatar)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._name.textContent,information:this._information.textContent}}},{key:"setUserInfo",value:function(e,t,n){this._name.textContent=e,this._information.textContent=t,this._avatar.src=n}}])&&I(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function T(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var q=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._items=r,this._renderer=o,this._containerSelector=document.querySelector(n)}var t,n;return t=e,(n=[{key:"renderItems",value:function(e){var t=this;this._items.forEach((function(n){t._renderer(n,e)}))}},{key:"addItem",value:function(e){this._containerSelector.prepend(e)}}])&&T(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function R(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var A=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._url=t.url,this._header=t.header}var t,n;return t=e,(n=[{key:"_checkRes",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}},{key:"getInitialCards",value:function(){return fetch("https://mesto.nomoreparties.co/v1/cohort-52/cards",{headers:{Authorization:"bf036392-6320-48e8-bc39-fe0e751cfef6","Content-Type":"application/json"}}).then(this._checkRes).catch((function(e){Promise.reject(e)}))}},{key:"getID",value:function(){return fetch("https://mesto.nomoreparties.co/v1/cohort-52/users/me",{headers:{Authorization:"bf036392-6320-48e8-bc39-fe0e751cfef6","Content-Type":"application/json"}}).then(this._checkRes).catch((function(e){Promise.reject(e)}))}},{key:"editProfile",value:function(){return fetch("https://mesto.nomoreparties.co/v1/cohort-52/users/me",{method:"PATCH",headers:{Authorization:"bf036392-6320-48e8-bc39-fe0e751cfef6","Content-Type":"application/json"},body:JSON.stringify({name:"Jacques-Yves Cousteau",about:"Oceanographer, Filmmaker and Author"})}).then(this._checkRes).catch((function(e){Promise.reject(e)}))}},{key:"postNewCard",value:function(){return fetch("https://mesto.nomoreparties.co/v1/cohort-52/cards",{method:"POST",headers:{Authorization:"bf036392-6320-48e8-bc39-fe0e751cfef6","Content-Type":"application/json"},body:JSON.stringify({name:"Grand Canyon",link:"https://stazztravel.com/wp-content/uploads/2020/01/03.jpg"})}).then(this._checkRes).catch((function(e){Promise.reject(e)}))}},{key:"deleteCard",value:function(){return fetch("https://mesto.nomoreparties.co/v1/cohort-52/cards/635e706d2454640e292bbef1",{method:"DELETE",headers:{Authorization:"bf036392-6320-48e8-bc39-fe0e751cfef6","Content-Type":"application/json"},body:JSON.stringify({name:"Grand Canyon",link:"https://stazztravel.com/wp-content/uploads/2020/01/03.jpg"})}).then(this._checkRes).catch((function(e){Promise.reject(e)}))}},{key:"addLike",value:function(){return fetch("https://mesto.nomoreparties.co/v1/cohort-52/cards/635e706d2454640e292bbef1/likes",{method:"PUT",headers:{Authorization:"bf036392-6320-48e8-bc39-fe0e751cfef6","Content-Type":"application/json"},body:JSON.stringify({name:"Grand Canyon",link:"https://stazztravel.com/wp-content/uploads/2020/01/03.jpg"})}).then(this._checkRes).catch((function(e){Promise.reject(e)}))}},{key:"removeLike",value:function(){return fetch("https://mesto.nomoreparties.co/v1/cohort-52/cards/635e706d2454640e292bbef1/likes",{method:"DELETE",headers:{Authorization:"bf036392-6320-48e8-bc39-fe0e751cfef6","Content-Type":"application/json"},body:JSON.stringify({name:"Grand Canyon",link:"https://stazztravel.com/wp-content/uploads/2020/01/03.jpg"})}).then(this._checkRes).catch((function(e){Promise.reject(e)}))}},{key:"updateAvatar",value:function(){return fetch("https://mesto.nomoreparties.co/v1/cohort-52/users/me/avatar",{method:"PATCH",headers:{Authorization:"bf036392-6320-48e8-bc39-fe0e751cfef6","Content-Type":"application/json"},body:JSON.stringify({link:"https://stazztravel.com/wp-content/uploads/2020/01/03.jpg"})}).then(this._checkRes).catch((function(e){Promise.reject(e)}))}}])&&R(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),D={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__save-button",inactiveButtonClass:"popup__save-button_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error"},x=document.querySelector(".popup__form_edit_profile"),z=document.querySelector(".popup__input_type_name"),V=document.querySelector(".popup__input_type_description"),N=document.querySelector(".profile__edit-button"),F=document.querySelector(".popup__form_add_element"),U=document.querySelector(".profile__add-button");function J(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var M=new A({url:"https://mesto.nomoreparties.co/v1/cohort-52",headers:{Authorization:"bf036392-6320-48e8-bc39-fe0e751cfef6","Content-Type":"application/json"}});M.getInitialCards(),M.getID(),M.editProfile(),M.postNewCard(),M.deleteCard(),M.addLike(),M.removeLike(),M.updateAvatar();var G=new L(document.querySelector(".confirm-popup"),(function(e){var t=e.option;api.deleteCard().then((function(){t()})).then((function(){G.close()})).catch((function(e){Promise.reject(e)}))})),H=new g(".popup_image_open"),W=new B({name:".profile__title",information:".profile__subtitle",avatar:".profile__image"}),Y=document.querySelector(".profile__image"),$=document.querySelector(".profile__image-content"),K=new h(document.querySelector(".popup_avatar-change"),(function(e){api.updateAvatar({avatar:e.avatarLinkInput}).then((function(e){return info.setUserInfo(e.name,e.information,e.avatarr)})).then((function(){return K.close()})).catch((function(e){return console.log(e)})).finally((function(){return K.renderLoading(!1)}))})),Q=new h(document.querySelector(".popup_open_edit-window"),(function(e){api.editProfileData({name:e.name,about:e.description}).then((function(e){info.setUserInfo(e.name,e.information,e.avatar)})).then((function(){return Q.close()})).catch((function(e){return console.log(e)})).finally((function(){return Q.renderLoading(!1)}))})),X=new r(D,x),Z=new r(D,F),ee=new r(D,$);function te(e,n){var r=new t({name:e.name,link:e.link},".elements-template",H.open.bind(H),(function(){G.open({id:e._id,func:function(){return r.deleteCard()}})}),(function(t){t?api.removeLike(e._id).then((function(e){r.removeLike(e.likes.length)})).catch((function(e){return console.log(e)})):api.setLike(e._id).then((function(e){r.addLike(e.likes.length)})).catch((function(e){return console.log(e)}))}),n,".elements");return r.createCard()}Y.addEventListener;var ne=new q({renderer:function(e,t){return ne.addItem(te(e,t))}},".elements"),re=document.querySelector(".popup_open_add-window"),oe=new h(re,(function(e){api.addNewCard({name:e.name,link:e.link}).then((function(e){ne.addItem(te(e,e.owner._id),!0)})).then((function(){return oe.close()})).catch((function(e){return console.log(e)})).finally((function(){return oe.renderLoading(!1)}))}));Promise.all([api.getID(),api.getInitialCards()]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],a=!0,c=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){c=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(c)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return J(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?J(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1],a=o._id;info.setUserInfo(res.name,res.information,res.avatar),ne.renderItems(i,a)})).catch((function(e){return console.log(e)})),K.setEventListeners(),G.setEventListeners(),H.setEventListeners(),Q.setEventListeners(),re.setEventListeners(),oe.setEventListeners(),X.enableValidation(),Z.enableValidation(),ee.enableFormValidation(),ne.renderItems(),Y.addEventListener("click",(function(){$.reset(),ee.restartFormValidation(),K.open()})),N.addEventListener("click",(function(){Q.open();var e=W.getUserInfo();z.value=e.name,V.value=e.information,X.resetValidation()})),U.addEventListener("click",(function(){re.open(),Z.resetValidation()}))})();
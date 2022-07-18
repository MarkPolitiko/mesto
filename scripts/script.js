let profileButtonOpener = document.querySelector('.profile__edit-button');
let profileButtonClose = document.querySelector('.edit__close');
let profileForm = document.querySelector('.edit__form');
let profileButtonEdit = document.querySelector('.edit');
let profileName = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__subtitle');
let profileInputName = document.querySelector('.edit__input_type_name');
let profileInputDescription = document.querySelector('.edit__input_type_description');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

function editShow() {
  profileInputName.value = profileName.textContent;
  profileInputDescription.value = profileDescription.textContent;
  profileButtonEdit.classList.add('edit_show');
}

function formSaveChanges(push) {
  push.preventDefault();
  profileName.textContent = profileInputName.value;
  profileDescription.textContent = profileInputDescription.value;
  editClose();
}

function editClose() {
  profileButtonEdit.classList.remove('edit_show');
}

profileButtonOpener.addEventListener('click', editShow);
profileForm.addEventListener('submit', formSaveChanges);
profileButtonClose.addEventListener('click', editClose);





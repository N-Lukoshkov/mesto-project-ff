import './pages/index.css';
// import { initialCards } from './scripts/cards';
import { createCard, likeCard } from './scripts/card';
import { openModal, closeModal } from './scripts/modal.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import {
  getInitialCards,
  getUserProfile,
  updateProfile,
  updateAvatar,
  uploadCard,
  deleteLike,
  addLike,
  apiDeleteCard 
} from './scripts/api.js';

const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const profileInfo = document.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__title');
const profileDescription = profileInfo.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');
const popupUpdateAvatar = document.querySelector('.popup_type_update_avatar');
const formUpdateAvatar = document.querySelector('form[name="update-avatar"]');
const inputUpdateAvatar = document.querySelector('#avatar-link');

const placesList = document.querySelector('.places__list');

const newCardForm = document.querySelector('form[name="new-place"]');
const cardNameInput = newCardForm.elements['place-name'];
const cardLinkInput = newCardForm.elements['link'];
const editProfileForm = document.querySelector('form[name="edit-profile"]');
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_description');

const imagePopup = document.querySelector('.popup_type_image');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

const popupConfirmDelete = document.querySelector('.popup_type_confirm_card_delete');
const deleteButton = popupConfirmDelete.querySelector('.popup__button');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const cardConfig = {
  deleteLike,
  likeCard,
  confirmDelete,
  addLike,
  openImagePopup,
  apiDeleteCard
};

// открытие и закрыьте картинки

function openImagePopup(card) {
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupCaption.textContent = card.name;
  openModal(imagePopup);
}

document.querySelectorAll('.popup__close').forEach(closeButton => {
  closeButton.addEventListener('click', () => { 
    closeModal(closeButton.closest('.popup')); 
  }); 
});

// изменение аватара

profileAvatar.addEventListener('click', () => {
  profileAvatar.classList.add('clicked');
  inputUpdateAvatar.value = '';
  openModal(popupUpdateAvatar);
  clearValidation(formUpdateAvatar, validationConfig);
});

profileAvatar.addEventListener('mouseout', () => profileAvatar.classList.remove('clicked'));

formUpdateAvatar.addEventListener('submit', (evt) => submitUpdateAvatar(evt, inputUpdateAvatar.value));

function submitUpdateAvatar(evt, avatar) {
  evt.preventDefault();
  evt.submitter.textContent = 'Сохранение...'
  updateAvatar(avatar)
    .then((data) => {
      profileAvatar.style.backgroundImage = `url(${data.avatar})`;
      closeModal(popupUpdateAvatar);
    })
    .catch(error => console.log(error))
    .finally(() => {
      evt.submitter.textContent = 'Сохранить';
    })
}

// редактирование профиля

editProfileForm.addEventListener('submit', handleProfileFormSubmit);

editProfileButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editPopup);
  clearValidation(editProfileForm, validationConfig);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  evt.submitter.textContent = 'Сохранение...';
  const name = nameInput.value;
  const description = jobInput.value;
  
  updateProfile(name, description)
    .then((data) => {
      renderProfile(data);
      closeModal(editPopup);
    })
    .catch(err => console.log(err))
    .finally(() => {
      evt.submitter.textContent = 'Сохранить';
    })
}

function renderProfile(res) {
  profileName.textContent = res.name;
  profileDescription.textContent = res.about.replace(/[^а-яА-ЯёЁa-zA-Z \-]+/g, '');
  profileAvatar.style.backgroundImage = `url(${res.avatar})`;
}

// отображение карточек

function renderCards(res, ownerId) {
  res.forEach(newCard => {
    placesList.append(createCard(newCard, ownerId, cardConfig));
  });
}

// добавление новых карточек

addCardButton.addEventListener('click', () => {
  openModal(newCardPopup);
  newCardForm.reset();
  clearValidation(newCardForm, validationConfig);
});

newCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  
  const newCard = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  
  const submitButton = newCardForm.querySelector(validationConfig.submitButtonSelector);
  submitButton.textContent = 'Создание...';
  submitButton.disabled = true;

  uploadCard(newCard)
    .then(data => {
      placesList.prepend(createCard(data, data.owner._id, cardConfig));
      closeModal(newCardPopup);
      newCardForm.reset();
    })
    .catch(err => console.log(err))
    .finally(() => {
      submitButton.textContent = 'Создать';
      submitButton.disabled = false;
    });
});

// удаление карточек

let cardToDelete;

deleteButton.addEventListener('click', (event) => {
    event.preventDefault();
    deleteCard();
});

function deleteCard() {
    apiDeleteCard(cardToDelete.cardId)
        .then(() => {
            cardToDelete.cardElement.remove();
            closeModal(popupConfirmDelete)
        })
        .catch(error => console.log(error));
}

function confirmDelete(cardElement, cardId) {
    openModal(popupConfirmDelete);
    cardToDelete = {
        "cardId": cardId,
        "cardElement": cardElement
    }
}

enableValidation(validationConfig);

Promise.all([getUserProfile(), getInitialCards()])
  .then(data => {
    renderProfile(data[0]);
    renderCards(data[1], data[0]._id);
  })
  .catch(err => console.log(err));

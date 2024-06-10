import './pages/index.css';
import { initialCards } from './scripts/cards';
import { createCard, deleteCard, likeCard } from './scripts/card';
import { openModal, closeModal } from './scripts/modal.js';

const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const placesList = document.querySelector('.places__list');

const newCardForm = document.querySelector('form[name="new-place"]');
const inputNameCard = document.querySelector('.popup__input_type_card-name');
const inputLinkCard = document.querySelector('.popup__input_type_url');
const editProfileForm = document.querySelector('form[name="edit-profile"]');

const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_description');

const imagePopup = document.querySelector('.popup_type_image');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

function openImagePopup(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(imagePopup);
  closePopupButton(imagePopup);
};

function closePopupButton(popup) {
  const closeButton = popup.querySelector('.popup__close');
  if (closeButton) {
    closeButton.addEventListener('click', () => closeModal(popup));
  };
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  profileName.textContent = nameValue;
  profileDescription.textContent = jobValue;

  closeModal(editPopup);
};

editProfileForm.addEventListener('submit', handleProfileFormSubmit);

editProfileButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editPopup);
  closePopupButton(editPopup);
});

addCardButton.addEventListener('click', () => {
  openModal(newCardPopup);
  closePopupButton(newCardPopup);
});

newCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newCard = {
    name: inputNameCard.value,
    link: inputLinkCard.value,
  };
  placesList.prepend(createCard(newCard, deleteCard, likeCard));
  closeModal(newCardPopup);
  newCardForm.reset();
});

initialCards.forEach(card => {
  placesList.append(createCard(card, deleteCard, likeCard, openImagePopup));
});
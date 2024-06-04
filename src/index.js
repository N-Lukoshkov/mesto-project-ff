import './pages/index.css';
import { initialCards } from './scripts/cards';
import { createCard, deleteCard, likeCard } from './scripts/card';
import { openModal, closeModal } from './scripts/modal.js';

const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const newCardForm = document.querySelector('form[name="new-place"]');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const placesList = document.querySelector('.places__list');

const formElement = document.querySelector('form[name="edit-profile"]');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

function handleFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  const profileName = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  profileName.textContent = nameValue;
  profileDescription.textContent = jobValue;

  closeModal(document.querySelector('.popup_type_edit'));
}

formElement.addEventListener('submit', handleFormSubmit);

editProfileButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(document.querySelector('.popup_type_edit'));
});

addCardButton.addEventListener('click', () => {
  newCardForm.reset();
  openModal(document.querySelector('.popup_type_new-card'));
});

newCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newCard = {
    name: newCardForm.querySelector('.popup__input_type_card-name').value,
    link: newCardForm.querySelector('.popup__input_type_url').value,
  };
  placesList.prepend(createCard(newCard, deleteCard, likeCard));
  closeModal(document.querySelector('.popup_type_new-card'));
});

initialCards.forEach(card => {
  placesList.append(createCard(card, deleteCard, likeCard));
});
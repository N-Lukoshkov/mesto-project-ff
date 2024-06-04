import { openModal } from './modal.js';

export function createCard(card, deleteCard, likeCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  const cardDeleteButton = cardItem.querySelector('.card__delete-button');
  const cardTitle = cardItem.querySelector('.card__title');
  const cardLikeButton = cardItem.querySelector('.card__like-button'); 
  
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  cardDeleteButton.addEventListener('click', function() {
    deleteCard(cardItem);
  });
  cardLikeButton.addEventListener('click', function() {
    likeCard(cardLikeButton);
  });
  cardImage.addEventListener('click', function() {
    openImagePopup(card.link, card.name);
  });
  
  return cardItem;
};

export function deleteCard(cardItem) {
  cardItem.remove();
};

export function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
};

function openImagePopup(link, name) {
  const imagePopup = document.querySelector('.popup_type_image');
  const popupImage = imagePopup.querySelector('.popup__image');
  const popupCaption = imagePopup.querySelector('.popup__caption');

  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openModal(imagePopup);
};
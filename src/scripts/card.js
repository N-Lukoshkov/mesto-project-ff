export function createCard(card, deleteCard, likeCard, openImagePopup) {
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
export function createCard(card, ownerId, cardConfig) {  
  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  const cardDeleteButton = cardItem.querySelector('.card__delete-button');
  const cardTitle = cardItem.querySelector('.card__title');
  const cardLikeButton = cardItem.querySelector('.card__like-button'); 
  const likeCounter = cardItem.querySelector('.card__like-counter')
  const cardId = card._id;

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  if (card.owner._id !== ownerId) {
    cardDeleteButton.remove();
  } else {
    cardDeleteButton.addEventListener('click', () => cardConfig.confirmDelete(cardItem, cardId));
  }

  cardLikeButton.addEventListener('click', (evt) => cardConfig.likeCard(evt, cardId, cardConfig));
  
  likeCounter.textContent = card.likes.length === 0 ? '' : card.likes.length;
  if (card.likes.some(like => like._id === ownerId)) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  cardImage.addEventListener('click', function() {
    cardConfig.openImagePopup(card);
  });
  
  return cardItem;
};

export const likeCard = (evt, cardId, cardConfig) => {
  const cardLikeButton = evt.target;
  const card = cardLikeButton.closest('.card');
  const likes = card.querySelector('.card__like-counter');

  if (cardLikeButton.classList.contains('card__like-button_is-active')) {
    cardConfig.deleteLike(cardId)
      .then(data => {
        cardLikeButton.classList.toggle('card__like-button_is-active');
        likes.textContent = data.likes.length === 0 ? '' : data.likes.length;
      })
      .catch(error => console.log(error));
  } else {
    cardConfig.addLike(cardId)
      .then(data => {
        cardLikeButton.classList.toggle('card__like-button_is-active');
        likes.textContent = data.likes.length === 0 ? '' : data.likes.length;
      })
      .catch(error => console.log(error));
  }
};
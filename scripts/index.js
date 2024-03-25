function createCard (card, deleteCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  const cardDeleteButton = cardItem.querySelector('.card__delete-button');
  const cardTitle = cardItem.querySelector('.card__title');
    
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  cardDeleteButton.addEventListener ('click', function() {
    deleteCard(cardItem);
  });

  return cardItem;
}

function deleteCard (cardItem) {
  cardItem.remove();
}

function showCards (cards) {
  const placesList = document.querySelector('.places__list');

  cards.forEach(function(card) {
    const cardItem = createCard(card, deleteCard);
    placesList.appendChild(cardItem);
  });
}

showCards(initialCards);



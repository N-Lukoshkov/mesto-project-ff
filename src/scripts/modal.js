export function openModal(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalOnEsc);
  modal.addEventListener('click', closeModalOnOverlay);
};

export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalOnEsc);
  modal.removeEventListener('click', closeModalOnOverlay);
};

function closeModalOnEsc(evt) {
  if (evt.key === 'Escape') {
    const openModal = document.querySelector('.popup_is-opened');
    if (openModal) {
      closeModal(openModal);
    }
  }
};

function closeModalOnOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closeModal(evt.target);
  }
};

document.querySelectorAll('.popup__close').forEach(closeButton => {
  closeButton.addEventListener('click', () => {
    const popup = closeButton.closest('.popup');
    closeModal(popup);
  });
});
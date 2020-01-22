class Modal {
  constructor(selector = '.toggleModal') {
    this.selector = selector;
  }

  events() {
    const {selector} = this;
    const modalsBtn = document.querySelectorAll(selector);
    modalsBtn.forEach((modalBtn) => {
      modalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = document.querySelector(`[data-modal-name="${e.currentTarget.dataset.modal}"]`);
        modal.classList.add('show');
        modal.addEventListener('click', (e) => {
          if (e.target.className === 'modal show') {
            modal.classList.remove('show');
          }
        });
      });
    });
  }

  init() {
    this.events();
  }
}

export default Modal;

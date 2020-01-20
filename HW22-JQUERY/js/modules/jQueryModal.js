import '../../../node_modules/jquery/dist/jquery.min.js';

(function ($) {
  $.fn.jQueryModal = function (options) {
    const settings = $.extend({
      message: 'Subscribe to this blog and be the first to know about updates',
      type: 'info',
      buttons: 1,
      autoShow: false,
    }, options);

    const privateSettings = {
      selectors: {
        body: 'body',
        name: 'jQueryModal',
      },
      classes: {
        modal: 'modal',
        content: 'modal__content',
        close: 'close',
        show: 'show',
        delete: 'delete',
        lock: 'lock',
      },
      isModalInit: false,
      templates: {
        primary: `<div class="modal" data-modal="jQueryModal">
  <div class="modal__content">
  <span class="modal__close close">X</span>
  <h2 class="modal__title">${settings.message}</h2>
  <input class="field__submit btn close" type="submit" value="Ok">
  </div>
</div>`,
        secondary: `<div class="modal" data-modal="jQueryModal">
  <div class="modal__content">
  <span class="modal__close close">X</span>
  <h2 class="modal__title">${settings.message}</h2>
  <input class="field__submit btn btn--filled close" type="submit" value="Cancel">
  <input class="field__submit btn delete" type="submit" value="Ok">
  </div>
</div>`,
      },
    };
    const {selectors, classes, templates} = privateSettings;

    const initModal = (e) => {
      if (e) {
        e.preventDefault();
        privateSettings.postID = e.target.dataset.id;
      }
      if (settings.buttons === 1) {
        $(selectors.body).append(templates.primary);
      } else {
        $(selectors.body).append(templates.secondary);
      }
      privateSettings.modal = $(`[data-modal="${selectors.name}"]`);
      setTimeout(() => {
        // show modal with animation
        this.blur();
        privateSettings.modal.addClass(settings.type).addClass(classes.show);
        $(selectors.body).addClass(classes.lock);

        // close modal
        privateSettings.modal.on('click', closeModal);
        $(selectors.body).on('keyup', closeModal);
        $(`.${classes.delete}`).on('click', deletePost);
      }, 100);
    };

    const deletePost = () => {
      // eslint-disable-next-line no-console
      console.log(`Post: ${privateSettings.postID}, remove`);
    };

    const closeModal = (e) => {
      if (e.type === 'keyup') {
        if (e.which === 27) {
          privateSettings.modal.last().removeClass(classes.show);
          $(selectors.body).removeClass(classes.lock);
          setTimeout(() => {
            privateSettings.modal.last().remove();
            $(selectors.body).off('keyup', closeModal);
          }, 300);
        }
      } else {
        const modalContent = privateSettings.modal.last().find(`.${classes.content}`);
        if (checkElement(e, modalContent)) {
          privateSettings.modal.last().removeClass(classes.show);
          $(selectors.body).removeClass(classes.lock);
          setTimeout(() => {
            privateSettings.modal.last().remove();
            privateSettings.modal.off('click', closeModal);
          }, 300);
        }
      }

      privateSettings.isModalInit = false;
    };

    const checkElement = (e, element) => !element.is(e.target) && element.has(e.target).length === 0 || $(e.target).is(`.${classes.close}`) || $(e.target).is(`.${classes.delete}`);

    const actions = (index, element) => {
      if (settings.autoShow) {
        setTimeout(() => {
          privateSettings.isModalInit = false;
          initModal();
        }, 10000);
      } else {
        $(element).on('click', initModal);
      }
    };

    return this.each(actions);
  };
// eslint-disable-next-line no-undef
})(jQuery);

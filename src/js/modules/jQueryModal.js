import '../../../node_modules/jquery/dist/jquery.min.js';

(function ($) {
  $.fn.jQueryModal = function (options) {
    const settings = $.extend({
      message: 'Subscribe to this blog and be the first to know about updates',
      type: 'info',
      buttons: 1,
      autoShow: false,
      update: false,
    }, options);

    const privateSettings = {
      selectors: {
        body: 'body',
        name: 'jQueryModal',
      },
      classes: {
        content: 'modal__content',
        close: 'close',
        show: 'show',
        delete: 'delete',
        update: 'update',
        lock: 'lock',
      },
    };
    const {selectors, classes} = privateSettings;

    const getButtons = () => {
      const buttonAction = settings.update ? classes.update : classes.delete;
      return settings.buttons === 1
        ? '<input class="field__submit btn close" type="submit" value="Ok">'
        : `<input class="field__submit btn btn--filled close" type="submit" value="Cancel">
           <input class="field__submit btn ${buttonAction}" type="submit" value="Ok">`;
    };

    const getTemplate = () => {
      return settings.update
        ? `<div class="modal" data-modal="jQueryModal">
          <div class="modal__content">
          <span class="modal__close close">X</span>
          <h2 class="modal__title">${settings.message}</h2>
          <div class="form-wrapper">
          <div class="form__fields no-padding">
          <div class="field">
            <label
            class="field__label"
            >Article description
            <textarea
            class="field__textarea"
            name="article_description_update"
            class="article_description_update"
            placeholder="Since leaving day-to-day operations at Microsoft, Gates has continued his philanthropy and works on other projects." required></textarea></label>
          </div>
          </div>
          </div>
          ${getButtons()}
          </div>
        </div>`
        : `<div class="modal" data-modal="jQueryModal">
          <div class="modal__content">
          <span class="modal__close close">X</span>
          <h2 class="modal__title">${settings.message}</h2>
          ${getButtons()}
          </div>
        </div>`;
    };

    const initModal = (e) => {
      if (e) {
        e.preventDefault();
        privateSettings.postID = e.target.dataset.id;
      }
      $(selectors.body).append(getTemplate());
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
        $(`.${classes.update}`).on('click', updatePost);
      }, 100);
    };

    const deletePost = () => {
      $.ajax({
        method: 'delete',
        url: `http://localhost:3000/api/articles/${privateSettings.postID}`,
      }).done(() => {
        location.reload();
      });
    };

    const updatePost = () => {
      const updateValue = privateSettings.modal.find('.field__textarea').val();
      $.ajax({
        method: 'put',
        url: `http://localhost:3000/api/articles/${privateSettings.postID}`,
        data: {
          description: updateValue,
        },
      }).done(() => {
        location.reload();
      });
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
    };

    const checkElement = (e, element) => !element.is(e.target) && element.has(e.target).length === 0 || $(e.target).is(`.${classes.close}`) || $(e.target).is(`.${classes.delete}`);

    const actions = (index, element) => {
      if (settings.autoShow) {
        setTimeout(() => {
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

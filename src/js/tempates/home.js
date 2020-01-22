export default {
  aboutUs: {
    selector: '#about-us .about-us__items',
    main: (data) => {
      return `<section class="about-us" id="about-us">
                <div class="container">
                    <h2 class="about-us__title">${data.title}</h2>
                    <div class="about-us__sub-title">
                        ${data.subTitle}
                    </div>
                    <div class="row">
                        <div class="about-us__items"></div>
                        <div class="about-us__video">
                            <video class="player" src="${data.video.src}" controls poster="${data.video.poster}">
                                Sorry, your browser doesn't support embedded videos,
                                but don't worry, you can <a href="${data.video.src}">download it</a>
                                and watch it with your favorite video player!
                            </video>
                            <span class="play"></span>
                        </div>
                    </div>
                </div>
            </section>`;
    },
    item: (data) => {
      return `<div class="item
        ${data.background === 'secondary' ? 'item--secondary' : ''}
        ${data.background === 'third' ? 'item--third' : ''}
        ${data.anglePosition === 'left' ? 'item--left' : ''}">
        <img class="item__img" src="${data.img}" alt="img">
        <span class="item__title">${data.title}</span>
    </div>`;
    },
  },
  latestPosts: {
    selector: '#latest-posts .latest-posts__list',
    main: (data) => {
      return `<section class="latest-posts" id="latest-posts">
                <div class="container">
                    <h2 class="latest-posts__title">${data.title}</h2>
                    <div class="latest-posts__sub-title">
                        ${data.subTitle}
                    </div>
                    <div class="latest-posts__slider">
                        <div class="row latest-posts__list slider__list"></div>
                    </div>
                </div>
            </section>`;
    },
    item: (data) => {
      return `<div class="latest-posts__post-wrapper slide">
                <div class="post">
                    <div class="post__thumbnail">
                        <a class="link" href="${data.link}">
                            <img class="img" src="${data.img}" alt="img">
                        </a>
                    </div>
                    <a href="./post.html" class="post__title">
                        ${data.title}
                    </a>
                    <div class="post__description">
                        ${data.description}
                    </div>
                    <div class="post__info">
                        <span class="date">${data.info.date}</span>
                        <span class="long">${data.info.long}</span>
                        <span class="comments">${data.info.comments}</span>
                    </div>
                </div>
            </div>`;
    },
  },
  latestPortfolio: {
    selector: '#latest-portfolio .slider__list',
    main: (data) => {
      return `<section class="latest-portfolio" id="latest-portfolio">
                <div class="container">
                    <h2 class="latest-portfolio__title">${data.title}</h2>
                    <div class="latest-portfolio__sub-title">
                        ${data.subTitle}
                    </div>
                    <div class="slider latest-portfolio__slider">
                        <div class="slider__list row"></div>
                    </div>
                    <button class="latest-portfolio__show-all btn">${data.btn.text}</button>
                </div>
            </section>`;
    },
    item: (data) => {
      return `<div class="latest-portfolio__item-wrapper slide">
                <div class="item">
                    <span class="item__overlay"></span>
                    <img src="${data.img}" alt="img" class="item__thumbnail">
                    <a href="${data.link}" class="item__permalink"></a>
                    <div class="item__description">
                        <div class="title">${data.title}</div>
                        <div class="sub-title">${data.subTitle}</div>
                    </div>
                    <div class="item__controls">
                        <span class="link"></span>
                        <span class="zoom"></span>
                    </div>
                </div>
            </div>`;
    },
  },
  testimonials: {
    selector: '#testimonials .slider__list',
    main: (data) => {
      return `<section class="testimonials" id="testimonials">
                <div class="container">
                    <h2 class="testimonials__title">${data.title}</h2>
                    <div class="testimonials__slider slider">
                        <div class="slider__list"></div>
                        <div class="slider__control">
                            <div class="prev"></div>
                            <div class="next"></div>
                        </div>
                    </div>
                </div>
            </section>`;
    },
    item: (data) => {
      return `<div class="testimonials__slide slide">
                <div class="testimonials__slide-inner">
                  <div class="testimonial-description">
                      <div class="testimonial-description__comment">
                          ${data.author.comment}
                      </div>
                      <div class="testimonial-description__customer-name">
                           ${data.author.name}
                      </div>
                      <div class="testimonial-description__customer-position">
                           ${data.author.position}
                      </div>
                  </div>
                  <div class="testimonial-image">
                      <img src=" ${data.img}" alt="img">
                  </div>
                </div>
            </div>`;
    },
  },
  contactUs: {
    selector: '#contact-us .description__items',
    selectorSocial: '#contact-us .contact-us__socials',
    selectorForm: '#contact-us .fields-wrapper',
    main: (data) => {
      return `<section class="contact-us" id="contact-us">
                <div class="container">
                    <h2 class="contact-us__title">
                        ${data.title}
                    </h2>
                    <div class="contact-us__sub-title">
                        ${data.subTitle}
                    </div>
                    <div class="contact-us__socials"></div>
                </div>
                <div class="contact-us__detail">
                    <div class="container">
                        <div class="row">
                            <div class="description">
                                <div class="description__title">
                                    ${data.details.title}
                                </div>
                                <div class="description__items"></div>
                            </div>
                            <div class="form-wrapper">
                                <form class="form" action="/">
                                    <div class="form__title">
                                        ${data.form.title}
                                    </div>
                                    <div class="form__content">
                                        <div class="form__fields">
                                            <div class="fields-wrapper"></div>
                                            <div class="info">
                                                ${data.form.info.text} <a href="${data.form.info.link}"><strong>${data.form.info.link}</strong></a>
                                            </div>
                                        </div>
                                        <div class="form__map">
                                            <img src="./img/map.png" alt="img">
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>`;
    },
    item: (data) => {
      return `<div class="item">
                <div class="item__title">
                    ${data.number}. <strong>${data.title}</strong>
                </div>
                <div class="item__description">
                    ${data.description}
                </div>
              </div>`;
    },
    itemSocial: (data) => {
      return `<a href="${data.link}" class="link link--${data.title}"></a>`;
    },
    itemForm: (data) => {
      if (data.type === 'submit') {
        return `<div class="field">
                  <input class="field__submit btn btn--filled" type="${data.type}" value="${data.value}">
                </div>`;
      } else {
        return `<div class="field">
                  <label class="field__label" for="${data.name}">${data.label}</label>
                  <input class="field__input" type="${data.type}" name="${data.name}" id="${data.name}">
                </div>`;
      }
    },
  },
};

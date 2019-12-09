export default {
  post: {
    selector: '#post .socials',
    main: (data) => {
      return `<div class="container" id="post">
                <div class="row post-page-wrapper">
                    <div class="single-post-wrapper">
                        <main class="single-post">
                            <h1 class="single-post__title">
                                ${data.title}
                            </h1>
                            <div class="single-post__head">
                                <img class="avatar" src="${data.head.avatar}" alt="img">
                                <div class="title">${data.head.title}</div>
                                <div class="info">
                                    <span class="date">${data.head.info.date}</span>
                                    <span class="long">${data.head.info.long}</span>
                                    <span class="comments">${data.head.info.comments}</span>
                                    <span class="rating">
                                        <span class="rating__star ${data.head.info.rating[0].state}"></span>
                                        <span class="rating__star rating__star--${data.head.info.rating[1].state}"></span>
                                        <span class="rating__star rating__star--${data.head.info.rating[2].state}"></span>
                                        <span class="rating__star rating__star--${data.head.info.rating[3].state}"></span>
                                        <span class="rating__star rating__star--${data.head.info.rating[4].state}"></span>
                                    </span>
                                </div>
                            </div>
                            <img class="single-post__thumbnail" src="${data.thumbnail}" alt="img">
                            <div class="single-post__body">
                                <audio class="audio-player" controls>
                                    <source src="${data.body.source}" type="audio/mpeg">
                                    <p>Ваш браузер не поддерживает HTML5 аудио. Вот взамен
                                        <a href="${data.body.source}">ссылка на аудио</a></p>
                                </audio>
                                <div class="content">${data.body.content}</div>
                            </div>
                            <div class="single-post__footer">
                                <div class="likes">
                                    <span class="likes__icon"></span>
                                    <span class="likes__count">${data.footer.likes}</span>
                                    likes
                                </div>
                                <div class="socials"></div>
                            </div>
                        </main>
                    </div>
            </div>`;
    },
    itemSocial: (data) => {
      return `<a href="${data.link}" class="link link--${data.title}"></a>`;
    },
  },
  reviews: {
    parentSelector: '.single-post-wrapper',
    selector: '#reviews .reviews__items',
    main: (data) => {
      return `<div class="reviews" id="reviews">
                <h2 class="reviews__title">${data.title}</h2>
                <div class="reviews__items">
                    <span class="line"></span>
                </div>
                <a class="reviews__btn btn" href="${data.btn.url}">${data.btn.text}</a>
              </div>`;
    },
    item: (data) => {
      return ` <div class="reviews__item">
                  <img class="avatar" src="${data.img}" alt="img">
                  <div class="comment">
                      <div class="comment__head">
                          <div class="title">
                              ${data.title}
                              <span class="rating">
                                  <span class="rating__star ${data.rating[0].state}"></span>
                                  <span class="rating__star ${data.rating[1].state}"></span>
                                  <span class="rating__star ${data.rating[2].state}"></span>
                                  <span class="rating__star ${data.rating[3].state}"></span>
                                  <span class="rating__star ${data.rating[4].state}"></span>
                              </span>
                          </div>
                          <div class="date">${data.date}</div>
                      </div>
                      <div class="comment__body">
                          ${data.comment}
                      </div>
                      <div class="comment__footer">
                          <a class="comment__link" href="${data.link.url}">${data.link.text}</a>
                      </div>
                  </div>
              </div>`;
    },
  },
  widgets: {
    parentSelector: '#post .post-page-wrapper',
    selector: '#widgets',
    main: () => {
      return '<aside class="widgets" id="widgets"></aside>';
    },
    item: (data) => {
      if (data.type === 'latestPosts') {
        return ` <div class="widget">
                    <h2 class="widget__title">${data.title}</h2>
                    <div class="widget__content">
                        ${data.content}
                        <div class="post-read-more">
                            <a href="${data.btn.url}" class="btn">${data.btn.text}</a>
                        </div>
                    </div>
                  </div>`;
      } else {
        return `<div class="widget">
                  <h2 class="widget__title">${data.title}</h2>
                  <div class="widget__content">
                      ${data.content}
                  </div>
                </div>`;
      }
    },
  },
};

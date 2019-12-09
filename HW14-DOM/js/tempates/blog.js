export default {
  blog: {
    selector: '#blog .blog__content',
    main: (data) => {
      return `<section class="blog" id="blog">
                <div class="container">
                    <h2 class="blog__title">${data.title}</h2>
                    <div class="search search--right">
                        <input class="search__input" type="search" placeholder="${data.search.placeholder}">
                        <input class="search__submit" type="submit">
                    </div>
                    <div class="blog__content"></div>
                    <div class="blog__read-more">
                        <a href="${data.btn.url}" class="btn btn--filled">${data.btn.text}</a>
                    </div>
                </div>
            </section>`;
    },
    item: (data) => {
      switch (data.type) {
        case 'video':
          return `<div class="blog-post blog-post--video">
                    <div class="blog-post__preview">
                        <video class="player" src="${data.preview.src}" controls poster="${data.preview.poster}">
                            Sorry, your browser doesn't support embedded videos,
                            but don't worry, you can <a href="${data.preview.src}">download it</a>
                            and watch it with your favorite video player!
                        </video>
                        <span class="play"></span>
                    </div>
                    <div class="blog-post__detail">
                        <div class="blog-post__head">
                            <img class="avatar" src="${data.head.avatar}" alt="img">
                            <div class="title">${data.head.title}</div>
                            <div class="info">
                                <span class="date">${data.head.info.date}</span>
                                <span class="long">${data.head.info.long}</span>
                                <span class="comments">${data.head.info.comments}</span>
                                <span class="rating">
                                    <span class="rating__star ${data.head.info.rating[0].state}"></span>
                                    <span class="rating__star ${data.head.info.rating[1].state}"></span>
                                    <span class="rating__star rating__star--${data.head.info.rating[2].state}"></span>
                                    <span class="rating__star rating__star--${data.head.info.rating[3].state}"></span>
                                    <span class="rating__star rating__star--${data.head.info.rating[4].state}"></span>
                                </span>
                            </div>
                        </div>
                        <div class="blog-post__body">
                            <div class="title">${data.body.title}</div>
                            <div class="description">
                                ${data.body.description}
                            </div>
                            <a href="${data.body.link.url}" class="btn">${data.body.link.text}</a>
                        </div>
                    </div>
                </div>`;
        case 'music':
          return `<div class="blog-post blog-post--music">
                    <div class="blog-post__preview">
                        <img class="thumbnail" src="${data.preview.poster}" alt="img">
                    </div>
                    <div class="blog-post__detail">
                        <div class="blog-post__head">
                            <img class="avatar" src="${data.head.avatar}" alt="img">
                            <div class="title">${data.head.title}</div>
                            <div class="info">
                                <span class="date">${data.head.info.date}</span>
                                <span class="long">${data.head.info.long}</span>
                                <span class="comments">${data.head.info.comments}</span>
                                <span class="rating">
                                    <span class="rating__star ${data.head.info.rating[0].state}"></span>
                                    <span class="rating__star ${data.head.info.rating[1].state}"></span>
                                    <span class="rating__star rating__star--${data.head.info.rating[2].state}"></span>
                                    <span class="rating__star rating__star--${data.head.info.rating[3].state}"></span>
                                    <span class="rating__star rating__star--${data.head.info.rating[4].state}"></span>
                                </span>
                            </div>
                        </div>
                        <div class="blog-post__body">
                            <div class="title">${data.body.title}</div>
                            <audio class="audio-player" controls>
                                <source src="${data.preview.src}" type="audio/mpeg">
                                <p>Ваш браузер не поддерживает HTML5 аудио. Вот взамен
                                    <a href="${data.preview.src}">ссылка на аудио</a></p>
                            </audio>
                            <div class="description">
                                ${data.body.description}
                            </div>
                            <a href="${data.body.link.url}" class="btn">${data.body.link.text}</a>
                        </div>
                    </div>
                </div>`;
        case 'image':
          return `<div class="blog-post blog-post--image">
                    <div class="blog-post__preview">
                        <img class="thumbnail" src="${data.preview.poster}" alt="img">
                    </div>
                    <div class="blog-post__detail">
                        <div class="blog-post__head">
                            <img class="avatar" src="${data.head.avatar}" alt="img">
                            <div class="title">${data.head.title}</div>
                            <div class="info">
                                <span class="date">${data.head.info.date}</span>
                                <span class="long">${data.head.info.long}</span>
                                <span class="comments">${data.head.info.comments}</span>
                                <span class="rating">
                                    <span class="rating__star ${data.head.info.rating[0].state}"></span>
                                    <span class="rating__star ${data.head.info.rating[1].state}"></span>
                                    <span class="rating__star rating__star--${data.head.info.rating[2].state}"></span>
                                    <span class="rating__star rating__star--${data.head.info.rating[3].state}"></span>
                                    <span class="rating__star rating__star--${data.head.info.rating[4].state}"></span>
                                </span>
                            </div>
                        </div>
                         <div class="blog-post__body">
                            <div class="title">${data.body.title}</div>
                            <div class="description">
                                ${data.body.description}
                            </div>
                            <a href="${data.body.link.url}" class="btn">${data.body.link.text}</a>
                        </div>
                    </div>
                </div>`;
        default:
          return `<div class="blog-post">
                    <div class="blog-post__detail">
                       <div class="blog-post__head">
                            <img class="avatar" src="${data.head.avatar}" alt="img">
                            <div class="title">${data.head.title}</div>
                            <div class="info">
                                <span class="date">${data.head.info.date}</span>
                                <span class="long">${data.head.info.long}</span>
                                <span class="comments">${data.head.info.comments}</span>
                                <span class="rating">
                                    <span class="rating__star ${data.head.info.rating[0].state}"></span>
                                    <span class="rating__star ${data.head.info.rating[1].state}"></span>
                                    <span class="rating__star rating__star--${data.head.info.rating[2].state}"></span>
                                    <span class="rating__star rating__star--${data.head.info.rating[3].state}"></span>
                                    <span class="rating__star rating__star--${data.head.info.rating[4].state}"></span>
                                </span>
                            </div>
                        </div>
                         <div class="blog-post__body">
                            <div class="title">${data.body.title}</div>
                            <div class="description">
                                ${data.body.description}
                            </div>
                            <a href="${data.body.link.url}" class="btn">${data.body.link.text}</a>
                        </div>
                    </div>
                </div>`;
      }
    },
  },
};

export default {
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
};

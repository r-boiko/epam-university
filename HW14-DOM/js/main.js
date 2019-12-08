// import data
import homeData from './data/home.js';
// import blogData from './data/blog.js';
// import postData from './data/post.js';

// import templates
import homeTemplate from './tempates/home.js';

function renderSection(func, data) {
  const element = document.createElement('div');
  element.innerHTML = func(data);
  document.querySelector('body').append(element);
}

function renderSectionItems(selector, func, data) {
  const element = document.createElement('div');
  data.forEach((item) => {
    element.insertAdjacentHTML('beforeend', func(item));
  });
  document.querySelector(selector).append(element);
}

if (document.querySelector('.home')) {
  renderSection(homeTemplate.main, homeData.aboutUs);
  renderSectionItems('.about-us__items', homeTemplate.item, homeData.aboutUs.items);
}

// import data
import homeData from './data/home.js';
// import blogData from './data/blog.js';
// import postData from './data/post.js';

// import templates
import homeTemplate from './tempates/home.js';

// variables
const selectors = {
  root: 'root',
  home: '.home',
  aboutUsItems: '.about-us__items',
};
const root = document.getElementById(selectors.root);

// functions
function renderSection(func, data) {
  const element = document.createElement('div');
  element.innerHTML = func(data);
  root.append(element);
}

function renderSectionItems(selector, func, data) {
  const element = document.createElement('div');
  data.forEach((item) => {
    element.insertAdjacentHTML('beforeend', func(item));
  });
  root.querySelector(selector).append(element);
}

// init
if (document.querySelector(selectors.home)) {
  const {aboutUs} = homeData;

  renderSection(homeTemplate.main, aboutUs);
  renderSectionItems(selectors.aboutUsItems, homeTemplate.item, aboutUs.items);
}

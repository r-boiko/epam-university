// import data
import homeData from './data/home.js';
import blogData from './data/blog.js';
import postData from './data/post.js';

// import templates
import homeTemplate from './tempates/home.js';
import blogTemplate from './tempates/blog.js';
import postTemplate from './tempates/post.js';

// variables
const selectors = {
  root: 'root',
  home: '.home-page',
  blog: '.blog-page',
  post: '.post-page',
};
const root = document.getElementById(selectors.root);

// functions
function renderSection(func, data, selector) {
  const element = document.createElement('div');
  element.innerHTML = func(data);
  if (selector) {
    document.querySelector(selector).insertAdjacentHTML('beforeend', element.innerHTML);
  } else {
    root.insertAdjacentHTML('beforeend', element.innerHTML);
  }
}

function renderSectionItems(selector, func, data) {
  const element = document.createElement('div');
  data.forEach((item) => {
    element.insertAdjacentHTML('beforeend', func(item));
  });
  root.querySelector(selector).insertAdjacentHTML('beforeend', element.innerHTML);
}

// init
if (document.querySelector(selectors.home)) {
  Object.keys(homeData).forEach((item) => {
    if (item === 'contactUs') {
      renderSection(homeTemplate[item].main, homeData[item]);
      renderSectionItems(homeTemplate[item].selector, homeTemplate[item].item, homeData[item].details.items);
      renderSectionItems(homeTemplate[item].selectorSocial, homeTemplate[item].itemSocial, homeData[item].socials);
      renderSectionItems(homeTemplate[item].selectorForm, homeTemplate[item].itemForm, homeData[item].form.fields);
    } else {
      renderSection(homeTemplate[item].main, homeData[item]);
      renderSectionItems(homeTemplate[item].selector, homeTemplate[item].item, homeData[item].items);
    }
  });
}
if (document.querySelector(selectors.blog)) {
  Object.keys(blogData).forEach((item) => {
    renderSection(blogTemplate[item].main, blogData[item]);
    renderSectionItems(blogTemplate[item].selector, blogTemplate[item].item, blogData[item].items);
  });
}
if (document.querySelector(selectors.post)) {
  Object.keys(postData).forEach((item) => {
    if (item === 'post') {
      renderSection(postTemplate[item].main, postData[item]);
      renderSectionItems(postTemplate[item].selector, postTemplate[item].itemSocial, postData[item].footer.socials);
    } else if (item === 'reviews') {
      renderSection(postTemplate[item].main, postData[item], postTemplate[item].parentSelector);
      renderSectionItems(postTemplate[item].selector, postTemplate[item].item, postData[item].items);
    } else {
      renderSection(postTemplate[item].main, postData[item], postTemplate[item].parentSelector);
      renderSectionItems(postTemplate[item].selector, postTemplate[item].item, postData[item]);
    }
  });
}

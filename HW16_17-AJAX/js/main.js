// import modules
import Slider from './modules/slider.js';
import Modal from './modules/modal.js';
import validateTitle from './modules/validateTitle.js';

// import data
import homeData from './data/home.js';
import blogData from './data/blog.js';
import postData from './data/post.js';

// import templates
import homeTemplate from './tempates/home.js';
import blogTemplate from './tempates/blog.js';
import postTemplate from './tempates/post.js';
import articleTemplate from './tempates/article.js';

// variables
const selectors = {
  root: 'root',
  home: '.home-page',
  blog: '.blog-page',
  post: '.post-page',
  singlePostWrapper: '.single-post',
  sliders: {
    portfolio: '.latest-portfolio__slider',
  },
  forms: {
    createArticle: '#create-article',
  },
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

function generateRandomID() {
  return Math.floor(Math.random() * (1000 - 1)) + 1000;
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

    const latestPostID = localStorage.getItem('latestPostID');
    if (latestPostID) {
      const api = 'http://localhost:3000/';
      const articlesListQuery = 'api/list';
      const response = fetch(api + articlesListQuery, {
        method: 'GET',
      });
      response.then((data) => data.json()).then((data) => {
        renderSectionItems(blogTemplate[item].selector, blogTemplate[item].item, data);
      });
    }
  });
}
if (document.querySelector(selectors.post)) {
  Object.keys(postData).forEach((item) => {
    if (item === 'post') {
      renderSection(postTemplate[item].main, postData[item]);
      renderSectionItems(postTemplate[item].selector, postTemplate[item].itemSocial, postData[item].footer.socials);

      const latestPostID = localStorage.getItem('latestPostID');
      if (latestPostID) {
        const api = 'http://localhost:3000/';
        const articleByIdQuery = 'api/list/';
        const response = fetch(api + articleByIdQuery + latestPostID, {
          method: 'GET',
        });
        response.then((data) => data.json()).then((data) => {
          document.querySelector(selectors.singlePostWrapper).innerHTML = '';
          renderSection(postTemplate[item].main, data, selectors.singlePostWrapper);
        });
      }
    } else if (item === 'reviews') {
      renderSection(postTemplate[item].main, postData[item], postTemplate[item].parentSelector);
      renderSectionItems(postTemplate[item].selector, postTemplate[item].item, postData[item].items);
    } else {
      renderSection(postTemplate[item].main, postData[item], postTemplate[item].parentSelector);
      renderSectionItems(postTemplate[item].selector, postTemplate[item].item, postData[item]);
    }
  });
}

// init slider
if (document.querySelector(selectors.sliders.portfolio)) {
  const slider = new Slider(selectors.sliders.portfolio);
  slider.init();
}

// init modals
const modals = new Modal();
modals.init();

// ajax
const createArticles = document.querySelector(selectors.forms.createArticle);
if (createArticles) {
  const date = new Date();
  createArticles.addEventListener('submit', (e) => {
    e.preventDefault();
    const formFields = {
      articleID: generateRandomID(),
      articleType: createArticles.querySelector('#article_type'),
      articleImage: createArticles.querySelector('#article_image'),
      articleAuthor: createArticles.querySelector('#article_author'),
      articleName: createArticles.querySelector('#article_name'),
      articleDate: `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`,
      articleDescription: createArticles.querySelector('#article_description'),
    };
    if (validateTitle(formFields.articleName.value) === 'VALID') {
      formFields.articleName.classList.remove('error');

      const api = {
        url: 'http://localhost:3000/',
        createArticlesQuery: 'api/create-article',
      };
      const response = fetch(api.url + api.createArticlesQuery, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleTemplate.main(formFields.articleID, formFields.articleType.value, formFields.articleImage.value, formFields.articleName.value, formFields.articleAuthor.value, formFields.articleDate, formFields.articleDescription.value)),
      });
      response.then((data) => data.json()).then((data) => data);

      localStorage.setItem('latestPostID', formFields.articleID);
      let pathname = location.pathname;
      if (pathname.indexOf('index') > -1) {
        pathname = pathname.replace('index', 'post');
      } else if (pathname.indexOf('blog') > -1) {
        pathname = pathname.replace('blog', 'post');
      } else {
        pathname = pathname.replace('post', 'post');
      }
      location.href = location.origin + pathname;
    } else {
      formFields.articleName.classList.add('error');
    }
  });
}

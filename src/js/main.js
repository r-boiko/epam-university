// import modules
import Slider, {CustomSlider} from './modules/sliderES5.js';
import Modal from './modules/modal.js';
import Post from './modules/post.js';
import validateTitle from './modules/validateTitleRegex.js';
import './modules/jQueryModal.js';

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
  blog: {
    page: '.blog-page',
    postBtn: '.blog-page .blog-post .openPost',
    search: {
      inputAuthor: '.blog-page .search .sortByAuthor',
      inputTitle: '.blog-page .search .sortByTitle',
      submit: '.blog-page .search .search__submit',
    },
    postsContainer: '.blog-page .blog__content',
  },
  post: '.post-page',
  singlePostWrapper: '.single-post',
  sliders: {
    portfolio: '.latest-portfolio__slider',
    latestPosts: '.latest-posts__slider',
    testimonials: '.testimonials__slider',
  },
  forms: {
    createArticle: '#create-article',
  },
};
const api = {
  url: 'http://localhost:3000/',
  articlesListQuery: 'api/list',
  articleByIdQuery: 'api/list/',
  createArticlesQuery: 'api/create-article',
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

function redirect() {
  let pathname = location.pathname;
  if (pathname.indexOf('index') > -1) {
    pathname = pathname.replace('index', 'post');
  } else if (pathname.indexOf('blog') > -1) {
    pathname = pathname.replace('blog', 'post');
  } else {
    pathname = pathname.replace('post', 'post');
  }
  location.href = location.origin + pathname;
}

function addEventForElements(selector, event, func) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => {
    element.addEventListener(event, func);
  });
}

function renderBlogPosts(func, data, selector) {
  document.querySelector(selectors.blog.postsContainer).innerHTML = '';
  const post = new Post(func, data, selector);
  post.renderPostItems();
  addEventForElements(selectors.blog.postBtn, 'click', (e) => {
    e.preventDefault();
    const postID = e.currentTarget.dataset.id;
    localStorage.setItem('latestPostID', postID);
    redirect();
  });
}

function searchBlogPosts(data, searchValueAuthor, searchValueTitle) {
  const tmpSearchValueAuthor = searchValueAuthor === null ? '' : searchValueAuthor;
  const tmpSearchValueTitle = searchValueTitle === null ? '' : searchValueTitle;
  return data.filter((item) => {
    const regexAuthor = new RegExp(tmpSearchValueAuthor, 'i');
    const regexTitle = new RegExp(tmpSearchValueTitle);
    if (regexAuthor.test(item.head.title) && regexTitle.test(item.body.title)) {
      return item;
    }
  });
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

  // jQueryModal
  // eslint-disable-next-line no-undef
  $(document).jQueryModal({
    autoShow: true,
  });
}
if (document.querySelector(selectors.blog.page)) {
  Object.keys(blogData).forEach((item) => {
    renderSection(blogTemplate[item].main, blogData[item]);

    const searchValueAuthor = JSON.parse(localStorage.getItem('searchValueAuthor'));
    const searchValueTitle = JSON.parse(localStorage.getItem('searchValueTitle'));
    if (searchValueAuthor || searchValueTitle) {
      document.querySelector(selectors.blog.search.inputAuthor).value = searchValueAuthor;
      document.querySelector(selectors.blog.search.inputTitle).value = searchValueTitle;
    }
    addEventForElements(selectors.blog.search.submit, 'click', () => {
      const searchValueAuthor = document.querySelector(selectors.blog.search.inputAuthor).value;
      const searchValueTitle = document.querySelector(selectors.blog.search.inputTitle).value;
      if (searchValueTitle.length > 0) {
        if (validateTitle(searchValueTitle)) {
          const response = fetch(api.url + api.articlesListQuery, {
            method: 'GET',
          });
          response.then((data) => data.json()).then((data) => {
            if (data.length > 0) {
              const filteredData = searchBlogPosts(data, searchValueAuthor, searchValueTitle);
              if (filteredData.length > 0) {
                localStorage.setItem('searchValueAuthor', JSON.stringify(searchValueAuthor));
                localStorage.setItem('searchValueTitle', JSON.stringify(searchValueTitle));
                renderBlogPosts(blogTemplate[item].item, filteredData, blogTemplate[item].selector);

                // eslint-disable-next-line no-undef
                $('.deletePost').jQueryModal({
                  message: 'Are you sure you want to delete this post?',
                  buttons: 2,
                  type: 'error',
                });
              } else {
                alert('Sorry, not found any post');
              }
            }
          });
        } else {
          alert('Incorrect format title');
        }
      } else {
        const response = fetch(api.url + api.articlesListQuery, {
          method: 'GET',
        });
        response.then((data) => data.json()).then((data) => {
          if (data.length > 0) {
            const filteredData = searchBlogPosts(data, searchValueAuthor, searchValueTitle);
            if (filteredData.length > 0) {
              localStorage.setItem('searchValueAuthor', JSON.stringify(searchValueAuthor));
              localStorage.setItem('searchValueTitle', JSON.stringify(searchValueTitle));
              renderBlogPosts(blogTemplate[item].item, filteredData, blogTemplate[item].selector);

              // eslint-disable-next-line no-undef
              $('.deletePost').jQueryModal({
                message: 'Are you sure you want to delete this post?',
                buttons: 2,
                type: 'error',
              });
            } else {
              alert('Sorry, not found any post');
            }
          }
        });
      }
    });

    const response = fetch(api.url + api.articlesListQuery, {
      method: 'GET',
    });
    response.then((data) => data.json()).then((data) => {
      if (data.length > 0) {
        const searchValueAuthor = JSON.parse(localStorage.getItem('searchValueAuthor'));
        const searchValueTitle = JSON.parse(localStorage.getItem('searchValueTitle'));
        if (searchValueAuthor || searchValueTitle) {
          const filteredData = searchBlogPosts(data, searchValueAuthor, searchValueTitle);
          renderBlogPosts(blogTemplate[item].item, filteredData, blogTemplate[item].selector);

          // eslint-disable-next-line no-undef
          $('.deletePost').jQueryModal({
            message: 'Are you sure you want to delete this post?',
            buttons: 2,
            type: 'error',
          });
        } else {
          renderBlogPosts(blogTemplate[item].item, data, blogTemplate[item].selector);

          // eslint-disable-next-line no-undef
          $('.deletePost').jQueryModal({
            message: 'Are you sure you want to delete this post?',
            buttons: 2,
            type: 'error',
          });
        }
      }
    });
  });
}
if (document.querySelector(selectors.post)) {
  Object.keys(postData).forEach((item) => {
    if (item === 'post') {
      renderSection(postTemplate[item].main, postData[item]);
      renderSectionItems(postTemplate[item].selector, postTemplate[item].itemSocial, postData[item].footer.socials);

      const latestPostID = JSON.parse(localStorage.getItem('latestPostID'));
      if (latestPostID) {
        const response = fetch(api.url + api.articleByIdQuery + latestPostID, {
          method: 'GET',
        });
        response.then((data) => data.json()).then((data) => {
          document.querySelector(selectors.singlePostWrapper).innerHTML = '';
          const post = new Post(postTemplate[item].main, data, selectors.singlePostWrapper);
          post.renderPost();
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
if (document.querySelector(selectors.sliders.latestPosts)) {
  const slider = new Slider(selectors.sliders.latestPosts, false, 1000);
  slider.init();
}
if (document.querySelector(selectors.sliders.testimonials)) {
  const slider = new CustomSlider(selectors.sliders.testimonials, false, 1000);
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
    if (validateTitle(formFields.articleName.value)) {
      formFields.articleName.classList.remove('error');

      const response = fetch(api.url + api.createArticlesQuery, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleTemplate.main(
          formFields.articleID,
          formFields.articleType.value,
          formFields.articleImage.value,
          formFields.articleName.value,
          formFields.articleAuthor.value,
          formFields.articleDate,
          formFields.articleDescription.value
        )),
      });
      response.then((data) => data.json()).then((data) => data);
      localStorage.setItem('latestPostID', formFields.articleID);
      redirect();
    } else {
      formFields.articleName.classList.add('error');
    }
  });
}

// tests
export const a = () => 1;

class Post {
  constructor(func, data, selector) {
    this.func = func;
    this.data = data;
    this.selector = selector;
    this.selectors = {
      root: document.getElementById('root'),
    };
  }

  renderPost() {
    const {func, data, selector} = this;

    const element = document.createElement('div');
    element.innerHTML = func(data);
    document.querySelector(selector).insertAdjacentHTML('beforeend', element.innerHTML);
  }

  renderPostItems() {
    const {func, data, selector} = this;
    const {root} = this.selectors;

    const element = document.createElement('div');
    data.forEach((item) => {
      element.insertAdjacentHTML('beforeend', func(item));
    });
    root.querySelector(selector).insertAdjacentHTML('beforeend', element.innerHTML);
  }
}

export default Post;

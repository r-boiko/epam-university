class Slider {
  constructor(selector = '.slider', nav = true, autoplay = true) {
    this.selector = selector;
    this.nav = nav;
    this.autoplay = autoplay;
    this.settings = {
      classes: {
        main: '.slider',
        list: '.slider__list',
        track: 'slider__track',
        slide: '.slide',
        nav: {
          main: 'slider__control',
          prev: 'prev',
          next: 'next',
        },
        active: 'active',
      },
      slides: {
        count: 0,
        activeSlide: 0,
        width: 0,
      },
      state: {
        animation: false,
      },
      templates: {
        nav: (props) => {
          return `<div class="${props.nav.main}"><div class="${props.nav.prev}"></div><div class="${props.nav.next}"></div></div>`;
        },
      },
    };
  }

  create() {
    const {nav, selector, settings: {classes, slides, templates}} = this;
    const root = document.querySelector(selector);
    const list = root.querySelector(classes.list);
    const allSlides = list.querySelectorAll(classes.slide);
    slides.count = allSlides.length - 3;
    slides.width = allSlides[0].offsetWidth;
    const track = document.createElement('div');
    track.classList.add(classes.track);
    track.innerHTML = list.innerHTML;
    list.innerHTML = null;
    list.append(track);
    root.innerHTML = null;
    root.append(list);

    if (nav) {
      root.insertAdjacentHTML('beforeend', templates.nav(classes));
    }
  }

  slidePrev() {
    const {selector, settings: {classes, slides, state}} = this;
    if (!state.animation) {
      state.animation = true;
      const root = document.querySelector(selector);
      const track = root.querySelector(`.${classes.track}`);
      slides.activeSlide -= 1;
      if (slides.activeSlide < 0) {
        slides.activeSlide = slides.count;
      }
      track.style.transform = `translateX(-${slides.activeSlide * slides.width}px)`;
      setTimeout(() => {
        state.animation = false;
      }, 300);
    }
  }

  slideNext() {
    const {selector, settings: {classes, slides, state}} = this;
    if (!state.animation) {
      state.animation = true;
      const root = document.querySelector(selector);
      const track = root.querySelector(`.${classes.track}`);
      slides.activeSlide += 1;
      if (slides.activeSlide > slides.count) {
        slides.activeSlide = 0;
      }
      track.style.transform = `translateX(-${slides.activeSlide * slides.width}px)`;
      setTimeout(() => {
        state.animation = false;
      }, 300);
    }
  }

  controlEvents() {
    const {selector, settings: {classes}} = this;
    const root = document.querySelector(selector);
    const next = root.querySelector(`.${classes.nav.next}`);
    const prev = root.querySelector(`.${classes.nav.prev}`);
    next.addEventListener('click', () => {
      this.slideNext();
    });
    prev.addEventListener('click', () => {
      this.slidePrev();
    });
  }

  dragAndDrop() {
    const {selector, settings: {classes}} = this;
    let handler;
    let offset;
    const root = document.querySelector(selector);
    const list = root.querySelector(classes.list);
    root.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      e.preventDefault();
      root.addEventListener('mousemove', handler = (e) => {
        list.style.pointerEvents = 'none';
        e.stopPropagation();
        e.preventDefault();
        offset = e.movementX;
      });
    });
    root.addEventListener('mouseup', (e) => {
      e.stopPropagation();
      e.preventDefault();
      root.removeEventListener('mousemove', handler);
      list.style.pointerEvents = 'auto';
      if (offset > 0) {
        this.slideNext();
      }
      if (offset < 0) {
        this.slidePrev();
      }
    });
  }

  autoplaySlider() {
    const {selector} = this;
    let interval = setInterval(() => {
      this.slideNext();
    }, 1500);
    const root = document.querySelector(selector);
    root.addEventListener('mouseenter', () => {
      clearInterval(interval);
    });
    root.addEventListener('mouseleave', () => {
      interval = setInterval(() => {
        this.slideNext();
      }, 1500);
    });
  }

  responsive() {
    const {selector, settings: {classes, slides}} = this;
    const root = document.querySelector(selector);
    const list = root.querySelector(classes.list);
    const allSlides = list.querySelectorAll(classes.slide);

    if (window.matchMedia('(max-width: 991px)').matches) {
      slides.count = allSlides.length - 1;
      slides.width = allSlides[0].offsetWidth;
    }

    window.addEventListener('resize', () => {
      if (window.matchMedia('(max-width: 991px)').matches) {
        slides.count = allSlides.length - 1;
        slides.width = allSlides[0].offsetWidth;
      } else {
        slides.count = allSlides.length - 3;
        slides.width = allSlides[0].offsetWidth;
      }
    });
  }

  init() {
    const {autoplay} = this;
    this.create();
    this.controlEvents();
    this.responsive();
    this.dragAndDrop();
    if (autoplay) {
      this.autoplaySlider();
    }
  }
}

export default Slider;

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
        animationDisable: 'animation-disable',
      },
      selectors: {},
      slides: {
        count: 0,
        width: 0,
        activeSlide: 0,
        slidesToShow: 3,
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

  setSettings(classes, slides, selectors) {
    selectors.root = document.querySelector(this.selector);
    selectors.list = selectors.root.querySelector(classes.list);
    selectors.allSlides = selectors.list.querySelectorAll(classes.slide);
    slides.count = selectors.allSlides.length;
    slides.width = selectors.allSlides[0].offsetWidth;
    slides.activeSlide = slides.count;
  }

  createClones(classes, slides, selectors) {
    selectors.allSlides.forEach((slide) => {
      const cloneSlide = slide.cloneNode(true);
      selectors.list.append(cloneSlide);
    });
    selectors.allSlidesBefore = Array.from(selectors.list.querySelectorAll(classes.slide)).slice(0, slides.count);
    Array.from(selectors.allSlides).reverse().forEach((slide) => {
      const cloneSlide = slide.cloneNode(true);
      selectors.list.insertBefore(cloneSlide, selectors.list.firstChild);
    });
  }

  createTrack(classes, slides, selectors) {
    const track = document.createElement('div');
    track.classList.add(classes.track);
    track.innerHTML = selectors.list.innerHTML;
    track.style.transform = `translateX(-${slides.activeSlide * slides.width}px)`;

    // append track to list
    selectors.list.innerHTML = null;
    selectors.list.append(track);

    // append list to root
    selectors.root.innerHTML = null;
    selectors.root.append(selectors.list);
  }

  create() {
    const {nav} = this;
    const {classes, slides, selectors, templates} = this.settings;

    this.setSettings(classes, slides, selectors);
    this.createClones(classes, slides, selectors);
    this.createTrack(classes, slides, selectors);

    // check nav
    if (nav) {
      selectors.root.insertAdjacentHTML('beforeend', templates.nav(classes));
    }
  }

  slidePrev() {
    const {classes, slides, state, selectors} = this.settings;

    // check is animation end
    if (!state.animation) {
      state.animation = true;

      const track = selectors.root.querySelector(`.${classes.track}`);
      slides.activeSlide -= 1;
      track.style.transform = `translateX(-${slides.activeSlide * slides.width}px)`;

      setTimeout(() => {
        if (slides.activeSlide === slides.count - slides.slidesToShow) {
          track.classList.add(classes.animationDisable);
          slides.activeSlide = slides.count;
          track.style.transform = `translateX(-${slides.activeSlide * slides.width}px)`;
          setTimeout(() => {
            track.classList.remove(classes.animationDisable);
            state.animation = false;
          }, 50);
        } else {
          state.animation = false;
        }
      }, 300);
    }
  }

  slideNext() {
    const {classes, slides, selectors, state} = this.settings;

    // check is animation end
    if (!state.animation) {
      state.animation = true;
      const track = selectors.root.querySelector(`.${classes.track}`);
      slides.activeSlide += 1;
      track.style.transform = `translateX(-${slides.activeSlide * slides.width}px)`;

      setTimeout(() => {
        if (slides.activeSlide === slides.count + slides.slidesToShow) {
          track.classList.add(classes.animationDisable);
          slides.activeSlide = slides.count;
          track.style.transform = `translateX(-${slides.activeSlide * slides.width}px)`;
          setTimeout(() => {
            track.classList.remove(classes.animationDisable);
            state.animation = false;
          }, 50);
        } else {
          state.animation = false;
        }
      }, 300);
    }
  }

  controlEvents() {
    const {classes, selectors} = this.settings;

    // get controls
    const next = selectors.root.querySelector(`.${classes.nav.next}`);
    const prev = selectors.root.querySelector(`.${classes.nav.prev}`);

    // add events for controls
    next.addEventListener('click', () => {
      this.slideNext();
    });
    prev.addEventListener('click', () => {
      this.slidePrev();
    });
  }

  dragAndDrop() {
    const {root, list} = this.settings.selectors;

    let handler;
    let offset;

    // add events for dragAndDrop
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
    const {root} = this.settings.selectors;

    // create interval
    let interval = setInterval(() => {
      this.slideNext();
    }, 1500);

    // add events for autoplay
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
    const {slides, selectors, classes} = this.settings;

    // check tablet
    if (window.matchMedia('(max-width: 991px)').matches) {
      selectors.allSlides = selectors.list.querySelectorAll(classes.slide);
      slides.width = selectors.allSlides[0].offsetWidth;
    }

    // check tablet on resize event
    window.addEventListener('resize', () => {
      if (window.matchMedia('(max-width: 991px)').matches) {
        selectors.allSlides = selectors.list.querySelectorAll(classes.slide);
        slides.width = selectors.allSlides[0].offsetWidth;
      } else {
        selectors.allSlides = selectors.list.querySelectorAll(classes.slide);
        slides.width = selectors.allSlides[0].offsetWidth;
      }
    });
  }

  init() {
    this.create();
    this.controlEvents();
    this.responsive();
    this.dragAndDrop();
    if (this.autoplay) {
      this.autoplaySlider();
    }
  }
}

export default Slider;

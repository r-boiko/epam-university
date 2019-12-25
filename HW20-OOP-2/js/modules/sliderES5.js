function Slider(selector = '.slider', touch = true, speed = 300) {
  this.selector = selector;
  this.nav = true;
  this.autoplay = true;
  this.touch = touch;
  this.speed = speed;
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

Slider.prototype.setSettings = function (classes, slides, selectors) {
  selectors.root = document.querySelector(this.selector);
  selectors.list = selectors.root.querySelector(classes.list);
  selectors.allSlides = selectors.list.querySelectorAll(classes.slide);
  slides.count = selectors.allSlides.length;
  slides.width = selectors.allSlides[0].offsetWidth;
  slides.activeSlide = slides.count;
};

Slider.prototype.createClones = function (classes, slides, selectors) {
  selectors.allSlides.forEach((slide) => {
    const cloneSlide = slide.cloneNode(true);
    selectors.list.append(cloneSlide);
  });
  selectors.allSlidesBefore = Array.from(selectors.list.querySelectorAll(classes.slide)).slice(0, slides.count);
  Array.from(selectors.allSlides).reverse().forEach((slide) => {
    const cloneSlide = slide.cloneNode(true);
    selectors.list.insertBefore(cloneSlide, selectors.list.firstChild);
  });
};

Slider.prototype.createTrack = function (classes, slides, selectors) {
  const track = document.createElement('div');
  track.classList.add(classes.track);
  track.style.transition = `transform ${this.speed}ms ease-in-out`;
  track.innerHTML = selectors.list.innerHTML;
  track.style.transform = `translateX(-${slides.activeSlide * slides.width}px)`;

  // append track to list
  selectors.list.innerHTML = null;
  selectors.list.append(track);

  // append list to root
  selectors.root.innerHTML = null;
  selectors.root.append(selectors.list);
};

Slider.prototype.create = function () {
  const {nav} = this;
  const {classes, slides, selectors, templates} = this.settings;

  this.setSettings(classes, slides, selectors);
  this.createClones(classes, slides, selectors);
  this.createTrack(classes, slides, selectors);

  // check nav
  if (nav) {
    selectors.root.insertAdjacentHTML('beforeend', templates.nav(classes));
  }
};

Slider.prototype.slidePrev = function () {
  const {classes, slides, state, selectors} = this.settings;

  // check is animation end
  if (!state.animation) {
    state.animation = true;

    const track = selectors.root.querySelector(`.${classes.track}`);
    slides.activeSlide -= 1;
    track.style.transform = `translateX(-${slides.activeSlide * slides.width}px)`;

    setTimeout(() => {
      if (slides.activeSlide === slides.count - slides.slidesToShow) {
        track.style.transition = 'none';
        slides.activeSlide = slides.count;
        track.style.transform = `translateX(-${slides.activeSlide * slides.width}px)`;
        setTimeout(() => {
          track.style.transition = `transform ${this.speed}ms ease-in-out`;
          state.animation = false;
        }, 50);
      } else {
        state.animation = false;
      }
    }, this.speed);
  }
};

Slider.prototype.slideNext = function () {
  const {classes, slides, selectors, state} = this.settings;

  // check is animation end
  if (!state.animation) {
    state.animation = true;
    const track = selectors.root.querySelector(`.${classes.track}`);
    slides.activeSlide += 1;
    track.style.transform = `translateX(-${slides.activeSlide * slides.width}px)`;

    setTimeout(() => {
      if (slides.activeSlide === slides.count + slides.slidesToShow) {
        track.style.transition = 'none';
        slides.activeSlide = slides.count;
        track.style.transform = `translateX(-${slides.activeSlide * slides.width}px)`;
        setTimeout(() => {
          track.style.transition = `transform ${this.speed}ms ease-in-out`;
          state.animation = false;
        }, 50);
      } else {
        state.animation = false;
      }
    }, this.speed);
  }
};

Slider.prototype.controlEvents = function () {
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
};

Slider.prototype.dragAndDrop = function () {
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
};

Slider.prototype.autoplaySlider = function () {
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
};

Slider.prototype.responsive = function () {
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
};

Slider.prototype.init = function () {
  this.create();
  this.controlEvents();
  this.responsive();
  if (this.touch) {
    this.dragAndDrop();
  }
  if (this.autoplay) {
    this.autoplaySlider();
  }
};

// slider 2
export function CustomSlider(selector = '.slider', touch = true, speed = 300) {
  Slider.call(this, selector, touch, speed);
}

CustomSlider.prototype = Object.create(Slider.prototype);
CustomSlider.prototype.constructor = CustomSlider;

export default Slider;

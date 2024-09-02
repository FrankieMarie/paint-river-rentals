const header = document.getElementById('header');

function setBlur() {
  const scrollPosition = window.scrollY;

  if (header != null && scrollPosition >= 100) {
    header.classList.add('blur-background');
  }

  if (header != null && scrollPosition === 0) {
    header?.classList.remove('blur-background');
  }
}

// set blur on scroll
window.addEventListener('scroll', () => {
  setBlur();
});

// set blur when loaded to specfic section of page before scrolled
setBlur();

// NAVIGATION
const navItems = document.querySelectorAll('nav li');
const anchorIcons = document.querySelectorAll('.anchor');

// add underline to active nav item
navItems.forEach((item) => {
  item.addEventListener('click', (e) => {
    const hash = e?.target?.attributes.href.value;

    // reset all other nav items to no underline
    navItems.forEach((n) => {
      n.classList.remove('after:scale-x-100');
      n.classList.add('after:scale-x-0');
    });

    // set current to underline
    item.classList.add('after:scale-x-100');
    item.classList.remove('after:scale-x-0');

    // highlight corresponding anchor icon
    anchorIcons.forEach((icon) => {
      const iconHref = icon.getAttribute('href');

      // reset all other anchor icons to opacity-50
      anchorIcons.forEach((i) => {
        const attrHref = i.getAttribute('href');
        if (hash !== attrHref) {
          i.classList.add('opacity-50');
          i.classList.remove('opacity-100');
        }
      });

      // set current to opacity-100
      if (hash === iconHref) {
        icon.classList.add('opacity-100');
        icon.classList.remove('opacity-50');
      }
    });
  });
});

// highlight anchor icon that matches current href
anchorIcons.forEach((icon) => {
  icon.addEventListener('click', (e) => {
    const hash = e.target?.offsetParent.firstElementChild.getAttribute('href');

    // reset all other anchor icons to opacity-50
    anchorIcons.forEach((a) => {
      a.classList.add('opacity-50');
      a.classList.remove('opacity-100');
    });

    // set current to opacity-100
    icon.classList.add('opacity-100');
    icon.classList.remove('opacity-50');

    // underline corresponding nav link
    navItems.forEach((item) => {
      const navItemHref = item.children[0].getAttribute('href');

      // reset all other nav items to no underline
      navItems.forEach((n) => {
        const attrHref = n.children[0].getAttribute('href');
        if (hash !== attrHref) {
          n.classList.add('after:scale-x-0');
          n.classList.remove('after:scale-x-100');
        }
      });

      // set current to underline
      if (hash === navItemHref) {
        item.classList.add('after:scale-x-100');
        item.classList.remove('after:scale-x-0');
      }
    });
  });
});

// CAROUSEL
const tracks = document.querySelectorAll('.carousel_track');
const prevBtns = document.querySelectorAll('.prev');
const nextBtns = document.querySelectorAll('.next');
const dotsNavs = document.querySelectorAll('.carousel_nav');

function setSlidePosition(slide, index) {
  const slideWidth = slide.getBoundingClientRect().width;
  slide.style.left = slideWidth * index + 'px';
}

function moveToSlide(track, currentSlide, targetSlide) {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
}

function updateDots(currentDot, targetDot) {
  currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide');
}

function hideShowArrows(slides, targetIndex, prevBtn, nextBtn) {
  if (targetIndex === 0) {
    prevBtn.classList.add('hidden');
    nextBtn.classList.remove('hidden');
  } else if (targetIndex === slides.length - 1) {
    prevBtn.classList.remove('hidden');
    nextBtn.classList.add('hidden');
  } else {
    prevBtn.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
  }
}

function handleDrag(track, index, dragged, clientX, initialX) {
  const slides = Array.from(track.children);
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;
  const prevIndex = slides.findIndex((slide) => slide === prevSlide);
  const nextSlide = currentSlide.nextElementSibling;
  const nextIndex = slides.findIndex((slide) => slide === nextSlide);
  const currentDot = dotsNavs[index].querySelector('.current-slide');
  const nextDot = currentDot.nextElementSibling;
  const prevDot = currentDot.previousElementSibling;
  const prevBtn = prevBtns[index];
  const nextBtn = nextBtns[index];

  if (dragged && clientX < initialX) {
    // drag left, move next
    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(slides, nextIndex, prevBtn, nextBtn);
  } else if (dragged && clientX > initialX) {
    // drag right, move prev
    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    hideShowArrows(slides, prevIndex, prevBtn, nextBtn);
  }
}

tracks.forEach((track, i) => {
  // set slide positions
  Array.from(track.children).forEach(setSlidePosition);

  // initial drag variables
  let initialX = 0;
  let dragged = false;

  // mobile drag events
  track.addEventListener('touchstart', (e) => {
    initialX = e.changedTouches[0].clientX;
    dragged = false;
  });

  track.addEventListener('touchmove', () => {
    dragged = true;
  });

  track.addEventListener('touchend', (e) => {
    handleDrag(track, i, dragged, e.changedTouches[0].clientX, initialX);
  });

  // destop drag events
  track.addEventListener('mousedown', (e) => {
    e.preventDefault();
    initialX = e.clientX;
    dragged = false;
  });

  track.addEventListener('mousemove', () => {
    dragged = true;
  });

  track.addEventListener('mouseup', (e) => {
    handleDrag(track, i, dragged, e.clientX, initialX);
  });
});

// update slide and buttons on next click
nextBtns.forEach((nextBtn, i) => {
  const track = tracks[i];
  const dotsNav = dotsNavs[i];
  const prevBtn = prevBtns[i];
  const slides = Array.from(track.children);

  nextBtn.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex((slide) => slide === nextSlide);

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(slides, nextIndex, prevBtn, nextBtn);
  });
});

// update slide and buttons on prev click
prevBtns.forEach((prevBtn, i) => {
  const track = tracks[i];
  const dotsNav = dotsNavs[i];
  const nextBtn = nextBtns[i];
  const slides = Array.from(track.children);

  prevBtn.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex((slide) => slide === prevSlide);

    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    hideShowArrows(slides, prevIndex, prevBtn, nextBtn);
  });
});

// update slide and buttons on dot click
dotsNavs.forEach((dotsNav, i) => {
  const track = tracks[i];
  const slides = Array.from(track.children);
  const dots = Array.from(dotsNav.children);
  const nextBtn = nextBtns[i];
  const prevBtn = prevBtns[i];

  dotsNav.addEventListener('click', (e) => {
    const targetDot = e.target.closest('button');

    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex((dot) => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(slides, targetIndex, prevBtn, nextBtn);
  });
});

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

tracks.forEach((track) => {
  Array.from(track.children).forEach(setSlidePosition);
});

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

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

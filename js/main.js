const header = document.getElementById('header');

// adds background blur to header when scrolled
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;

  if (header != null && scrollPosition >= 100) {
    header.classList.add('blur-background');
  }

  if (header != null && scrollPosition === 0) {
    header?.classList.remove('blur-background');
  }
});

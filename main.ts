const header = document.querySelector('#header');
const threshold = 450;

console.log('header', header);

// window.addEventListener('scroll', () => {
//   const scrollPosition = window.scrollY;
//   const blurValue = Math.min(scrollPosition / threshold, 10); // map scroll position to blur value
//   header?.className.filter = `blur(${blurValue}px)`;
// });

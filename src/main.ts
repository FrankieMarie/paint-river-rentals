import './main.css';
import River from './images/river.jpg';

const indexHTML = /* html */ `
  <div class='relative flex flex-col justify-between h-full'>
    <header class='z-10 text-center p-4'>
      <h1 class='font-semibold tracking-wide text-28'>Paint River Rentals</h1>
    </header>
    <main class='flex-grow z-10'>
      <p class='flex flex-col text-center items-center leading-none justify-center h-full text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] uppercase font-bold'>
        <span>Coming</span>
        <span>Soon</span>
      </p>
    </main>
    <footer class='z-10 text-center p-4'>&copy; 2024 paintriverrentals.com</footer>
    <img id='hero' class='absolute z-0 opacity-60 h-full w-screen object-cover'/>
  </div>
`;

document.querySelector<HTMLDivElement>('#app')!.innerHTML = indexHTML;
document.querySelector<HTMLImageElement>('#hero')!.src = River;

import "./main.css";
import River from "./images/river.jpg";

const indexHTML = /* html */ `
  <div class='relative flex flex-col justify-between h-full'>
    <header class='z-10'>header</header>
    <main class='flex-grow z-10'>hello</main>
    <footer class='z-10'>footer</footer>

    <img id='hero' class='absolute z-0 opacity-60 h-full w-screen cover'/>
  </div>
`;

document.querySelector<HTMLDivElement>("#app")!.innerHTML = indexHTML;
document.querySelector<HTMLImageElement>("#hero")!.src = River;

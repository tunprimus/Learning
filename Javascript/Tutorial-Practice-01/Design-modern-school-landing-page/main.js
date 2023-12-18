/* Design a Modern School Landing Page | HTML, CSS & Vanilla JS Tutorial by Mute Coder | https://www.youtube.com/watch?v=83OO97Zy8Dw */

const toggleMenuElement = document.querySelector('#toggle-menu');
const navigationElement = document.querySelector('#navigation');

/**
 * Navigation
 */

function toggleMenu() {
  toggleMenuElement.classList.toggle('active');
  navigationElement.classList.toggle('active');
}

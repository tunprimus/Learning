import Home from './Home.js';
import CartHelper from "./helper/cart-helper.js";

const container = document.getElementById('container');

const navigateTo = (url) => {
  history.pushState({}, '', url);
  loadPage();
};

const route = (event) => {
  event = event || window.event;

  event.preventDefault();

  if (event.target.parentNode.id === 'cart') {
    navigateTo(event.target.parentNode.parentNode.href);
  } else if (event.target.parentNode.id === 'cart-route') {
    navigateTo(event.target.parentNode.href);
  } else {
    navigateTo(event.target.href);
  }
};

function generateNavbarHTML(cartItemCount) {
  return `
    <nav class="navbar shadow-sm sticky-top">
      <div class="container">
        <a class="navbar-brand font-monospace" data-link href="/">Shopping Cart</a>
        <a href="/cart" data-link id="cart-route" onclick="route()">
          <div class="ms-auto" id="cart" style="text-decoration: none; color : black">
            <i style="font-size: 20px" class="fa-solid fa-cart-shopping"></i>
            <span class="cartItem"id="nav-cart-item">${cartItemCount}</span>
          </div>
        </a>
      </div>
    </nav>
  `;
}

function loadNavbar() {
  container.innerHTML = generateNavbarHTML(CartHelper.getCartItemCount);
}

function loadPage() {
  loadNavbar();
  if (location.pathname === '/') {
    new Home('container');
  }
}


window.route = route;

window.onpopstate = loadPage;

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (evt) => {
    if (evt.target.matches('[data-link]')) {
      evt.preventDefault();
      navigateTo(evt.target.href);
    }
  });
  loadPage();
});

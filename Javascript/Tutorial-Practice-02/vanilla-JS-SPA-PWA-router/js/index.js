//@ts-check
import VanillaRouter from './vanillarouter.js';

const router = new VanillaRouter({
  type: 'history',
  routes: {
    '/': 'home',
    '/about': 'about',
    '/products': 'products'
  }
}).listen().on('route', async evt => {
  console.log(evt.detail.route, evt.detail.url);

  document.querySelector('section').innerHTML = await fetch('/' + evt.detail.route + '.html').then(x => x.text())
});
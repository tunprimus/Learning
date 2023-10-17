import CartHelper from './helper/cart-helper.js';
import ProductsHelper from './helper/products-helper.js';
import Product from './product.js';

const FAKE_STORE_PRODUCT_LINK = 'httpsx://fakestoreapi.com/products';
let count = 0;

export default class Home {
  constructor(selector) {
    this.container = document.getElementById(selector);
    this.products = ProductsHelper.getProducts || [];
    this.loadProducts();
  }

  async loadProducts() {
    if (this.products.length <= 0) {
      const res = await fetch(FAKE_STORE_PRODUCT_LINK);
      const data = await res.json();

      ProductsHelper.setProducts = data;
      this.products = ProductsHelper.getProducts;
    }
    this.displayProducts();
  }

  displayProducts() {
    let productsHTML = `
      <h3 class="text-center mt-5 font-monospace">Best Products waiting for you</h3>
      <div class="d-flex flex-wrap container justify-content-evenly mt-5 mb-5">
    `;
    this.products.forEach(product => {
      productsHTML += new Product(product).createHTML();
    });
    productsHTML += `</div>`;
    this.container.innerHTML += productsHTML;

    if (count === 0) {
      this.applyListeners();
      count = 1;
    }
  }

  applyListeners() {
    document.addEventListener('click', ({ target }) => {
      if (location.pathname === '/') {
        let parent = target.parentNode.nodeName !== 'document' && target.parentNode.attributes['data-product-id'];
        const productAttr = target.attributes['data-product-id'] || parent;

        if (target.matches('.pd-card-btn') || target.parentNode.matches('.pd-card-btn') && productAttr !== undefined) {
          const clickedProduct = this.products.find(item => item.id === Number(productAttr.value));
          CartHelper.addToCart(clickedProduct);
        }
      }
    });
  }
}

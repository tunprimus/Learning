import ProductsHelper from "./helper/products-helper.js";
import Product from "./product.js";

const FAKE_STORE_PRODUCT_LINK = 'httpsx://fakestoreapi.com/products';

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
  }
}
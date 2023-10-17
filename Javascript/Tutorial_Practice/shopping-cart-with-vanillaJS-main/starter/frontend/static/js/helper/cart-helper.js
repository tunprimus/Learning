export default class CartHelper {
  static get getCart() {
    return JSON.parse(localStorage.getItem('cart'));
  }

  static get getCartItemCount() {
    let cart = this.getCart;
    if (cart && cart.length > 0) {
      return cart.reduce((acc, currItem) => acc + currItem.amount, 0);
    }
    return 0;
  }

  static set setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  static addToCart(product) {
    let cart = this.getCart;
    const isItemInCart = cart.find(item => item.id === product.id);

    if (isItemInCart) {
      cart = cart.map(item => {
        item.id === product.id ? {...item, amount: item.amount + 1} : item;
      });
    } else {
      cart.push({ ...product, amount: 1 });
    }

    // Set updated cart to localStorage
    this.setCart = cart;
    this.updateNavCartValue = this.getCartItemCount;
  }

  static set updateNavCartValue(value) {
    const cart = document.getElementById('nav-cart-item');
    card.innerText = value;
  }
}
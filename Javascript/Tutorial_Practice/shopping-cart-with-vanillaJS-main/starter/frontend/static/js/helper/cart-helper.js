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

    // Update navbar cart item count
    this.updateNavCartValue = this.getCartItemCount;

    // In the cart page, it should update its own item count
    if (location.pathname === '/cart') {
      cart = this.getCart;
      const updatedItem = cart.find(item => item.id == product.id);
      const totalPrice = this.getCartItemPrice(updatedItem.price, updatedItem.amount);
      this.updateCartTotalPrice(totalPrice, product.id);
      document.getElementById(product.id).value = updatedItem.amount;
    }
  }

  static removeItemFromCart(id) {
    let cart = this.getCart;
    let stop = false;
    cart = cart.reduce((acc, item) => {
      if (item.id === id) {
        if (item.amount === 1) {
          stop = true;
          return acc;
        } else {
          return [...acc, { ...item, amount: item.amount - 1 }];
        }
      } else {
        return [...acc, item];
      }
    }, []);

    if (stop === true) {
      return;
    }

    // Set updated cart to localStorage
    this.setCart = cart;

    // Update navbar cart item  count
    this.updateNavCartValue = this.getCartItemCount;

    // Update its own item count in the cart page
    if (location.pathname === '/cart') {
      const updatedItem = cart.find(item => item.id === id);

      if (updatedItem) {
        document.getElementById(id).value = updatedItem.amount;
        const totalPrice = this.getCartItemPrice(updatedItem.price, updatedItem.amount);
        this.updateCartItemPrice(totalPrice, id);
      } else {
        return;
      }
    }
  }

  static updateCartItemPrice(totalPrice, id) {
    document.getElementById(`price-${id}`).innerText = `$${totalPrice}`;
    this.updateCartTotalPrice(this.calcTotalPrice());
  }

  static getCartItemPrice(price, amount) {
    return (price * amount).toFixed(2);
  }

  static set updateNavCartValue(value) {
    const cart = document.getElementById('nav-cart-item');
    card.innerText = value;
  }

  static addTotalPrice() {
    return this.getCart.reduce((acc, item) => (item.amount * item.price) + acc, 0).toFixed(2);
  }

  static remove(id) {
    document.getElementById(`item-${id}`).remove();
    this.setCart = this.getCart.filter((item) => item.id !== id);

    // Update the navbar
    this.updateNavCartValue = this.getCartItemCount;
    this.updateCartTotalPrice(this.calcTotalPrice());
  }

  static updateCartTotalPrice(totalPrice) {
    document.getElementById('cart-total-price').innerText = `$${totalPrice}`;
  }
}
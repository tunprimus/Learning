const labelElement = document.getElementById('label');
const shoppingCartElement = document.getElementById('shopping-cart');

let basket = JSON.parse(localStorage.getItem('clothing-store-data')) || [];

let calculateItemCount = () => {
  const cartIcon = document.getElementById('cart__amount');
  cartIcon.textContent = basket.map((obj) => obj.item).reduce((acc, item) => acc + item, 0);
};

calculateItemCount();

let generateCartItems = () => {
  const basketSize = basket.length;
  if (basketSize !== 0) {
    labelElement.innerHTML = '';
    return (shoppingCartElement.innerHTML = basket.map((objCart) => {
      let { id, item } = objCart;
      let searchInCart = shopItemsData.find((el) => el.id === id) || [];
      let { img, desc, name, price } = searchInCart;
      return `
        <div class="shopping-cart__item">
          <img src="${img}" alt="${desc}" class="shopping-cart__image" width="40%">
          <div class="shopping-cart__details details-cart">
            <div class="details-cart__title">
              <h4 class="details-cart__title-price">
                <p>${name}</p>
                <p class="details-cart__cart-item-price">$ ${price}</p>
              </h4>
              <span onclick="removeItem(${id})" class="details-cart__close-btn">&#x2716;</span>
            </div>

            <div class="details-cart__cart-buttons">
              <span onclick="decrementItemCount(${id})" class="buttons__minus cart-buttons__minus">&#x2796;</span>
              <div id="${id}" class="quantity cart-quantity">${item}</div>
              <span onclick="incrementItemCount(${id})" class="buttons__plus cart-buttons__plus">&#x2795;</span>
            </div>

            <h3 class="details-cart__text">$ ${item * searchInCart.price}</h3>
          </div>
        </div>
      `;
    }).join(''));
  } else {
    shoppingCartElement.innerHTML = ``;
    labelElement.innerHTML = `
      <h2 class="h2">Cart is empty</h2>
      <a href="index.html">
        <button class="home-btn">Back to home</button>
      </a>
    `;
  }
  
};

generateCartItems();

let incrementItemCount = (item) => {
  const selectedItemId = item.id;
  let search = basket.find((obj) => obj.id === selectedItemId);

  if (search === undefined) {
    basket.push({
      id: selectedItemId,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  
  generateCartItems();

  updateItemCount(selectedItemId);

  localStorage.setItem('clothing-store-data', JSON.stringify(basket));
};

let decrementItemCount = (item) => {
  const selectedItemId = item.id;
  let search = basket.find((obj) => obj.id === selectedItemId);

  if (search === undefined || search.item === 0) {
    return;
  } else {
    search.item -= 1;
  }

  updateItemCount(selectedItemId);

  basket = basket.filter((obj) => obj.item !== 0);

  generateCartItems();
  
  localStorage.setItem('clothing-store-data', JSON.stringify(basket));
};

let updateItemCount = (curId) => {
  let counted = basket.find((obj) => obj.id === curId);
  if (counted === undefined) {
    document.getElementById(curId).textContent = 0;
    return;
  }
  document.getElementById(curId).textContent = counted.item;
  
  calculateItemCount();
  totalAmount();
};

let removeItem = (targetItem) => {
  const selectedItemId = targetItem.id;

  basket = basket.filter((obj) => obj.id !== selectedItemId);

  generateCartItems();
  totalAmount();

  localStorage.setItem('clothing-store-data', JSON.stringify(basket));
  calculateItemCount();
};

let clearCart = () => {
  basket = [];

  generateCartItems();
  localStorage.setItem('clothing-store-data', JSON.stringify(basket));
  calculateItemCount();
};

let totalAmount = () => {
  const basketSize = basket.length;

  if (basketSize > 0) {
    let amount = basket.map((obj) => {
      let { id, item } = obj;
      let searchInCart = shopItemsData.find((el) => el.id === id) || [];
      return item * searchInCart.price;
    }).reduce((acc, cur) => acc + cur, 0);
    labelElement.innerHTML = `
      <h2>Total Bill: $ ${amount}</h2>
      <button class="checkout">Checkout</button>
      <button onclick="clearCart()" class="remove-all">Clear Cart</button>
    `;
  } else {
    return;
  }
  calculateItemCount();
};

totalAmount();

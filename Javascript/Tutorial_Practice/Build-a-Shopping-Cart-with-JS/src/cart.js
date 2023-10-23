const labelElement = document.getElementById('label');
const shoppingCartElement = document.getElementById('shopping-cart');

let basket = JSON.parse(localStorage.getItem('clothing-store-data')) || [];

const calculateItemCount = () => {
  const cartIcon = document.getElementById('cart__amount');
  cartIcon.textContent = basket.map((obj) => obj.item).reduce((acc, item) => acc + item, 0);
};

calculateItemCount();

const generateCartItems = () => {
  const basketSize = basket.length;
  if (basketSize !== 0) {
    labelElement.innerHTML = '';
    return (shoppingCartElement.innerHTML = basket.map((objCart) => {
      let { id, item } = objCart;
      let searchInCart = shopItemsData.find((el) => el.id === id) || [];
      return `
        <div class="shopping-cart__item">
          <img src="${searchInCart.img}" alt="${searchInCart.desc}" class="shopping-cart__image" width="40%">
          <div class="shopping-cart__details details-cart">
            <div class="details-cart__title">
              <h4 class="details-cart__title-price">
                <p>${searchInCart.name}</p>
                <p>$ ${searchInCart.price}</p>
              </h4>
              <span class="details-cart__close-btn">&#x2716;</span>
            </div>
            <div class="details-cart__cart-buttons">
              <span class="buttons__minus">&#x2796;</span>
              <div class="quantity">0</div>
              <span class="buttons__plus">&#x2795;</span>
            </div>
            <h3 class="details-cart__text"></h3>
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

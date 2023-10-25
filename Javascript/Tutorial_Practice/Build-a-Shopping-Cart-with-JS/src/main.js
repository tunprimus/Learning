/* 
Build a Shopping Cart with JavaScript – Project Tutorial
Artist: freeCodeCamp.org */

const shopElement = document.getElementById('shop');

/* 
const basket = [{
  id: 'a000',
  item: 1,
}];
 */

let basket = JSON.parse(localStorage.getItem('clothing-store-data')) || [];

let generateShop = () => {
  return shopElement.innerHTML = shopItemsData.map((item) => {
    const selectedItemId = item.id;
    let search = basket.find((obj) => obj.id === selectedItemId) || [];
    return `
      <div id="product-id-${item.id}" class="item">
        <img src="${item.img}" alt="casual shirt on hanger" class="item__image" width="100%">
        <div class="item__details">
          <h3 class="h3">${item.name}</h3>
          <p class="item__desc">${item.desc}</p>
          <div class="price-quantity">
            <h2 class="h2">$ ${item.price}</h2>
            <div class="buttons">
              <span onclick="decrementItemCount(${item.id})" class="buttons__minus">&#x2796;</span>
              <div id="${item.id}" class="quantity">${search.item === undefined ? 0 : search.item}</div>
              <span onclick="incrementItemCount(${item.id})" class="buttons__plus">&#x2795;</span>
            </div>
          </div>
        </div>
      </div>
    `
  }).join('');
};

generateShop();

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

  basket = basket.filter((obj) => obj.item !== 0);

  updateItemCount(selectedItemId);

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
};

let calculateItemCount = () => {
  const cartIcon = document.getElementById('cart__amount');
  cartIcon.textContent = basket.map((obj) => obj.item).reduce((acc, item) => acc + item, 0);
};

calculateItemCount();

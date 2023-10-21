/* 
Build a Shopping Cart with JavaScript – Project Tutorial
Artist: freeCodeCamp.org */

const shopElement = document.getElementById('shop');

const shopItemsData = [
  {
    id: 'a0000001',
    name: 'Casual Shirt',
    price: 45,
    desc: 'The of i or seeing the smiling heralds.',
    img: '../../../../assets/images/img-1-shopping-cart-js-starter-files.jpg'
  },
  {
    id: 'a0000002',
    name: 'Office Shirt',
    price: 100,
    desc: 'Open with misery taste seemed if.',
    img: '../../../../assets/images/img-2-shopping-cart-js-starter-files.jpg'
  },
  {
    id: 'a0000003',
    name: 'T Shirt',
    price: 25,
    desc: 'Sick later vaunted him kiss lone to.',
    img: '../../../../assets/images/img-3-shopping-cart-js-starter-files.jpg'
  },
  {
    id: 'a0000004',
    name: "Men's Suit",
    price: 300,
    desc: 'Yes been heartless at a scorching kiss.',
    img: '../../../../assets/images/img-4-shopping-cart-js-starter-files.jpg'
  },
];

const basket = [{
  id: 'a000',
  item: 1,
}];

const generateShop = () => {
  return shopElement.innerHTML = shopItemsData.map((item) => {
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
              <div id="${item.id}" class="quantity">0</div>
              <span onclick="incrementItemCount(${item.id})" class="buttons__plus">&#x2795;</span>
            </div>
          </div>
        </div>
      </div>
    `
  }).join('');
};

generateShop();

const incrementItemCount = (item) => {
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
  
  // console.log(basket);
  updateItemCount(selectedItemId);
};

const decrementItemCount = (item) => {
  const selectedItemId = item.id;
  let search = basket.find((obj) => obj.id === selectedItemId);

  if (search === undefined || search.item === 0) {
    return;
  } else {
    search.item -= 1;
  }

  // console.log(basket);
  updateItemCount(selectedItemId);
};

const updateItemCount = (curId) => {
  const search = basket.find((obj) => obj.id === curId);
  console.log(search.item);
  // document.getElementById(curId).innerHTML = search.item;
  document.getElementById(curId).textContent = search.item;
};

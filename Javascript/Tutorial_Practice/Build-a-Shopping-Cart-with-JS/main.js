/* 
Build a Shopping Cart with JavaScript – Project Tutorial
Artist: freeCodeCamp.org */

const shopElement = document.getElementById('shop');

const shopItemsData = [
  {
    id: 1,
    name: 'Casual Shirt',
    price: 45,
    desc: 'The of i or seeing the smiling heralds.',
    img: '../../../../assets/images/img-1-shopping-cart-js-starter-files.jpg'
  },
  {
    id: 2,
    name: 'Office Shirt',
    price: 100,
    desc: 'Open with misery taste seemed if.',
    img: '../../../../assets/images/img-2-shopping-cart-js-starter-files.jpg'
  },
  {
    id: 3,
    name: 'T Shirt',
    price: 25,
    desc: 'Sick later vaunted him kiss lone to.',
    img: '../../../../assets/images/img-3-shopping-cart-js-starter-files.jpg'
  },
  {
    id: 4,
    name: "Men's Suit",
    price: 300,
    desc: 'Yes been heartless at a scorching kiss.',
    img: '../../../../assets/images/img-4-shopping-cart-js-starter-files.jpg'
  },
];

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
              <span class="buttons__minus">&#x2796;</span>
              <div id="${item.id}" class="quantity">0</div>
              <span class="buttons__plus">&#x2795;</span>
            </div>
          </div>
        </div>
      </div>
    `
  }).join('');
};

generateShop();

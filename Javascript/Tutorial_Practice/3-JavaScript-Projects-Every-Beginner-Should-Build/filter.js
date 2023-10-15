const data = [
  {
    id: 1,
    name: 'A flower',
    img: '../../../../assets/images/a-flower.jpg',
    price: 74,
    category: 'Casual',
  },
  {
    id: 2,
    name: 'Assorted fruits',
    img: '../../../../assets/images/assorted_fruits_02.jpg',
    price: 54,
    category: 'Dress',
  },
  {
    id: 3,
    name: 'Azaela',
    img: '../../../../assets/images/azalea.jpg',
    price: 40,
    category: 'Sport',
  },
  {
    id: 4,
    name: 'Azul',
    img: '../../../../assets/images/Azul.jpg',
    price: 200,
    category: 'Luxury',
  },
  {
    id: 5,
    name: 'Hydrangeas',
    img: '../../../../assets/images/Hydrangeas.jpg',
    price: 90,
    category: 'Casual',
  },
  {
    id: 6,
    name: 'Orange',
    img: '../../../../assets/images/orange-003.jpg',
    price: 100,
    category: 'Dress',
  },
  {
    id: 7,
    name: 'Pink rose',
    img: '../../../../assets/images/pink-rose.jpg',
    price: 204,
    category: 'Sport',
  },
  {
    id: 8,
    name: 'Tulips',
    img: '../../../../assets/images/Tulips.jpg',
    price: 84,
    category: 'Luxury',
  },
  {
    id: 9,
    name: 'Vetton',
    img: '../../../../assets/images/vetton_ru_832.jpg',
    price: 452,
    category: 'Casual',
  },
  {
    id: 10,
    name: 'Violet sky',
    img: '../../../../assets/images/violet_sky.jpg',
    price: 707,
    category: 'Dress',
  },
  {
    id: 11,
    name: 'Waves',
    img: '../../../../assets/images/waves.png',
    price: 93,
    category: 'Sport',
  },
  {
    id: 12,
    name: 'Cat front of flower',
    img: '../../../../assets/images/spring_natura-028.jpg',
    price: 600,
    category: 'Luxury',
  },
  {
    id: 13,
    name: 'Plane',
    img: '../../../../assets/images/plane.png',
    price: 500000,
    category: 'Casual',
  },
];

const productsContainer = document.querySelector('.products');
const searchInput = document.querySelector('.search');
const categoriesContainer = document.querySelector('.categories');
const priceRange = document.querySelector('.price-range');
const priceValue = document.querySelector('.price-value');

const displayProducts = (filteredProducts) => {
  productsContainer.innerHTML = filteredProducts.map(product => `
    <div class="product">
      <img src="${product.img}" alt="${product.name}" class="product__image" width="">
      <span class="product__name">${product.name}</span>
      <span class="product__price">$${product.price}</span>
    </div>
  `).join('');
};

displayProducts(data);

searchInput.addEventListener('keyup', (evt) => {
  const value = evt.target.value.toLowerCase();

  if (value) {
    displayProducts(data.filter(item => item.name.toLowerCase().indexOf(value) !== -1));
  } else {
    displayProducts(data);
  }
});

const setCategories = () => {
  const allCategories = data.map(item => item.category);
  const categories = ['All', ...allCategories.filter((item, i) => {
    return allCategories.indexOf(item) === i;
  })];

  categoriesContainer.innerHTML = categories.map(category => `
    <span class="category">${category}</span>
  `).join('');
};

setCategories();

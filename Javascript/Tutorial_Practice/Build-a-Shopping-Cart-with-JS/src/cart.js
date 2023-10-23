let basket = JSON.parse(localStorage.getItem('clothing-store-data')) || [];

const calculateItemCount = () => {
  const cartIcon = document.getElementById('cart__amount');
  cartIcon.textContent = basket.map((obj) => obj.item).reduce((acc, item) => acc + item, 0);
};

calculateItemCount();

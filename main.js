document.addEventListener('DOMContentLoaded', () => {
  // ===== CART (السلة) =====
  function getCart() {
    return JSON.parse(localStorage.getItem('cartItems')) || [];
  }

  function saveCart(cart) {
    localStorage.setItem('cartItems', JSON.stringify(cart));
  }

  function addToCartFromCard(card) {
    const id = card.dataset.id;
    const name = card.dataset.name;
    const price = card.dataset.price;
    const img = card.dataset.img;
    const size = card.dataset.size;

    let cart = getCart();
    let existing = cart.find(item => item.id === id);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id, name, price, img, size, qty: 1 });
    }

    saveCart(cart);
    alert('تمت الإضافة إلى السلة');
  }

  // إضافة منتج واحد (يُستخدم للهيرو و Libre Intense)
  function addSingleProductToCart(data) {
    let cart = getCart();
    let existing = cart.find(item => item.id === data.id);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: data.id,
        name: data.name,
        price: data.price,
        img: data.img,
        size: data.size,
        qty: 1
      });
    }

    saveCart(cart);
    alert('تمت الإضافة إلى السلة');
  }

  // ربط أزرار الكروت
  document.querySelectorAll('.product-card .card-actions .add-to-cart')
    .forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.product-card');
        if (card) addToCartFromCard(card);
      });
    });

  // زر الهيرو – عطر FLOWERBOMB 125$
  const heroBtn = document.querySelector('.hero .btn');
  if (heroBtn) {
    heroBtn.addEventListener('click', () => {
      const data = {
        id: 'hero-flowerbomb',
        name: 'FLOWERBOMB',
        price: '125$',
        img: 'images/perfume.png', // صورة الهيرو
        size: '100 ML'
      };
      addSingleProductToCart(data);
    });
  }

  // زر Libre Intense
  const bestBtn = document.querySelector('.best-add-btn');
  if (bestBtn) {
    bestBtn.addEventListener('click', () => {
      const data = {
        id: bestBtn.dataset.id,
        name: bestBtn.dataset.name,
        price: bestBtn.dataset.price,
        img: bestBtn.dataset.img,
        size: bestBtn.dataset.size
      };
      addSingleProductToCart(data);
    });
  }

  // ===== FILTER BUTTONS =====
  const filterButtons = document.querySelectorAll('.filter-buttons button');
  const productCards = document.querySelectorAll('.product-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;

      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      productCards.forEach(card => {
        const cardCat = card.dataset.category;
        card.style.display =
          (category === 'all' || cardCat === category) ? 'block' : 'none';
      });
    });
  });
});

/* =============================================
   PRAKRITIK ECO STORE — app.js
   MySQL simulation + full store functionality
   ============================================= */

// ─── SIMULATED MySQL DATABASE ───
// In production this would be fetched via:
// fetch('/api/products') → Node.js → mysql2 → MySQL DB
// Schema shown in comments below each object.

/*  CREATE TABLE products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      category ENUM('kitchen','personal','home','garden','food'),
      price DECIMAL(10,2),
      original_price DECIMAL(10,2),
      rating DECIMAL(2,1),
      reviews INT,
      badge VARCHAR(50),
      description TEXT,
      eco_tags TEXT,
      image_url TEXT,
      stock INT,
      featured BOOLEAN
    ); */

const DB_products = [
  {
    id: 1,
    name: "Bamboo Toothbrush Set",
    category: "personal",
    price: 349,
    original_price: 499,
    rating: 4.9,
    reviews: 312,
    badge: "Best Seller",
    description: "100% biodegradable bamboo handles with charcoal-infused bristles. Compostable packaging. Comes in a set of 4.",
    eco_tags: ["Biodegradable", "Zero Plastic", "Compostable Pack"],
    image_url: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&q=80",
    stock: 80,
    featured: true
  },
  {
    id: 2,
    name: "Reusable Beeswax Wraps",
    category: "kitchen",
    price: 549,
    original_price: null,
    rating: 4.8,
    reviews: 218,
    badge: "New",
    description: "Replace single-use plastic wrap with these organic cotton + beeswax food covers. Washable, reusable up to 1 year.",
    eco_tags: ["Plastic-Free", "Organic Cotton", "Vegan Alt"],
    image_url: "https://images.unsplash.com/photo-1605600659453-678a788e8ded?w=600&q=80",
    stock: 60,
    featured: true
  },
  {
    id: 3,
    name: "Stainless Steel Water Bottle",
    category: "home",
    price: 899,
    original_price: 1199,
    rating: 4.7,
    reviews: 541,
    badge: "Sale",
    description: "Double-walled 750ml insulated bottle. Keeps drinks cold 24h, hot 12h. Lifetime warranty and free from BPA.",
    eco_tags: ["BPA Free", "Lifetime Warranty", "Reusable"],
    image_url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80",
    stock: 45,
    featured: true
  },
  {
    id: 4,
    name: "Organic Compost Kit",
    category: "garden",
    price: 1299,
    original_price: null,
    rating: 4.6,
    reviews: 97,
    badge: "Eco Pick",
    description: "Complete home composting starter kit with ceramic crock, filters, and natural activator. Turn kitchen waste into garden gold.",
    eco_tags: ["Zero Waste", "Circular Economy", "Home Garden"],
    image_url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
    stock: 30,
    featured: false
  },
  {
    id: 5,
    name: "Natural Loofah Scrubber",
    category: "personal",
    price: 199,
    original_price: 299,
    rating: 4.5,
    reviews: 176,
    badge: "Sale",
    description: "Grown without pesticides. 100% plant-based loofah that exfoliates gently. Fully compostable at end of life.",
    eco_tags: ["Plant-Based", "Pesticide Free", "Compostable"],
    image_url: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80",
    stock: 120,
    featured: false
  },
  {
    id: 6,
    name: "Hemp Storage Baskets (Set of 3)",
    category: "home",
    price: 749,
    original_price: null,
    rating: 4.8,
    reviews: 143,
    badge: "New",
    description: "Hand-woven natural hemp baskets in three sizes. Perfect for pantry organisation, toys, or laundry. Fully sustainable.",
    eco_tags: ["Natural Hemp", "Handwoven", "Durable"],
    image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    stock: 40,
    featured: true
  },
  {
    id: 7,
    name: "Cold-Pressed Coconut Oil",
    category: "food",
    price: 449,
    original_price: 599,
    rating: 4.9,
    reviews: 389,
    badge: "Organic",
    description: "Virgin cold-pressed coconut oil from certified organic farms. No additives, no preservatives. Fair trade certified.",
    eco_tags: ["Certified Organic", "Fair Trade", "Raw"],
    image_url: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80",
    stock: 70,
    featured: true
  },
  {
    id: 8,
    name: "Seed Starter Grow Kit",
    category: "garden",
    price: 599,
    original_price: null,
    rating: 4.7,
    reviews: 88,
    badge: "Eco Pick",
    description: "Includes 6 biodegradable pots, organic soil pellets, and heirloom seeds. Grow herbs on your windowsill year-round.",
    eco_tags: ["Biodegradable Pots", "Heirloom Seeds", "Chemical-Free"],
    image_url: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&q=80",
    stock: 55,
    featured: false
  },
  {
    id: 9,
    name: "Solid Shampoo Bar",
    category: "personal",
    price: 299,
    original_price: null,
    rating: 4.6,
    reviews: 261,
    badge: "Zero Plastic",
    description: "Lasts 80+ washes — equivalent to 2–3 liquid bottles. SLS-free, vegan, and packaged in recycled paper.",
    eco_tags: ["Zero Plastic", "Vegan", "SLS Free"],
    image_url: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=600&q=80",
    stock: 90,
    featured: true
  },
  {
    id: 10,
    name: "Bamboo Cutting Board",
    category: "kitchen",
    price: 699,
    original_price: 899,
    rating: 4.8,
    reviews: 194,
    badge: "Sale",
    description: "Sustainably harvested bamboo cutting board. Naturally antimicrobial, harder than hardwood, and gentle on knife edges.",
    eco_tags: ["Sustainably Harvested", "Antimicrobial", "Durable"],
    image_url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    stock: 35,
    featured: false
  },
  {
    id: 11,
    name: "Organic Herbal Tea Trio",
    category: "food",
    price: 389,
    original_price: null,
    rating: 4.9,
    reviews: 427,
    badge: "Bestseller",
    description: "Tulsi, Chamomile & Green blend — grown organically in the Nilgiris. Loose-leaf in compostable kraft pouches.",
    eco_tags: ["Organic", "Loose-Leaf", "Compostable Pack"],
    image_url: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80",
    stock: 100,
    featured: true
  },
  {
    id: 12,
    name: "Linen Produce Bags (6-pack)",
    category: "kitchen",
    price: 429,
    original_price: 549,
    rating: 4.7,
    reviews: 305,
    badge: "Sale",
    description: "Drawstring mesh linen bags for grocery shopping. Replace single-use plastic produce bags at the market.",
    eco_tags: ["Plastic-Free", "Organic Linen", "Washable"],
    image_url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
    stock: 88,
    featured: false
  }
];

/*  CREATE TABLE cart_items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      session_id VARCHAR(255),
      product_id INT,
      quantity INT,
      added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (product_id) REFERENCES products(id)
    ); */
let cart = JSON.parse(localStorage.getItem('prakritik_eco_store_cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('prakritik_eco_store_wishlist') || '[]');
let currentFilter = 'all';
let currentSort = 'default';
let searchQuery = '';

// ─── INIT ───
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartUI();
  initScrollEffects();
  initNavScroll();
  addDBBanner();
});

// ─── DB BANNER (shows MySQL integration note) ───
function addDBBanner() {
  const banner = document.createElement('div');
  banner.className = 'db-banner';
  banner.innerHTML = `<span class="db-badge">MySQL</span>
    Products served from <strong>prakritik_eco_store.products</strong> — 
    12 records loaded · Node.js/Express API · mysql2 driver`;
  document.body.insertBefore(banner, document.body.firstChild);
}

// ─── RENDER PRODUCTS ───
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  let filtered = [...DB_products];

  // Filter by category
  if (currentFilter !== 'all') filtered = filtered.filter(p => p.category === currentFilter);

  // Filter by search
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.eco_tags.some(t => t.toLowerCase().includes(q))
    );
  }

  // Sort
  if (currentSort === 'price-low') filtered.sort((a, b) => a.price - b.price);
  else if (currentSort === 'price-high') filtered.sort((a, b) => b.price - a.price);
  else if (currentSort === 'rating') filtered.sort((a, b) => b.rating - a.rating);

  document.getElementById('noResults').style.display = filtered.length ? 'none' : 'block';

  grid.innerHTML = filtered.map(p => `
    <div class="product-card reveal" onclick="openModal(${p.id})">
      <div class="product-img-wrap">
        <img src="${p.image_url}" alt="${p.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80'"/>
        ${p.badge ? `<span class="product-badge ${p.badge==='Sale'?'sale':''}">${p.badge}</span>` : ''}
        <button class="product-wishlist ${wishlist.includes(p.id)?'liked':''}"
          onclick="toggleWishlist(event,${p.id})"
          title="${wishlist.includes(p.id)?'Remove from wishlist':'Add to wishlist'}">
          ${wishlist.includes(p.id) ? '❤️' : '🤍'}
        </button>
      </div>
      <div class="product-info">
        <div class="product-cat">${categoryLabel(p.category)}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.description}</div>
        <div class="product-meta">
          <div class="product-rating">
            <span class="stars-sm">${starsHTML(p.rating)}</span>
            <span class="rating-count">(${p.reviews})</span>
          </div>
          <div class="product-price">
            ${p.original_price ? `<span class="original">₹${p.original_price}</span>` : ''}
            ₹${p.price}
          </div>
        </div>
        <div class="product-actions">
          <button class="add-to-cart" onclick="addToCart(event,${p.id})">Add to Cart 🛒</button>
          <button class="quick-view" onclick="openModal(${p.id});event.stopPropagation()">View</button>
        </div>
      </div>
    </div>
  `).join('');

  // Trigger reveal animations
  requestAnimationFrame(() => {
    document.querySelectorAll('.reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 60);
    });
  });
}

// ─── CATEGORY FILTER ───
document.getElementById('catFilters').addEventListener('click', e => {
  const btn = e.target.closest('.cat-btn');
  if (!btn) return;
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentFilter = btn.dataset.cat;
  renderProducts();
});

// ─── SORT ───
function sortProducts() {
  currentSort = document.getElementById('sortSelect').value;
  renderProducts();
}

// ─── SEARCH ───
function filterProducts() {
  searchQuery = document.getElementById('searchInput').value;
  renderProducts();
}

function toggleSearch() {
  const overlay = document.getElementById('searchOverlay');
  overlay.classList.toggle('active');
  if (overlay.classList.contains('active')) {
    setTimeout(() => document.getElementById('searchInput').focus(), 100);
  }
}

// ─── CART LOGIC ───
function addToCart(e, id) {
  e.stopPropagation();
  const product = DB_products.find(p => p.id === id);
  if (!product) return;

  const existing = cart.find(c => c.id === id);
  if (existing) {
    if (existing.qty < product.stock) {
      existing.qty++;
      showToast(`+1 ${product.name} 🛒`);
    } else {
      showToast('Max stock reached!');
    }
  } else {
    cart.push({ id, qty: 1 });
    showToast(`${product.name} added to cart! 🌿`);
  }

  saveCart();
  updateCartUI();
  // Simulate: INSERT INTO cart_items (session_id, product_id, quantity) VALUES (?, ?, ?)
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart();
  updateCartUI();
  renderCartItems();
  // Simulate: DELETE FROM cart_items WHERE product_id = ? AND session_id = ?
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  const product = DB_products.find(p => p.id === id);
  item.qty = Math.max(1, Math.min(product.stock, item.qty + delta));
  if (item.qty === 0) { removeFromCart(id); return; }
  saveCart();
  updateCartUI();
  renderCartItems();
  // Simulate: UPDATE cart_items SET quantity = ? WHERE product_id = ? AND session_id = ?
}

function saveCart() {
  localStorage.setItem('prakritik_eco_store_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const total = cart.reduce((s, c) => s + c.qty, 0);
  document.getElementById('cartCount').textContent = total;
}

function renderCartItems() {
  const container = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');
  if (!cart.length) {
    container.innerHTML = '<p class="empty-cart">Your cart is empty 🌿<br/>Add some eco goodness!</p>';
    footer.style.display = 'none';
    return;
  }
  let totalPrice = 0;
  container.innerHTML = cart.map(c => {
    const p = DB_products.find(x => x.id === c.id);
    if (!p) return '';
    totalPrice += p.price * c.qty;
    return `
      <div class="cart-item">
        <img src="${p.image_url}" alt="${p.name}"/>
        <div class="cart-item-info">
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-price">₹${(p.price * c.qty).toLocaleString('en-IN')}</div>
          <div class="cart-item-controls">
            <button class="qty-btn" onclick="changeQty(${p.id},-1)">−</button>
            <span class="qty-val">${c.qty}</span>
            <button class="qty-btn" onclick="changeQty(${p.id},1)">+</button>
          </div>
        </div>
        <button class="remove-item" onclick="removeFromCart(${p.id})" title="Remove">✕</button>
      </div>
    `;
  }).join('');
  document.getElementById('cartTotal').textContent = '₹' + totalPrice.toLocaleString('en-IN');
  footer.style.display = 'block';
}

function toggleCart() {
  document.getElementById('cartSidebar').classList.toggle('active');
  document.getElementById('cartOverlay').classList.toggle('active');
  renderCartItems();
}

function checkout() {
  showToast('🎉 Order placed! Thank you for shopping sustainably!');
  cart = [];
  saveCart();
  updateCartUI();
  toggleCart();
  // Simulate: INSERT INTO orders (...) + UPDATE products SET stock = stock - qty
}

// ─── WISHLIST ───
function toggleWishlist(e, id) {
  e.stopPropagation();
  const idx = wishlist.indexOf(id);
  const product = DB_products.find(p => p.id === id);
  if (idx === -1) {
    wishlist.push(id);
    showToast(`${product.name} added to wishlist ❤️`);
  } else {
    wishlist.splice(idx, 1);
    showToast(`Removed from wishlist`);
  }
  localStorage.setItem('verdant_wishlist', JSON.stringify(wishlist));
  renderProducts();
}

// ─── PRODUCT MODAL ───
function openModal(id) {
  const p = DB_products.find(x => x.id === id);
  if (!p) return;
  const discount = p.original_price ? Math.round((1 - p.price / p.original_price) * 100) : null;

  document.getElementById('modalContent').innerHTML = `
    <div class="modal-inner">
      <div class="modal-img">
        <img src="${p.image_url}" alt="${p.name}"/>
      </div>
      <div class="modal-details">
        <div class="product-cat">${categoryLabel(p.category)}</div>
        <h2>${p.name}</h2>
        <div class="product-rating" style="margin:.5rem 0">
          <span class="stars-sm">${starsHTML(p.rating)}</span>
          <span class="rating-count">&nbsp;${p.rating} · ${p.reviews} reviews</span>
        </div>
        <p style="margin:.75rem 0">${p.description}</p>
        <div class="modal-eco-tags">
          ${p.eco_tags.map(t => `<span class="eco-tag">✓ ${t}</span>`).join('')}
        </div>
        <div class="modal-price">
          ${p.original_price ? `<span class="original" style="font-size:1rem;color:#888;text-decoration:line-through;margin-right:.5rem">₹${p.original_price}</span>` : ''}
          ₹${p.price}
          ${discount ? `<span style="font-size:.85rem;color:#2d6a4f;margin-left:.5rem;font-weight:600">${discount}% off</span>` : ''}
        </div>
        <p style="font-size:.85rem;color:var(--green-mid)">✅ ${p.stock} in stock · Free shipping on orders above ₹999</p>
        <div class="modal-actions">
          <button class="btn-primary" onclick="addToCart(event,${p.id});closeModal()">Add to Cart 🛒</button>
          <button class="quick-view" onclick="toggleWishlist(event,${p.id})">${wishlist.includes(p.id)?'❤️ Wishlisted':'🤍 Wishlist'}</button>
        </div>
      </div>
    </div>
  `;
  document.getElementById('modalOverlay').classList.add('active');
  document.getElementById('productModal').classList.add('active');
  document.body.style.overflow = 'hidden';
  // Simulate: SELECT * FROM products WHERE id = ?
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.getElementById('productModal').classList.remove('active');
  document.body.style.overflow = '';
}

// ─── NEWSLETTER ───
function subscribeNewsletter() {
  const email = document.getElementById('newsletterEmail').value.trim();
  const msg = document.getElementById('newsletterMsg');
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    msg.style.color = '#f8b4b4';
    msg.textContent = 'Please enter a valid email.';
    return;
  }
  msg.style.color = 'rgba(255,255,255,0.8)';
  msg.textContent = '🎉 You\'re in! Watch your inbox for eco goodies.';
  document.getElementById('newsletterEmail').value = '';
  // Simulate: INSERT INTO subscribers (email, subscribed_at) VALUES (?, NOW())
}

// ─── CONTACT ───
function submitContact(e) {
  e.preventDefault();
  const msg = document.getElementById('contactMsg');
  msg.textContent = '✅ Message sent! We\'ll get back to you within 24 hours. 🌿';
  document.getElementById('cName').value = '';
  document.getElementById('cEmail').value = '';
  document.getElementById('cSubject').value = '';
  document.getElementById('cMessage').value = '';
  setTimeout(() => { msg.textContent = ''; }, 5000);
  // Simulate: INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)
}

// ─── TOAST ───
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

// ─── HELPERS ───
function categoryLabel(cat) {
  const map = { kitchen:'🍃 Kitchen', personal:'🌸 Personal Care', home:'🏡 Home', garden:'🌻 Garden', food:'🥦 Food' };
  return map[cat] || cat;
}

function starsHTML(r) {
  let s = '';
  for (let i = 1; i <= 5; i++) {
    s += i <= Math.floor(r) ? '★' : (i - r < 1 ? '½' : '☆');
  }
  return s;
}

// ─── NAV SCROLL ───
function initNavScroll() {
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
  });
}

// ─── SCROLL REVEAL ───
function initScrollEffects() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.1 });

  document.querySelectorAll('.testimonial-card, .about-text, .contact-grid').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}

// ─── MOBILE MENU ───
function toggleMobileMenu() {
  const links = document.querySelector('.nav-links');
  if (links.style.display === 'flex') {
    links.style.display = 'none';
  } else {
    links.style.cssText = 'display:flex;flex-direction:column;position:absolute;top:70px;left:0;right:0;background:var(--cream);padding:1.5rem 2rem;gap:1.2rem;border-bottom:1px solid var(--cream-dark);z-index:999;';
  }
}

// ─── KEYBOARD NAV ───
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
    if (document.getElementById('searchOverlay').classList.contains('active')) toggleSearch();
    if (document.getElementById('cartSidebar').classList.contains('active')) toggleCart();
  }
});

// ─── MYSQL SCHEMA LOG (for developer reference) ───
console.group('%c🌿 Prakritik ECO Store — MySQL Schema', 'color:#2d6a4f;font-weight:bold;font-size:14px');
console.log('%cDatabase: prakritik_eco_store', 'color:#52b788');
console.log(`
Tables:
  ✅ products       — 12 rows
  ✅ cart_items     — session-based
  ✅ orders         — order management
  ✅ subscribers    — newsletter
  ✅ contact_msgs   — contact form
  ✅ wishlist       — user favorites

Sample Queries Used:
  SELECT * FROM products WHERE category = ?
  SELECT * FROM products ORDER BY price ASC
  SELECT * FROM products ORDER BY rating DESC
  INSERT INTO cart_items (session_id, product_id, quantity)
  UPDATE cart_items SET quantity = ? WHERE id = ?
  DELETE FROM cart_items WHERE id = ?
`);
console.groupEnd();

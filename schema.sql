-- ============================================================
--  Prakritik ECO STORE — MySQL Database Schema
--  Database: verdant_db
--  Engine: InnoDB | Charset: utf8mb4
-- ============================================================

CREATE DATABASE IF NOT EXISTS prakritik_eco_store
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE prakritik_eco_store;

-- ─── PRODUCTS TABLE ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  name            VARCHAR(255)        NOT NULL,
  category        ENUM('kitchen','personal','home','garden','food') NOT NULL,
  price           DECIMAL(10,2)       NOT NULL,
  original_price  DECIMAL(10,2)       DEFAULT NULL,
  rating          DECIMAL(2,1)        DEFAULT 0.0,
  reviews         INT                 DEFAULT 0,
  badge           VARCHAR(50)         DEFAULT NULL,
  description     TEXT,
  eco_tags        JSON,
  image_url       TEXT,
  stock           INT                 DEFAULT 0,
  featured        BOOLEAN             DEFAULT FALSE,
  created_at      TIMESTAMP           DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP           DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_price    (price),
  INDEX idx_rating   (rating)
) ENGINE=InnoDB;

-- ─── USERS TABLE ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  name            VARCHAR(255)        NOT NULL,
  email           VARCHAR(255)        NOT NULL UNIQUE,
  password_hash   VARCHAR(255)        NOT NULL,
  role            ENUM('customer','admin') DEFAULT 'customer',
  created_at      TIMESTAMP           DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email)
) ENGINE=InnoDB;

-- ─── ORDERS TABLE ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  session_id      VARCHAR(255)        NOT NULL,
  user_id         INT                 DEFAULT NULL,
  total_amount    DECIMAL(10,2)       NOT NULL,
  status          ENUM('pending','confirmed','shipped','delivered','cancelled') DEFAULT 'pending',
  shipping_addr   TEXT,
  created_at      TIMESTAMP           DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_session   (session_id),
  INDEX idx_status    (status)
) ENGINE=InnoDB;

-- ─── ORDER ITEMS TABLE ────────────────────────────────────
CREATE TABLE IF NOT EXISTS order_items (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  order_id        INT                 NOT NULL,
  product_id      INT                 NOT NULL,
  quantity        INT                 NOT NULL,
  unit_price      DECIMAL(10,2)       NOT NULL,
  FOREIGN KEY (order_id)   REFERENCES orders(id)   ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ─── CART ITEMS TABLE (session-based) ─────────────────────
CREATE TABLE IF NOT EXISTS cart_items (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  session_id      VARCHAR(255)        NOT NULL,
  product_id      INT                 NOT NULL,
  quantity        INT                 NOT NULL DEFAULT 1,
  added_at        TIMESTAMP           DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  UNIQUE KEY uq_session_product (session_id, product_id)
) ENGINE=InnoDB;

-- ─── WISHLIST TABLE ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS wishlist (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  session_id      VARCHAR(255)        NOT NULL,
  product_id      INT                 NOT NULL,
  added_at        TIMESTAMP           DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  UNIQUE KEY uq_wish (session_id, product_id)
) ENGINE=InnoDB;

-- ─── SUBSCRIBERS TABLE ────────────────────────────────────
CREATE TABLE IF NOT EXISTS subscribers (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  email           VARCHAR(255)        NOT NULL UNIQUE,
  subscribed_at   TIMESTAMP           DEFAULT CURRENT_TIMESTAMP,
  is_active       BOOLEAN             DEFAULT TRUE
) ENGINE=InnoDB;

-- ─── CONTACT MESSAGES TABLE ───────────────────────────────
CREATE TABLE IF NOT EXISTS contact_messages (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  name            VARCHAR(255)        NOT NULL,
  email           VARCHAR(255)        NOT NULL,
  subject         VARCHAR(255),
  message         TEXT                NOT NULL,
  is_read         BOOLEAN             DEFAULT FALSE,
  created_at      TIMESTAMP           DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ─── PRODUCT REVIEWS TABLE ────────────────────────────────
CREATE TABLE IF NOT EXISTS product_reviews (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  product_id      INT                 NOT NULL,
  user_id         INT                 DEFAULT NULL,
  reviewer_name   VARCHAR(255)        NOT NULL,
  rating          TINYINT             NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text     TEXT,
  created_at      TIMESTAMP           DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id)    REFERENCES users(id)    ON DELETE SET NULL
) ENGINE=InnoDB;

-- ============================================================
--  SAMPLE DATA INSERTS
-- ============================================================

INSERT INTO products (name, category, price, original_price, rating, reviews, badge, description, eco_tags, image_url, stock, featured) VALUES
('Bamboo Toothbrush Set',     'personal', 349,  499,  4.9, 312, 'Best Seller', '100% biodegradable bamboo handles with charcoal-infused bristles.', '["Biodegradable","Zero Plastic","Compostable Pack"]', 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600', 80,  TRUE),
('Reusable Beeswax Wraps',    'kitchen',  549,  NULL, 4.8, 218, 'New',         'Replace single-use plastic wrap with organic cotton + beeswax covers.', '["Plastic-Free","Organic Cotton","Vegan Alt"]',       'https://images.unsplash.com/photo-1605600659453-678a788e8ded?w=600', 60,  TRUE),
('Stainless Steel Bottle',    'home',     899,  1199, 4.7, 541, 'Sale',        'Double-walled 750ml insulated bottle. Lifetime warranty.',            '["BPA Free","Lifetime Warranty","Reusable"]',          'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600', 45,  TRUE),
('Organic Compost Kit',       'garden',   1299, NULL, 4.6,  97, 'Eco Pick',    'Complete home composting starter kit with ceramic crock.',            '["Zero Waste","Circular Economy","Home Garden"]',      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600', 30,  FALSE),
('Natural Loofah Scrubber',   'personal', 199,  299,  4.5, 176, 'Sale',        'Grown without pesticides. 100% plant-based loofah.',                  '["Plant-Based","Pesticide Free","Compostable"]',       'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600', 120, FALSE),
('Hemp Storage Baskets',      'home',     749,  NULL, 4.8, 143, 'New',         'Hand-woven natural hemp baskets in three sizes.',                     '["Natural Hemp","Handwoven","Durable"]',               'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600', 40,  TRUE),
('Cold-Pressed Coconut Oil',  'food',     449,  599,  4.9, 389, 'Organic',     'Virgin cold-pressed coconut oil from certified organic farms.',        '["Certified Organic","Fair Trade","Raw"]',             'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600', 70,  TRUE),
('Seed Starter Grow Kit',     'garden',   599,  NULL, 4.7,  88, 'Eco Pick',    '6 biodegradable pots, organic soil pellets, heirloom seeds.',          '["Biodegradable Pots","Heirloom Seeds","Chemical-Free"]','https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600',55, FALSE),
('Solid Shampoo Bar',         'personal', 299,  NULL, 4.6, 261, 'Zero Plastic','Lasts 80+ washes. SLS-free, vegan, recycled paper packaging.',       '["Zero Plastic","Vegan","SLS Free"]',                  'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=600', 90,  TRUE),
('Bamboo Cutting Board',      'kitchen',  699,  899,  4.8, 194, 'Sale',        'Sustainably harvested bamboo. Naturally antimicrobial.',              '["Sustainably Harvested","Antimicrobial","Durable"]',  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600', 35,  FALSE),
('Organic Herbal Tea Trio',   'food',     389,  NULL, 4.9, 427, 'Bestseller',  'Tulsi, Chamomile & Green blend from certified organic farms.',         '["Organic","Loose-Leaf","Compostable Pack"]',          'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600', 100, TRUE),
('Linen Produce Bags 6-pack', 'kitchen',  429,  549,  4.7, 305, 'Sale',        'Drawstring mesh linen bags. Replace single-use plastic bags.',         '["Plastic-Free","Organic Linen","Washable"]',          'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600', 88, FALSE);

-- ============================================================
--  USEFUL QUERIES FOR THE APP
-- ============================================================

-- Get all products by category
-- SELECT * FROM products WHERE category = 'kitchen';

-- Sort by price ascending
-- SELECT * FROM products ORDER BY price ASC;

-- Sort by rating descending
-- SELECT * FROM products ORDER BY rating DESC;

-- Search products
-- SELECT * FROM products WHERE name LIKE '%bamboo%' OR description LIKE '%bamboo%';

-- Get cart for a session
-- SELECT ci.quantity, p.* FROM cart_items ci
-- JOIN products p ON p.id = ci.product_id
-- WHERE ci.session_id = ?;

-- Add to cart
-- INSERT INTO cart_items (session_id, product_id, quantity) VALUES (?, ?, 1)
-- ON DUPLICATE KEY UPDATE quantity = quantity + 1;

-- Get order history
-- SELECT o.*, oi.quantity, p.name, p.price
-- FROM orders o JOIN order_items oi ON oi.order_id = o.id
-- JOIN products p ON p.id = oi.product_id
-- WHERE o.session_id = ?;

-- Newsletter subscription
-- INSERT IGNORE INTO subscribers (email) VALUES (?);

-- Average rating per category
-- SELECT category, AVG(rating) as avg_rating, SUM(reviews) as total_reviews
-- FROM products GROUP BY category;

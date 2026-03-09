// ============================================================
//  PRAKRITIK ECO STORE — Node.js/Express Backend
//  File: server.js
//  Run:  node server.js  (requires: npm install express mysql2 cors)
// ============================================================

const express = require('express');
const mysql   = require('mysql2/promise');
const cors    = require('cors');
const app     = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.'));  // Serve index.html, style.css, app.js

// ─── DB CONNECTION POOL ───────────────────────────────────
const db = mysql.createPool({
  host:     'localhost',
  user:     'root',
  password: 'your_password',
  database: 'prakritik_eco_store',
  waitForConnections: true,
  connectionLimit: 10,
});

// ─── PRODUCTS ─────────────────────────────────────────────

// GET /api/products — all or filtered
app.get('/api/products', async (req, res) => {
  try {
    const { category, sort, search } = req.query;
    let sql    = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (category && category !== 'all') {
      sql += ' AND category = ?';
      params.push(category);
    }
    if (search) {
      sql += ' AND (name LIKE ? OR description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }
    if (sort === 'price-low')  sql += ' ORDER BY price ASC';
    else if (sort === 'price-high') sql += ' ORDER BY price DESC';
    else if (sort === 'rating')     sql += ' ORDER BY rating DESC';

    const [rows] = await db.query(sql, params);
    // Parse eco_tags JSON string
    rows.forEach(r => { if (typeof r.eco_tags === 'string') r.eco_tags = JSON.parse(r.eco_tags); });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/:id — single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Product not found' });
    const p = rows[0];
    if (typeof p.eco_tags === 'string') p.eco_tags = JSON.parse(p.eco_tags);
    res.json(p);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── CART ─────────────────────────────────────────────────

// GET /api/cart/:sessionId
app.get('/api/cart/:sessionId', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT ci.id, ci.quantity, p.id as product_id, p.name, p.price, p.image_url, p.stock
       FROM cart_items ci
       JOIN products p ON p.id = ci.product_id
       WHERE ci.session_id = ?`,
      [req.params.sessionId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/cart — add item
app.post('/api/cart', async (req, res) => {
  const { session_id, product_id } = req.body;
  try {
    await db.query(
      `INSERT INTO cart_items (session_id, product_id, quantity) VALUES (?, ?, 1)
       ON DUPLICATE KEY UPDATE quantity = quantity + 1`,
      [session_id, product_id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/cart/:id — update quantity
app.patch('/api/cart/:id', async (req, res) => {
  const { quantity } = req.body;
  try {
    if (quantity <= 0) {
      await db.query('DELETE FROM cart_items WHERE id = ?', [req.params.id]);
    } else {
      await db.query('UPDATE cart_items SET quantity = ? WHERE id = ?', [quantity, req.params.id]);
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/cart/:id
app.delete('/api/cart/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM cart_items WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── ORDERS ───────────────────────────────────────────────

// POST /api/orders — place order
app.post('/api/orders', async (req, res) => {
  const { session_id, items, total_amount, shipping_addr } = req.body;
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    const [result] = await conn.query(
      'INSERT INTO orders (session_id, total_amount, shipping_addr) VALUES (?, ?, ?)',
      [session_id, total_amount, shipping_addr]
    );
    const order_id = result.insertId;
    for (const item of items) {
      await conn.query(
        'INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)',
        [order_id, item.product_id, item.quantity, item.price]
      );
      await conn.query(
        'UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?',
        [item.quantity, item.product_id, item.quantity]
      );
    }
    await conn.query('DELETE FROM cart_items WHERE session_id = ?', [session_id]);
    await conn.commit();
    res.json({ success: true, order_id });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
});

// ─── NEWSLETTER ───────────────────────────────────────────
app.post('/api/newsletter', async (req, res) => {
  const { email } = req.body;
  try {
    await db.query('INSERT IGNORE INTO subscribers (email) VALUES (?)', [email]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── CONTACT ──────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    await db.query(
      'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject, message]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── WISHLIST ─────────────────────────────────────────────
app.post('/api/wishlist', async (req, res) => {
  const { session_id, product_id } = req.body;
  try {
    await db.query(
      'INSERT IGNORE INTO wishlist (session_id, product_id) VALUES (?, ?)',
      [session_id, product_id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/wishlist', async (req, res) => {
  const { session_id, product_id } = req.body;
  try {
    await db.query(
      'DELETE FROM wishlist WHERE session_id = ? AND product_id = ?',
      [session_id, product_id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── START SERVER ─────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌿 Prakritik Eco Store running at http://localhost:${PORT}`);
});

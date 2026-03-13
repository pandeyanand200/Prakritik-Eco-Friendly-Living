# 🌿 Prakritik — Eco-Friendly Product Store

A full-stack eco-friendly product store built with **HTML · CSS · JavaScript · MySQL · Node.js**.

---

## 📁 Project Structure

```
eco-store/
├── index.html      ← Main storefront (all pages in one)
├── style.css       ← Full responsive styling
├── app.js          ← Frontend logic + MySQL simulation
├── server.js       ← Node.js/Express REST API backend
├── schema.sql      ← Full MySQL database schema + seed data
└── README.md
```

---

##  Features

| Feature | Details |
|---|---|
|  Product Grid | 12 real eco products with Unsplash images |
|  Live Search | Filter products by name, description, tags |
|  Category Filter | Kitchen, Personal Care, Home, Garden, Food |
|  Sort | Price low/high, Top rated, Featured |
|  Cart | Add, remove, quantity change, total |
|  Wishlist | Save favourite products |
|  Quick View Modal | Product detail popup |
|  Responsive | Mobile-first design |
|  Newsletter | Email subscription |
|  Contact Form | Message submission |
|  Scroll Reveal | Elegant entrance animations |

---

## 🗄️ MySQL Database

**Database:** `Prakritik_db`

### Tables
- `products` — store inventory (12 rows seeded)
- `cart_items` — session-based cart
- `orders` — order records
- `order_items` — order line items
- `wishlist` — saved products
- `subscribers` — newsletter emails
- `contact_messages` — contact form entries
- `product_reviews` — customer reviews
- `users` — registered accounts

### Setup
```bash
mysql -u root -p < schema.sql
```

---

##  Run the Backend

```bash
npm install express mysql2 cors
node server.js
# → http://localhost:3000
```

Update DB credentials in `server.js`:
```js
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'verdant_db',
});
```

### API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | List products (supports `?category=`, `?sort=`, `?search=`) |
| GET | `/api/products/:id` | Single product |
| GET | `/api/cart/:sessionId` | Get cart |
| POST | `/api/cart` | Add to cart |
| PATCH | `/api/cart/:id` | Update quantity |
| DELETE | `/api/cart/:id` | Remove from cart |
| POST | `/api/orders` | Place order (with transaction) |
| POST | `/api/newsletter` | Subscribe |
| POST | `/api/contact` | Send message |

---

##  Design

- **Theme:** Organic/natural — earth greens, warm cream, serif headings
- **Fonts:** Playfair Display (headings) + DM Sans (body)
- **Palette:** Forest green `#2d6a4f`, Cream `#f8f4ec`, Sand `#c9a96e`

---

Built with 💚 for the planet.

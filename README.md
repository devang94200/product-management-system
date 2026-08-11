# Role-Based Product Management System (MERN Stack)

A production-ready MERN stack application featuring Role-Based Access Control (RBAC), JWT Authentication, MongoDB Atlas integration, React Router navigation, SweetAlert2 interactive deletion prompts, and a modern minimalist glassmorphism interface built according to the NETUTECH interview assessment criteria.

---

## 🌟 Key Features & Implementation Flow

### 🔒 Authentication & Role-Based Flow
- **Clean Authentication UI**:
  - **`/login`**: Sign-in page with email and password verification against MongoDB. No hardcoded test credentials or role selector buttons visible.
  - **`/register`**: Create account page for new users. All registrations automatically assign the **User** role in MongoDB.
  - **Registration Redirect**: Creating a new account automatically redirects the user to `/login` with a green success message (*"Account created successfully! Please sign in with your credentials."*).
- **Strict Role-Based Access Control (RBAC)**:
  - **Admin Role** (`admin@netutech.com`): Full CRUD permissions to View, Create (`POST`), Edit (`PUT`), and Delete (`DELETE`) products.
  - **User Role** (Any registered user): **Read-Only** access to view the catalog, search items, filter categories, and inspect detailed product overviews. Restricted actions return `403 Forbidden` on the backend.

### 🎨 UI/UX & Design Aesthetics
- **Modern Minimalist & Pure Glassmorphism**:
  - Soft ambient light canvas with frosted glass panels (`backdrop-filter: blur(24px)`), semi-transparent cards, pill badges, and clean typography.
- **AOS (Animate On Scroll)**:
  - Micro-animations applied to navigation headers, forms, product cards, and modals.
- **Dedicated Product Overview Modal**:
  - Clicking **Details** opens a presentation modal featuring a hero image, price badge, SKU tag, variant pill, and formatted description.
- **SweetAlert2 Deletion Confirmation**:
  - Admin deletions trigger an interactive **SweetAlert2** prompt (*"Are you sure? Do you really want to delete [Product Name]?"*).

---

## 🛣️ Client Routes (`react-router-dom`)

| Path | Access Level | Component | Description |
| :--- | :--- | :--- | :--- |
| **`/`** | Root | `<RootRedirect />` | Redirects to `/products` if logged in, or `/login` if unauthenticated. |
| **`/login`** | Public | `<LoginPage />` | Sign In page. Redirects to `/products` upon login. |
| **`/register`** | Public | `<RegisterPage />` | Sign Up page. Navigates to `/login` upon account creation. |
| **`/products`** | Protected | `<ProtectedRoute>` | Main Product Inventory Dashboard. |
| **`/product`** | Protected | `<ProtectedRoute>` | Alias route for `/products`. |

---

## 📡 REST API Endpoint Specifications & RBAC

### Auth Endpoints
- `POST /api/auth/register` ➔ Register a new account (Name, Email, Password)
- `POST /api/auth/login` ➔ Authenticate user & return JWT Token + User Role
- `GET /api/auth/me` ➔ Get current logged-in profile

### Product Endpoints (RBAC Enforced)
- `GET /api/products` ➔ **Get Products (Admin + User)**
- `POST /api/products` ➔ **Add Product (Admin only)**
- `PUT /api/products/:id` ➔ **Edit Product (Admin only)**
- `DELETE /api/products/:id` ➔ **Delete Product (Admin only)**

---

## 🔑 Pre-Seeded MongoDB Accounts

| Role | Email | Password | Access Privileges |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@netutech.com` | `admin123` | Full CRUD Access (`Add`, `Edit`, `Delete` products) |
| **User** | `user@netutech.com` *(or any newly registered email)* | `user123` | Read-Only Catalog Access |

---

## 📦 Required Product Fields

1. `name` (Product Name)
2. `sku` (Stock Keeping Unit Code)
3. `price` (Unit Price)
4. `category` (Electronics, Audio, Monitors, Accessories, Wearables, Home)
5. `variant` (Specs / Color / Size)
6. `image` (Image URL)
7. `description` (Detailed text)

---

## 🚀 Quick Setup Instructions

### 1. Backend Setup
```bash
cd server
npm install
node seed.js    # Populates MongoDB Atlas with seed data & admin user
npm run dev     # Starts server on http://localhost:5000
```

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev     # Starts Vite dev server on http://localhost:3000
```

---

## 📁 Repository Structure

```
product-management-system/
├── server/                 # Express REST API Backend
│   ├── config/db.js        # MongoDB Atlas Connection
│   ├── controllers/        # Auth & Product Logic Controllers
│   ├── middleware/         # JWT Verification & RBAC Middleware
│   ├── models/             # Mongoose Models (User & Product)
│   ├── routes/             # REST API Routes
│   ├── seed.js             # MongoDB Database Seed Script
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── client/                 # React + Tailwind v4 Frontend
│   ├── src/
│   │   ├── components/     # Navbar, ProductCard, ProductModal, ProtectedRoute
│   │   ├── context/        # AuthContext (JWT Session Management)
│   │   ├── pages/          # LoginPage, RegisterPage, DashboardPage
│   │   ├── App.jsx         # React Router v7 Navigation & Routes
│   │   ├── main.jsx        # AOS Initialization & AuthProvider
│   │   └── index.css       # Tailwind v4 Glassmorphism Styles
│   ├── package.json
│   └── vite.config.js
└── README.md
```

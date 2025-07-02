# Wearhub 🛍️👕  
**Wearhub** is a modern and responsive clothing e-commerce platform built with the MERN stack. It features an intuitive shopping experience with real-time cart management, Stripe-powered secure checkout, and an admin dashboard for managing users and products.

---

## 🚀 Features

### 🛒 Shop & Cart
- View products in a responsive grid layout
- Product cards with images, titles, prices
- Add to cart functionality
- Off-canvas **cart sidebar** with real-time updates

### 💳 Stripe Checkout Integration
- Secure payment via **Stripe**
- Dynamic checkout with cart total
- Post-payment order success page
- Stripe test mode ready for development

### 👤 Admin Dashboard (In Progress)
- View all users with name, email, status
- Toggle user status (active/inactive)
- Edit/delete user
- Modal for viewing user profile image
- Planned: Add/edit/delete products

### 💻 Responsive Design
- Tailwind CSS used for styling
- Mobile-first layout
- Clean and minimal UI

---

## 🛠️ Tech Stack

| Technology       | Purpose                          |
|------------------|----------------------------------|
| **React.js**     | Frontend UI                      |
| **Tailwind CSS** | Styling                          |
| **Redux Toolkit**| Global state management (optional)|
| **Node.js**      | Backend runtime                  |
| **Express.js**   | RESTful APIs                     |
| **MongoDB**      | Database                         |
| **Stripe**       | Payment processing               |
| **Cloudinary/Multer** | (Optional) Image uploads    |

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/wearhub.git
cd wearhub

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install

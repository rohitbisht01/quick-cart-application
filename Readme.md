## QuickCart: Grocery Platform

A MERN-based grocery app inspired by Blinkit, featuring seamless shopping, secure authentication, and efficient media management.

### Features

- **User Authentication**: Secure login and registration with **JWT**.
- **Product Catalog**: Browse, search, and filter groceries.
- **Cart & Checkout**: Add to cart, apply discounts, and checkout with payment integration.
<!-- - **Order Tracking**: Real-time status updates and order history. -->
- **Email Notifications**: Order updates via **Resend**.
- **Media Management**: Optimized product images with **Cloudinary**.

### Tech Stack

- **Frontend**: React.js, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Emails**: Resend
- **Media**: Cloudinary

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:rohitbisht01/quick-cart-application.git
   cd quick-cart-application
   ```

2. Install Dependencies:

   ```
   cd frontend && npm install
   cd backend && npm install
   ```

3. Add enviroment variables:

   ```
   PORT=4000
   MONGODB_URL=
   RESEND_API=
   FRONTEND_URL=

   SECRET_KEY_ACCESS_TOKEN=
   SECRET_KEY_REFRESH_TOKEN=

   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=
   ```

4. Start Server:

   ```
   cd backend && npm run start # Backend
   cd frontend && npm run dev # Frontend
   ```

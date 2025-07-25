# 🍔 Food App - Restaurant Management System

A full-stack restaurant management application built with React.js frontend and Node.js backend, featuring user authentication, restaurant CRUD operations, and responsive design.

## ✨ Features

### 🔐 Authentication & User Management
- User registration and login with JWT authentication
- Role-based access control (Admin/User)
- User profile management (view, update, delete)
- Secure password handling

### 🏪 Restaurant Management (Admin Only)
- **Create Restaurant**: Add new restaurants with detailed information
- **View Restaurants**: Browse all restaurants with search and filter options
- **Update Restaurant**: Modify restaurant details and menu items
- **Delete Restaurant**: Remove restaurants with confirmation
- **Find Restaurant IDs**: Locate and copy restaurant IDs for management

### 🍽️ Restaurant Features
- Restaurant information (name, address, hours, rating)
- Food menu with prices
- Pickup and delivery options
- Restaurant status (open/closed)
- Search functionality by food, restaurant name, address, rating, and timing

### 📱 User Interface
- Responsive design for all devices
- Modern, clean UI with intuitive navigation
- Real-time loading states and error handling
- Success/error notifications

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI framework
- **React Router** - Client-side routing
- **CSS-in-JS** - Styling
- **Fetch API** - HTTP requests

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger

## 📋 Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (v14 or higher)
- MongoDB
- Git

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/ravisah321/Food_App.git
cd Food_App
```

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Environment Configuration
Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 4. Frontend Setup
```bash
cd ../My-Project
npm install
```

### 5. Start the Application

#### Start Backend Server
```bash
cd backend
npm start
```
The backend will run on `http://localhost:5000`

#### Start Frontend Development Server
```bash
cd My-Project
npm run dev
```
The frontend will run on `http://localhost:5173`

## 📚 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login

### User Management
- `GET /api/v1/user/userinfo` - Get user info (userName, userRole, userId)
- `GET /api/v1/user/profile` - Get user profile
- `PUT /api/v1/user/profile` - Update user profile
- `DELETE /api/v1/user/profile` - Delete user account

### Restaurant Management
- `POST /api/v1/resturant/create` - Create new restaurant
- `GET /api/v1/resturant/getAll` - Get all restaurants
- `GET /api/v1/resturant/get/:id` - Get restaurant by ID
- `PUT /api/v1/resturant/update/:id` - Update restaurant
- `DELETE /api/v1/resturant/delete/:id` - Delete restaurant
- `GET /api/v1/resturant/getMyRestaurants` - Get user's restaurants

## 🗂️ Project Structure

```
Food_App/
├── backend/
│   ├── Config/
│   │   └── connection.js
│   ├── Controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── resturantController.js
│   ├── Middlewares/
│   │   ├── authMiddleware.js
│   │   └── adminMiddleware.js
│   ├── Models/
│   │   ├── userModel.js
│   │   └── resturantModel.js
│   ├── Routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   └── resturantRoutes.js
│   └── index.js
└── My-Project/
    ├── src/
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── userProfile.jsx
    │   │   ├── yourProfile.jsx
    │   │   ├── updateProfile.jsx
    │   │   ├── deleteProfile.jsx
    │   │   ├── createRestaurant.jsx
    │   │   ├── getAllRestaurantPage.jsx
    │   │   ├── updateRestaurantPage.jsx
    │   │   ├── deleteRestaurantPage.jsx
    │   │   ├── findRestaurantId.jsx
    │   │   └── RestaurantSearch.jsx
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## 👥 User Roles

### Admin
- Can create, update, and delete restaurants
- Can view all restaurants
- Can manage their own restaurants
- Access to restaurant ID finder

### User
- Can view all restaurants
- Can search restaurants
- Can manage their profile

## 🔒 Security Features

- JWT-based authentication
- Protected routes with middleware
- Role-based access control
- Input validation
- Error handling

## 🎨 UI/UX Features

- Responsive design for mobile and desktop
- Loading states and error handling
- Success/error notifications
- Intuitive navigation
- Clean and modern interface

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Configure MongoDB connection
3. Deploy to platforms like Heroku, Railway, or Vercel

### Frontend Deployment
1. Update API base URLs for production
2. Deploy to platforms like Vercel, Netlify, or GitHub Pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ravi Singh**
- GitHub: [@yourusername](https://github.com/ravisah321)

## 🙏 Acknowledgments

- React.js community
- Node.js and Express.js documentation
- MongoDB and Mongoose documentation

---


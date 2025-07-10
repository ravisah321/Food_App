
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Home.css';

const Home = () => {
  const [userInfo, setUserInfo] = useState({ userName: 'Guest', userRole: 'User' });
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const res = await fetch('http://localhost:5000/api/v1/user/userinfo', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setUserInfo({ userName: data.userName, userRole: data.userRole });
        }
      } catch (err) {
        // fallback to Guest/User
      }
    };
    if (isLoggedIn) fetchUserInfo();
  }, [isLoggedIn]);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>🍔 Food App</h1>
        <p>Your favorite meals delivered fast at your door.</p>
        <div style={{ marginTop: '10px', fontWeight: 'bold' }}>
          {isLoggedIn ? (
            <>
              Logged in as {userInfo.userName} <br />
              <p>Role: {userInfo.userRole}</p>
            </>
          ) : (
            <span>Please log in to enjoy our services.</span>
          )}
        </div>
      </header>

      <nav className="home-nav">
        <ul>
          {/* Client Features */}
          <li><Link to="/restaurantSearch">🔍 Search Restaurants</Link></li>
          <li><Link to="/getAllRestaurant">📋 All Restaurants</Link></li>
          <li><Link to="/menu">🍽️ Menu</Link></li>
          <li><Link to="/cart">🛒 Cart</Link></li>
          <li><Link to="/orders">📋 Orders</Link></li>
          <li><Link to="/placeorder">📝 Place Order</Link></li>
          <li><Link to="/orderstatus/1">📊 Order Status</Link></li>
          {/* Admin Features - Only show if user is admin */}
          {userInfo.userRole === 'admin' && (
            <>
              <li><Link to="/createRestaurant">➕ Create Restaurant</Link></li>
              <li><Link to="/findRestaurantId">🔍 Find Restaurant ID</Link></li>
              <li><Link to="/updateRestaurant">✏️ Update Restaurant</Link></li>
              <li><Link to="/deleteRestaurant">🗑️ Delete Restaurant</Link></li>
            </>
          )}
          {/* Auth & Other */}
          <li><Link to="/login">🔐 Login</Link></li>
          <li><Link to="/register">📝 Register</Link></li>
          <li><Link to="/userProfile">👤 User Profile</Link></li>
        </ul>
      </nav>

      <section className="home-hero">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
          alt="Delicious food"
        />
        <h2>Discover, Order, Enjoy!</h2>
        <p>Browse our menu and order your favorite dishes in just a few clicks.</p>
        <Link className="hero-btn" to="/menu">See Menu</Link>
      </section>
    </div>
  );
};

export default Home;

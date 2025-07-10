import React, { useState } from 'react';

const GetRestaurantPage = () => {
  const [id, setId] = useState('');
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const userRole = localStorage.getItem('userRole');

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setRestaurant(null);
    try {
      const res = await fetch(`http://localhost:5000/api/v1/resturant/get/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Not found');
      setRestaurant(data.resturant);
    } catch (err) {
      setError(err.message || 'Failed to fetch restaurant');
    } finally {
      setLoading(false);
    }
  };

  if (userRole !== 'admin') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f7f7' }}>
        <div style={{ maxWidth: 400, width: '100%', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: '2rem', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16, color: '#e74c3c' }}>⚠️</div>
          <div style={{ color: '#e74c3c', fontWeight: 'bold', fontSize: 20, marginBottom: 8 }}>
            You have not registered as admin
          </div>
          <div style={{ color: '#555', fontSize: 16 }}>
            You are a client. Only admins can view restaurant details.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f7f7f7', padding: '2vw' }}>
      <h2 style={{ textAlign: 'center', margin: '2rem 0', color: '#2c3e50' }}>Get Restaurant by ID</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto 2rem', display: 'flex', gap: 12 }}>
        <input
          type="text"
          placeholder="Enter Restaurant ID"
          value={id}
          onChange={e => setId(e.target.value)}
          required
          style={{ flex: 1, padding: 12, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
        />
        <button type="submit" style={{ padding: '12px 20px', borderRadius: 6, background: '#2980b9', color: '#fff', fontWeight: 'bold', fontSize: 16, border: 'none', cursor: 'pointer' }}>
          Get
        </button>
      </form>
      {loading && <div style={{ textAlign: 'center', color: '#888' }}>Loading...</div>}
      {error && <div style={{ textAlign: 'center', color: '#e74c3c' }}>{error}</div>}
      {restaurant && (
        <div style={{ maxWidth: 480, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontWeight: 'bold', fontSize: 20, color: '#2c3e50' }}>{restaurant.title}</div>
          <div style={{ color: '#555', fontSize: 15 }}>Foods: {Array.isArray(restaurant.foods) ? restaurant.foods.join(', ') : restaurant.foods}</div>
          <div style={{ color: '#555', fontSize: 15 }}>Address: {restaurant.address}</div>
          <div style={{ color: '#555', fontSize: 15 }}>Open: {restaurant.opening_time} - {restaurant.closing_time}</div>
          <div style={{ color: '#555', fontSize: 15 }}>Rating: {restaurant.rating}</div>
          <div style={{ color: '#555', fontSize: 15 }}>
            {restaurant.pickup && <span style={{ marginRight: 8 }}>Pickup</span>}
            {restaurant.delivery && <span>Delivery</span>}
          </div>
          <div style={{ color: restaurant.isOpen ? '#27ae60' : '#e74c3c', fontWeight: 500 }}>
            {restaurant.isOpen ? 'Open Now' : 'Closed'}
          </div>
        </div>
      )}
    </div>
  );
};

export default GetRestaurantPage; 
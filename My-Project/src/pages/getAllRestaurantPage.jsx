import React, { useEffect, useState } from 'react';

const GetAllRestaurantPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('http://localhost:5000/api/v1/resturant/getAll', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message || 'Failed to fetch');
        setRestaurants(data.resturants || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch restaurants');
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
    
  }, [userRole]);

 
  return (
    <div style={{ minHeight: '100vh', background: '#f7f7f7', padding: '2vw' }}>
      <h2 style={{ textAlign: 'center', margin: '2rem 0', color: '#2c3e50' }}>All Restaurants</h2>
      {loading ? (
        <div style={{ textAlign: 'center', color: '#888' }}>Loading...</div>
      ) : error ? (
        <div style={{ textAlign: 'center', color: '#e74c3c' }}>{error}</div>
      ) : restaurants.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#888' }}>No restaurants found.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          {restaurants.map(r => (
            <div key={r._id} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontWeight: 'bold', fontSize: 20, color: '#2c3e50' }}>{r.title}</div>
              <div style={{ color: '#555', fontSize: 15 }}>Foods: {Array.isArray(r.foods) ? r.foods.join(', ') : r.foods}</div>
              <div style={{ color: '#555', fontSize: 15 }}>Address: {r.address}</div>
              <div style={{ color: '#555', fontSize: 15 }}>Open: {r.opening_time} - {r.closing_time}</div>
              <div style={{ color: '#555', fontSize: 15 }}>Rating: {r.rating}</div>
              <div style={{ color: '#555', fontSize: 15 }}>
                {r.pickup && <span style={{ marginRight: 8 }}>Pickup</span>}
                {r.delivery && <span>Delivery</span>}
              </div>
              <div style={{ color: r.isOpen ? '#27ae60' : '#e74c3c', fontWeight: 500 }}>
                {r.isOpen ? 'Open Now' : 'Closed'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetAllRestaurantPage;

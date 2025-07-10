import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateRestaurant = () => {
  const [userRole, setUserRole] = useState('User');
  const [userName, setUserName] = useState('Guest');
  const [userId, setUserId] = useState('');
  const [loadingUser, setLoadingUser] = useState(true);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [form, setForm] = useState({
    title: '',
    foods: '', // comma separated
    opening_time: '',
    closing_time: '',
    pickup: false,
    delivery: false,
    isOpen: true,
    rating: 1,
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState('');

  // Fetch user info from backend
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!token) return;
      try {
        const res = await fetch('http://localhost:5000/api/v1/user/userinfo', {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          setUserRole(data.userRole);
          setUserName(data.userName);
          setUserId(data.userId);
        }
      } catch {}
      setLoadingUser(false);
    };
    fetchUserInfo();
  }, [token]);

  // Fetch restaurants on component mount
  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/resturant/getAll', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setRestaurants(data.resturants);
      }
    } catch (err) {
      console.error('Error fetching restaurants:', err);
    } finally {
      setFetching(false);
    }
  };

  // After fetching restaurants, check if any are owned by the user
  const ownsAnyRestaurant = restaurants.some(r => r.owner === userId);

  // Load restaurant data when selection changes
  useEffect(() => {
    if (selectedRestaurant) {
      const restaurant = restaurants.find(r => r._id === selectedRestaurant);
      if (restaurant) {
        setForm({
          title: restaurant.title || '',
          foods: Array.isArray(restaurant.foods) ? restaurant.foods.join(', ') : '',
          opening_time: restaurant.opening_time || '',
          closing_time: restaurant.closing_time || '',
          pickup: restaurant.pickup || false,
          delivery: restaurant.delivery || false,
          isOpen: restaurant.isOpen !== undefined ? restaurant.isOpen : true,
          rating: restaurant.rating || 1,
          address: restaurant.address || '',
        });
      }
    }
  }, [selectedRestaurant, restaurants]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setForm({ ...form, [name]: checked });
    } else if (name === 'rating') {
      setForm({ ...form, [name]: Number(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!selectedRestaurant) {
      setMessage('Please select a restaurant to update');
      return;
    }

    setLoading(true);
    setMessage('');
    
    // foods: convert comma separated string to array
    const payload = { 
      ...form, 
      foods: form.foods.split(',').map(f => f.trim()).filter(Boolean) 
    };
    
    try {
      const res = await fetch(`http://localhost:5000/api/v1/resturant/update/${selectedRestaurant}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      
      if (data.success) {
        setMessage('Restaurant updated successfully!');
        fetchRestaurants(); // Refresh the list
        setTimeout(() => navigate('/restaurant'), 1500);
      } else {
        setMessage(data.message || 'Failed to update restaurant');
      }
    } catch (err) {
      setMessage(err?.message || 'Failed to update restaurant');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f7f7f7', 
      padding: '1rem'
    }}>
      {loadingUser ? (
        <div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          background: '#f7f7f7',
          padding: '1rem'
        }}>
          <div style={{ 
            maxWidth: 400, 
            width: '100%', 
            background: '#fff', 
            borderRadius: 12, 
            boxShadow: '0 2px 16px rgba(0,0,0,0.08)', 
            padding: '2rem', 
            textAlign: 'center' 
          }}>
            <div style={{ fontSize: '3rem', marginBottom: 16, color: '#e74c3c' }}>⚠️</div>
            <div style={{ color: '#e74c3c', fontWeight: 'bold', fontSize: '1.25rem', marginBottom: 8 }}>
              Loading User Info...
            </div>
            <div style={{ color: '#555', fontSize: '1rem' }}>
              Please wait while we fetch your user information.
            </div>
          </div>
        </div>
      ) : userRole !== 'admin' ? (
        <div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          background: '#f7f7f7',
          padding: '1rem'
        }}>
          <div style={{ 
            maxWidth: 400, 
            width: '100%', 
            background: '#fff', 
            borderRadius: 12, 
            boxShadow: '0 2px 16px rgba(0,0,0,0.08)', 
            padding: '2rem', 
            textAlign: 'center' 
          }}>
            <div style={{ fontSize: '3rem', marginBottom: 16, color: '#e74c3c' }}>⚠️</div>
            <div style={{ color: '#e74c3c', fontWeight: 'bold', fontSize: '1.25rem', marginBottom: 8 }}>
              Access Denied
            </div>
            <div style={{ color: '#555', fontSize: '1rem' }}>
              Only admins can update restaurants.
            </div>
          </div>
        </div>
      ) : !ownsAnyRestaurant ? (
        <div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          background: '#f7f7f7',
          padding: '1rem'
        }}>
          <div style={{ 
            maxWidth: 400, 
            width: '100%', 
            background: '#fff', 
            borderRadius: 12, 
            boxShadow: '0 2px 16px rgba(0,0,0,0.08)', 
            padding: '2rem', 
            textAlign: 'center' 
          }}>
            <div style={{ fontSize: '3rem', marginBottom: 16, color: '#e74c3c' }}>⚠️</div>
            <div style={{ color: '#e74c3c', fontWeight: 'bold', fontSize: '1.25rem', marginBottom: 8 }}>
              No Restaurants Found
            </div>
            <div style={{ color: '#555', fontSize: '1rem' }}>
              You do not own any restaurants. This page is only available to restaurant owners/admins.
            </div>
          </div>
        </div>
      ) : (
        <div style={{ 
          maxWidth: 800, 
          margin: '0 auto', 
          background: '#fff', 
          borderRadius: 12, 
          boxShadow: '0 2px 16px rgba(0,0,0,0.08)', 
          padding: '2rem',
          marginTop: '2rem'
        }}>
          <h2 style={{ 
            textAlign: 'center', 
            margin: '0 0 2rem 0', 
            color: '#2c3e50',
            fontSize: '2rem',
            fontWeight: 'bold'
          }}>
            Update Restaurant
          </h2>
          
          {fetching ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
              Loading restaurants...
            </div>
          ) : (
            <>
              <div style={{ 
                marginBottom: '2rem',
                display: 'flex', 
                flexDirection: 'column',
                gap: '1rem'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontWeight: 'bold', color: '#2c3e50' }}>
                    Select Restaurant to Update:
                  </label>
                  <select
                    value={selectedRestaurant}
                    onChange={e => setSelectedRestaurant(e.target.value)}
                    required
                    style={{ 
                      padding: '12px', 
                      borderRadius: 6, 
                      border: '1px solid #ccc', 
                      fontSize: '1rem',
                      backgroundColor: '#fff'
                    }}
                  >
                    <option value="">Choose a restaurant...</option>
                    {restaurants.map(restaurant => (
                      <option key={restaurant._id} value={restaurant._id}>
                        {restaurant.title} - {restaurant.address}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {selectedRestaurant && (
                <form onSubmit={handleSubmit} style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '1rem',
                  marginBottom: '2rem'
                }}>
                  <input
                    type="text"
                    name="title"
                    placeholder="Restaurant Title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    style={{ 
                      padding: '12px', 
                      borderRadius: 6, 
                      border: '1px solid #ccc', 
                      fontSize: '1rem',
                      backgroundColor: '#fff'
                    }}
                  />
                  <input
                    type="text"
                    name="foods"
                    placeholder="Foods (comma separated, e.g. Pizza, Burger, Salad)"
                    value={form.foods}
                    onChange={handleChange}
                    required
                    style={{ 
                      padding: '12px', 
                      borderRadius: 6, 
                      border: '1px solid #ccc', 
                      fontSize: '1rem',
                      backgroundColor: '#fff'
                    }}
                  />
                  <input
                    type="text"
                    name="opening_time"
                    placeholder="Opening Time (e.g. 09:00 AM)"
                    value={form.opening_time}
                    onChange={handleChange}
                    required
                    style={{ 
                      padding: '12px', 
                      borderRadius: 6, 
                      border: '1px solid #ccc', 
                      fontSize: '1rem',
                      backgroundColor: '#fff'
                    }}
                  />
                  <input
                    type="text"
                    name="closing_time"
                    placeholder="Closing Time (e.g. 10:00 PM)"
                    value={form.closing_time}
                    onChange={handleChange}
                    required
                    style={{ 
                      padding: '12px', 
                      borderRadius: 6, 
                      border: '1px solid #ccc', 
                      fontSize: '1rem',
                      backgroundColor: '#fff'
                    }}
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    style={{ 
                      padding: '12px', 
                      borderRadius: 6, 
                      border: '1px solid #ccc', 
                      fontSize: '1rem',
                      backgroundColor: '#fff'
                    }}
                  />
                  
                  <div style={{ 
                    display: 'flex', 
                    gap: '1rem', 
                    flexWrap: 'wrap', 
                    margin: '0.5rem 0',
                    padding: '1rem',
                    background: '#f8f9fa',
                    borderRadius: 8
                  }}>
                    <label style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem', 
                      fontSize: '1rem',
                      cursor: 'pointer'
                    }}>
                      <input
                        type="checkbox"
                        name="pickup"
                        checked={form.pickup}
                        onChange={handleChange}
                        style={{ width: '1.2rem', height: '1.2rem' }}
                      /> 
                      Pickup Available
                    </label>
                    <label style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem', 
                      fontSize: '1rem',
                      cursor: 'pointer'
                    }}>
                      <input
                        type="checkbox"
                        name="delivery"
                        checked={form.delivery}
                        onChange={handleChange}
                        style={{ width: '1.2rem', height: '1.2rem' }}
                      /> 
                      Delivery Available
                    </label>
                    <label style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem', 
                      fontSize: '1rem',
                      cursor: 'pointer'
                    }}>
                      <input
                        type="checkbox"
                        name="isOpen"
                        checked={form.isOpen}
                        onChange={handleChange}
                        style={{ width: '1.2rem', height: '1.2rem' }}
                      /> 
                      Currently Open
                    </label>
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem',
                    padding: '1rem',
                    background: '#f8f9fa',
                    borderRadius: 8
                  }}>
                    <label style={{ 
                      fontSize: '1rem', 
                      fontWeight: 'bold',
                      color: '#2c3e50'
                    }}>
                      Rating (1-5):
                    </label>
                    <input
                      type="number"
                      name="rating"
                      min="1"
                      max="5"
                      value={form.rating}
                      onChange={handleChange}
                      style={{ 
                        width: '80px', 
                        padding: '8px', 
                        borderRadius: 6, 
                        border: '1px solid #ccc', 
                        fontSize: '1rem',
                        backgroundColor: '#fff'
                      }}
                      required
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={loading}
                    style={{ 
                      padding: '14px', 
                      borderRadius: 6, 
                      background: loading ? '#95a5a6' : '#27ae60', 
                      color: '#fff', 
                      fontWeight: 'bold', 
                      fontSize: '1.1rem', 
                      border: 'none', 
                      cursor: loading ? 'not-allowed' : 'pointer', 
                      marginTop: '1rem',
                      transition: 'background-color 0.3s ease'
                    }}
                  >
                    {loading ? 'Updating...' : 'Update Restaurant'}
                  </button>
                </form>
              )}

              {restaurants.length === 0 && !fetching && (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '2rem', 
                  color: '#888',
                  background: '#f8f9fa',
                  borderRadius: 8
                }}>
                  No restaurants available to update.
                </div>
              )}

              {message && (
                <div style={{ 
                  textAlign: 'center', 
                  color: message?.toLowerCase().includes('success') ? '#27ae60' : '#e74c3c', 
                  padding: '1rem',
                  background: message?.toLowerCase().includes('success') ? '#f0fdf4' : '#fdf2f2',
                  borderRadius: 8,
                  border: `1px solid ${message?.toLowerCase().includes('success') ? '#bbf7d0' : '#fecaca'}`,
                  fontWeight: 500 
                }}>
                  {message}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UpdateRestaurant;

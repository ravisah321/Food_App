import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateRestaurant = () => {
  const [userRole, setUserRole] = useState('User');
  const [userName, setUserName] = useState('Guest');
  const [loadingUser, setLoadingUser] = useState(true);
  const token = localStorage.getItem('token');
  const [form, setForm] = useState({
    title: '',
    foods: [{ name: '', price: '' }],
    opening_time: '',
    closing_time: '',
    pickup: false,
    delivery: false,
    isOpen: true,
    rating: 1,
    address: '',
    owner: '',
  });
  const [message, setMessage] = useState('');
  const [createdRestaurant, setCreatedRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

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
        }
      } catch {}
      setLoadingUser(false);
    };
    fetchUserInfo();
  }, [token]);

  // Countdown timer effect
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0 && createdRestaurant) {
      timer = setTimeout(() => {
        navigate('/restaurant');
      }, 100);
    }
    return () => clearTimeout(timer);
  }, [countdown, createdRestaurant, navigate]);

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

  // Foods handlers
  const handleFoodChange = (idx, field, value) => {
    const newFoods = form.foods.map((food, i) =>
      i === idx ? { ...food, [field]: value } : food
    );
    setForm({ ...form, foods: newFoods });
  };

  const addFood = () => {
    setForm({ ...form, foods: [...form.foods, { name: '', price: '' }] });
  };

  const removeFood = idx => {
    setForm({ ...form, foods: form.foods.filter((_, i) => i !== idx) });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setCreatedRestaurant(null);
    // foods: convert price to number
    const foods = form.foods.map(f => ({ name: f.name, price: Number(f.price) }));
    const payload = { ...form, foods };
    try {
      const res = await fetch('http://localhost:5000/api/v1/resturant/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Restaurant created successfully!');
        setCreatedRestaurant(data.resturant || { _id: 'Restaurant ID will be available after creation' });
        setForm({
          title: '',
          foods: [{ name: '', price: '' }],
          opening_time: '',
          closing_time: '',
          pickup: false,
          delivery: false,
          isOpen: true,
          rating: 1,
          address: '',
          owner: '',
        });
        setCountdown(15);
      } else {
        setMessage(data.message || 'Failed to create restaurant');
      }
    } catch (err) {
      setMessage(err?.message || 'Failed to create restaurant');
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
              Only admins can create restaurants.
            </div>
          </div>
        </div>
      ) : (
        <div style={{ 
          maxWidth: 600, 
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
            Create Restaurant
          </h2>
          {createdRestaurant ? (
            <div style={{ 
              background: '#f0fdf4',
              borderRadius: 12,
              padding: '2rem',
              border: '2px solid #bbf7d0',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: 16, color: '#27ae60' }}>✅</div>
              <h3 style={{ 
                color: '#27ae60', 
                fontSize: '1.5rem', 
                fontWeight: 'bold',
                marginBottom: '1rem'
              }}>
                Restaurant Created Successfully!
              </h3>
              
              <div style={{ 
                background: '#fff',
                padding: '1.5rem',
                borderRadius: 8,
                marginBottom: '1rem',
                border: '1px solid #d1fae5'
              }}>
                <h4 style={{ 
                  color: '#2c3e50', 
                  fontSize: '1.1rem', 
                  fontWeight: 'bold',
                  marginBottom: '1rem'
                }}>
                  Restaurant Details:
                </h4>
                
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1rem',
                  textAlign: 'left'
                }}>
                  <div>
                    <strong style={{ color: '#2c3e50' }}>Name:</strong>
                    <div style={{ color: '#555', marginTop: '0.2rem' }}>{createdRestaurant.title}</div>
                  </div>
                  
                  <div>
                    <strong style={{ color: '#2c3e50' }}>Address:</strong>
                    <div style={{ color: '#555', marginTop: '0.2rem' }}>{createdRestaurant.address}</div>
                  </div>
                  
                  <div>
                    <strong style={{ color: '#2c3e50' }}>Restaurant ID:</strong>
                    <div style={{ 
                      color: '#555', 
                      marginTop: '0.2rem',
                      fontSize: '0.9rem',
                      fontFamily: 'monospace',
                      background: '#f8f9fa',
                      padding: '0.5rem',
                      borderRadius: '4px',
                      wordBreak: 'break-all',
                      border: '1px solid #e9ecef'
                    }}>
                      {createdRestaurant._id}
                    </div>
                    <div style={{ 
                      color: '#e74c3c', 
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      marginTop: '0.3rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}>
                      🔒 Keep it safe!
                    </div>
                  </div>
                  
                  <div>
                    <strong style={{ color: '#2c3e50' }}>Status:</strong>
                    <div style={{ 
                      color: createdRestaurant.isOpen ? '#27ae60' : '#e74c3c', 
                      marginTop: '0.2rem',
                      fontWeight: 'bold'
                    }}>
                      {createdRestaurant.isOpen ? '🟢 Open' : '🔴 Closed'}
                    </div>
                  </div>
                </div>
              </div>
              
              <div style={{ 
                color: '#666', 
                fontSize: '0.9rem',
                fontStyle: 'italic'
              }}>
                Redirecting to restaurant page in {countdown} second{countdown !== 1 ? 's' : ''}...
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1rem'
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
              {/* Foods Section */}
              <div style={{ background: '#f8f9fa', borderRadius: 8, padding: '1rem' }}>
                <label style={{ fontWeight: 'bold', color: '#2c3e50', marginBottom: 8, display: 'block' }}>Foods & Prices</label>
                {form.foods.map((food, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '0.5rem', marginBottom: 8, alignItems: 'center' }}>
                    <input
                      type="text"
                      placeholder="Food Name"
                      value={food.name}
                      onChange={e => handleFoodChange(idx, 'name', e.target.value)}
                      required
                      style={{ padding: '8px', borderRadius: 4, border: '1px solid #ccc', flex: 2 }}
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      value={food.price}
                      min="0"
                      onChange={e => handleFoodChange(idx, 'price', e.target.value)}
                      required
                      style={{ padding: '8px', borderRadius: 4, border: '1px solid #ccc', flex: 1 }}
                    />
                    {form.foods.length > 1 && (
                      <button type="button" onClick={() => removeFood(idx)} style={{ background: '#e74c3c', color: '#fff', border: 'none', borderRadius: 4, padding: '0.5rem 0.75rem', cursor: 'pointer' }}>-</button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addFood} style={{ background: '#27ae60', color: '#fff', border: 'none', borderRadius: 4, padding: '0.5rem 1rem', cursor: 'pointer', marginTop: 8 }}>+ Add Food</button>
              </div>
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
                {loading ? 'Creating...' : 'Create Restaurant'}
              </button>
            </form>
          )}

          {message && !createdRestaurant && (
            <div style={{ 
              textAlign: 'center', 
              color: message?.toLowerCase().includes('success') ? '#27ae60' : '#e74c3c', 
              padding: '1rem',
              background: message?.toLowerCase().includes('success') ? '#f0fdf4' : '#fdf2f2',
              borderRadius: 8,
              border: `1px solid ${message?.toLowerCase().includes('success') ? '#bbf7d0' : '#fecaca'}`,
              fontWeight: 500,
              marginTop: '1rem'
            }}>
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreateRestaurant;

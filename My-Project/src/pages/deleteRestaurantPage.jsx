import React, { useState, useEffect } from 'react';

const DeleteRestaurantPage = () => {
  const [userRole, setUserRole] = useState('User');
  const [userName, setUserName] = useState('Guest');
  const [userId, setUserId] = useState('');
  const [loadingUser, setLoadingUser] = useState(true);
  const [restaurantId, setRestaurantId] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const token = localStorage.getItem('token');

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

  const handleSubmit = async e => {
    e.preventDefault();
    if (!restaurantId) {
      setError('Please select a restaurant to delete');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const res = await fetch(`http://localhost:5000/api/v1/resturant/delete/${restaurantId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Delete failed');
      setSuccess('Restaurant deleted successfully!');
      setRestaurantId(''); // Reset the form field
      fetchRestaurants(); // Refresh the list
    } catch (err) {
      setError(err.message || 'Failed to delete restaurant');
    } finally {
      setLoading(false);
    }
  };

  if (loadingUser) {
    return (
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
    );
  }
  if (userRole !== 'admin') {
    return (
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
            Only admins can delete restaurants.
          </div>
        </div>
      </div>
    );
  }
  if (!ownsAnyRestaurant) {
    return (
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
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f7f7f7', 
      padding: '1rem'
    }}>
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
          Delete Restaurant
        </h2>
        
        {fetching ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
            Loading restaurants...
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} style={{ 
              marginBottom: '2rem',
              display: 'flex', 
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 'bold', color: '#2c3e50' }}>
                  Select Restaurant to Delete:
                </label>
                <select
                  value={restaurantId}
                  onChange={e => setRestaurantId(e.target.value)}
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
              
              <button 
                type="submit" 
                disabled={loading || !restaurantId}
                style={{ 
                  padding: '12px 20px', 
                  borderRadius: 6, 
                  background: loading || !restaurantId ? '#95a5a6' : '#c0392b', 
                  color: '#fff', 
                  fontWeight: 'bold', 
                  fontSize: '1rem', 
                  border: 'none', 
                  cursor: loading || !restaurantId ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.3s ease'
                }}
              >
                {loading ? 'Deleting...' : 'Delete Restaurant'}
              </button>
            </form>

            {restaurants.length === 0 && !fetching && (
              <div style={{ 
                textAlign: 'center', 
                padding: '2rem', 
                color: '#888',
                background: '#f8f9fa',
                borderRadius: 8
              }}>
                No restaurants available to delete.
              </div>
            )}

            {error && (
              <div style={{ 
                textAlign: 'center', 
                color: '#e74c3c', 
                padding: '1rem',
                background: '#fdf2f2',
                borderRadius: 8,
                border: '1px solid #fecaca',
                marginBottom: '1rem'
              }}>
                {error}
              </div>
            )}
            
            {success && (
              <div style={{ 
                textAlign: 'center', 
                color: '#27ae60', 
                padding: '1rem',
                background: '#f0fdf4',
                borderRadius: 8,
                border: '1px solid #bbf7d0'
              }}>
                {success}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DeleteRestaurantPage;

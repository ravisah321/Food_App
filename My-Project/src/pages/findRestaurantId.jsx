import React, { useState, useEffect } from 'react';

const FindRestaurantId = () => {
  const [userRole, setUserRole] = useState('User');
  const [userName, setUserName] = useState('Guest');
  const [loadingUser, setLoadingUser] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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
        }
      } catch {}
      setLoadingUser(false);
    };
    fetchUserInfo();
  }, [token]);

  // Fetch restaurants created by the current admin
  useEffect(() => {
    if (userRole === 'admin') {
      fetchMyRestaurants();
    }
  }, [userRole]);

  // Filter restaurants based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredRestaurants(restaurants);
    } else {
      const filtered = restaurants.filter(restaurant =>
        restaurant.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRestaurants(filtered);
    }
  }, [searchTerm, restaurants]);

  const fetchMyRestaurants = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/resturant/getMyRestaurants', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setRestaurants(data.resturants);
        setFilteredRestaurants(data.resturants);
      } else {
        setError(data.message || 'Failed to fetch your restaurants');
      }
    } catch (err) {
      setError('Failed to fetch restaurants. Please check your connection.');
    } finally {
      setFetching(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setSuccess('Restaurant ID copied to clipboard!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to copy to clipboard');
      setTimeout(() => setError(''), 3000);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

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
            Only admins can access restaurant ID finder.
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
        maxWidth: 900, 
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
          Find Your Restaurant IDs
        </h2>
        
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '2rem',
          padding: '1rem',
          background: '#e3f2fd',
          borderRadius: 8,
          border: '1px solid #bbdefb'
        }}>
          <div style={{ fontSize: '1.2rem', color: '#1565c0', marginBottom: '0.5rem' }}>
            🔍 Restaurant ID Finder
          </div>
          <div style={{ color: '#555', fontSize: '0.9rem' }}>
            View and copy the IDs of restaurants you've created. Keep these IDs safe for future management.
          </div>
        </div>

        {/* Search Section */}
        {!fetching && restaurants.length > 0 && (
          <div style={{ 
            marginBottom: '2rem',
            padding: '1.5rem',
            background: '#f8f9fa',
            borderRadius: 8,
            border: '1px solid #e9ecef'
          }}>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <label style={{ 
                fontWeight: 'bold', 
                color: '#2c3e50',
                fontSize: '1rem'
              }}>
                🔍 Search Your Restaurants:
              </label>
              <div style={{ 
                display: 'flex', 
                gap: '1rem',
                flexWrap: 'wrap'
              }}>
                <input
                  type="text"
                  placeholder="Search by restaurant name or address..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  style={{ 
                    flex: 1,
                    minWidth: '250px',
                    padding: '12px', 
                    borderRadius: 6, 
                    border: '1px solid #ccc', 
                    fontSize: '1rem',
                    backgroundColor: '#fff'
                  }}
                />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    style={{ 
                      padding: '12px 20px', 
                      borderRadius: 6, 
                      background: '#95a5a6', 
                      color: '#fff', 
                      fontWeight: 'bold', 
                      fontSize: '1rem', 
                      border: 'none', 
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease'
                    }}
                  >
                    Clear
                  </button>
                )}
              </div>
              {searchTerm && (
                <div style={{ 
                  fontSize: '0.9rem', 
                  color: '#666',
                  fontStyle: 'italic'
                }}>
                  Found {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''} matching "{searchTerm}"
                </div>
              )}
            </div>
          </div>
        )}

        {fetching ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            color: '#888',
            fontSize: '1.1rem'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
            Loading your restaurants...
          </div>
        ) : (
          <>
                         {filteredRestaurants.length === 0 ? (
                             <div style={{ 
                 textAlign: 'center', 
                 padding: '3rem', 
                 color: '#888',
                 background: '#f8f9fa',
                 borderRadius: 8
               }}>
                 <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                   {searchTerm ? '🔍' : '🏪'}
                 </div>
                 <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#2c3e50' }}>
                   {searchTerm ? 'No Matching Restaurants' : 'No Restaurants Found'}
                 </div>
                 <div style={{ fontSize: '1rem' }}>
                   {searchTerm ? (
                     <>
                       No restaurants found matching "{searchTerm}".
                       <br />
                       <button
                         onClick={clearSearch}
                         style={{ 
                           color: '#3498db', 
                           background: 'none',
                           border: 'none',
                           textDecoration: 'underline',
                           fontWeight: 'bold',
                           cursor: 'pointer',
                           marginTop: '0.5rem'
                         }}
                       >
                         Clear search to see all restaurants
                       </button>
                     </>
                   ) : (
                     <>
                       You haven't created any restaurants yet. 
                       <br />
                       <a 
                         href="/createRestaurant" 
                         style={{ 
                           color: '#3498db', 
                           textDecoration: 'none',
                           fontWeight: 'bold'
                         }}
                       >
                         Create your first restaurant →
                       </a>
                     </>
                   )}
                 </div>
               </div>
            ) : (
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '1.5rem'
              }}>
                                 {filteredRestaurants.map((restaurant, index) => (
                  <div key={restaurant._id} style={{ 
                    background: '#f8f9fa',
                    borderRadius: 12,
                    padding: '1.5rem',
                    border: '1px solid #e9ecef',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    cursor: 'pointer',
                    ':hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'flex-start',
                      marginBottom: '1rem'
                    }}>
                      <h3 style={{ 
                        color: '#2c3e50', 
                        fontSize: '1.3rem', 
                        fontWeight: 'bold',
                        margin: 0
                      }}>
                        {restaurant.title}
                      </h3>
                      <span style={{ 
                        padding: '0.3rem 0.8rem',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        background: restaurant.isOpen ? '#d4edda' : '#f8d7da',
                        color: restaurant.isOpen ? '#155724' : '#721c24'
                      }}>
                        {restaurant.isOpen ? '🟢 Open' : '🔴 Closed'}
                      </span>
                    </div>

                    <div style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '0.8rem',
                      marginBottom: '1.5rem'
                    }}>
                      <div>
                        <strong style={{ color: '#2c3e50', fontSize: '0.9rem' }}>Address:</strong>
                        <div style={{ color: '#555', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                          {restaurant.address}
                        </div>
                      </div>
                      
                      <div>
                        <strong style={{ color: '#2c3e50', fontSize: '0.9rem' }}>Rating:</strong>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.3rem',
                          marginTop: '0.2rem'
                        }}>
                          <span style={{ color: '#555', fontSize: '0.9rem' }}>
                            {restaurant.rating}/5
                          </span>
                          <div style={{ display: 'flex', gap: '1px' }}>
                            {[...Array(5)].map((_, i) => (
                              <span key={i} style={{ 
                                color: i < restaurant.rating ? '#f39c12' : '#ddd',
                                fontSize: '0.9rem'
                              }}>
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <strong style={{ color: '#2c3e50', fontSize: '0.9rem' }}>Services:</strong>
                        <div style={{ 
                          display: 'flex', 
                          gap: '0.5rem', 
                          marginTop: '0.2rem',
                          flexWrap: 'wrap'
                        }}>
                          <span style={{ 
                            padding: '0.2rem 0.6rem',
                            borderRadius: '15px',
                            fontSize: '0.8rem',
                            background: restaurant.pickup ? '#d4edda' : '#f8d7da',
                            color: restaurant.pickup ? '#155724' : '#721c24'
                          }}>
                            {restaurant.pickup ? '✅ Pickup' : '❌ No Pickup'}
                          </span>
                          <span style={{ 
                            padding: '0.2rem 0.6rem',
                            borderRadius: '15px',
                            fontSize: '0.8rem',
                            background: restaurant.delivery ? '#d4edda' : '#f8d7da',
                            color: restaurant.delivery ? '#155724' : '#721c24'
                          }}>
                            {restaurant.delivery ? '✅ Delivery' : '❌ No Delivery'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div style={{ 
                      background: '#fff',
                      padding: '1rem',
                      borderRadius: 8,
                      border: '1px solid #e9ecef'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginBottom: '0.5rem'
                      }}>
                        <strong style={{ color: '#2c3e50', fontSize: '0.9rem' }}>
                          Restaurant ID:
                        </strong>
                        <button
                          onClick={() => copyToClipboard(restaurant._id)}
                          style={{ 
                            padding: '0.3rem 0.8rem',
                            borderRadius: '6px',
                            background: '#3498db',
                            color: '#fff',
                            border: 'none',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            transition: 'background-color 0.2s ease'
                          }}
                        >
                          📋 Copy ID
                        </button>
                      </div>
                      <div style={{ 
                        color: '#555', 
                        fontSize: '0.8rem',
                        fontFamily: 'monospace',
                        background: '#f8f9fa',
                        padding: '0.5rem',
                        borderRadius: '4px',
                        wordBreak: 'break-all',
                        border: '1px solid #e9ecef',
                        userSelect: 'text'
                      }}>
                        {restaurant._id}
                      </div>
                      <div style={{ 
                        color: '#e74c3c', 
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        marginTop: '0.3rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}>
                        🔒 Keep it safe!
                      </div>
                    </div>

                    <div style={{ 
                      marginTop: '1rem',
                      padding: '0.5rem',
                      background: '#fff',
                      borderRadius: '6px',
                      border: '1px solid #e9ecef'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        fontSize: '0.8rem',
                        color: '#666'
                      }}>
                        <span>Created: {new Date(restaurant.createdAt).toLocaleDateString()}</span>
                        <span>Updated: {new Date(restaurant.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {error && (
          <div style={{ 
            textAlign: 'center', 
            color: '#e74c3c', 
            padding: '1rem',
            background: '#fdf2f2',
            borderRadius: 8,
            border: '1px solid #fecaca',
            marginTop: '1rem'
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
            border: '1px solid #bbf7d0',
            marginTop: '1rem'
          }}>
            {success}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindRestaurantId;

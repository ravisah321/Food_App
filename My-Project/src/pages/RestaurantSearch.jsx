import React, { useState, useEffect } from 'react';

const RestaurantSearch = () => {
  const [searchType, setSearchType] = useState('restaurant');
  const [searchTerm, setSearchTerm] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showResults, setShowResults] = useState(false);
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  const handleSubmit = async e => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setError('Please enter a search term');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    setRestaurants([]);
    setShowResults(false);

    try {
      let url = 'http://localhost:5000/api/v1/resturant/getAll';
      
      // Add search parameters based on search type
      const params = new URLSearchParams();
      params.append('searchType', searchType);
      params.append('searchTerm', searchTerm.trim());
      
      const res = await fetch(`${url}?${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      
      if (data.success) {
        setRestaurants(data.resturants || []);
        setShowResults(true);
        setSuccess(`Found ${data.resturants?.length || 0} restaurant(s)`);
      } else {
        setError(data.message || 'No restaurants found');
      }
    } catch (err) {
      setError('Failed to search restaurants. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setRestaurants([]);
    setError('');
    setSuccess('');
    setSearchTerm('');
    setShowResults(false);
  };

  const getSearchPlaceholder = () => {
    switch (searchType) {
      case 'food':
        return 'Enter food name (e.g., Pizza, Burger, Salad)';
      case 'restaurant':
        return 'Enter restaurant name (e.g., McDonald\'s, Pizza Hut)';
      case 'address':
        return 'Enter address or location (e.g., Downtown, Main Street)';
      case 'rating':
        return 'Enter minimum rating (1-5)';
      case 'timing':
        return 'Enter time (e.g., 9 AM, 10 PM, Open Now)';
      default:
        return 'Enter search term...';
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f7f7f7', 
      padding: '1rem'
    }}>
      <div style={{ 
        maxWidth: 1000, 
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
          🍽️ Restaurant Search
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
            Find Your Perfect Restaurant
          </div>
          <div style={{ color: '#555', fontSize: '0.9rem' }}>
            Search by food, restaurant name, address, rating, or timing to discover great places to eat.
          </div>
        </div>

        {/* Search Type Selection */}
        <div style={{ 
          marginBottom: '2rem',
          padding: '1.5rem',
          background: '#f8f9fa',
          borderRadius: 8,
          border: '1px solid #e9ecef'
        }}>
          <label style={{ 
            fontWeight: 'bold', 
            color: '#2c3e50',
            marginBottom: '1rem',
            display: 'block'
          }}>
            🔍 Search Type:
          </label>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem'
          }}>
            {[
              { value: 'food', label: '🍕 Food', icon: '🍕' },
              { value: 'restaurant', label: '🏪 Restaurant', icon: '🏪' },
              { value: 'address', label: '📍 Address', icon: '📍' },
              { value: 'rating', label: '⭐ Rating', icon: '⭐' },
              { value: 'timing', label: '🕐 Timing', icon: '🕐' }
            ].map(type => (
              <button
                key={type.value}
                type="button"
                onClick={() => setSearchType(type.value)}
                style={{ 
                  padding: '1rem',
                  borderRadius: 8,
                  border: searchType === type.value ? '2px solid #3498db' : '1px solid #ddd',
                  background: searchType === type.value ? '#e3f2fd' : '#fff',
                  color: searchType === type.value ? '#1565c0' : '#555',
                  fontWeight: searchType === type.value ? 'bold' : 'normal',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '0.9rem'
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>{type.icon}</div>
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ 
          marginBottom: '2rem',
          display: 'flex', 
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: 'bold', color: '#2c3e50' }}>
              Search Term:
            </label>
            <input
              type="text"
              placeholder={getSearchPlaceholder()}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              required
              style={{ 
                padding: '12px', 
                borderRadius: 6, 
                border: '1px solid #ccc', 
                fontSize: '1rem',
                backgroundColor: '#fff'
              }}
            />
          </div>
          
          <div style={{ 
            display: 'flex', 
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <button 
              type="submit" 
              disabled={loading}
              style={{ 
                padding: '12px 20px', 
                borderRadius: 6, 
                background: loading ? '#95a5a6' : '#3498db', 
                color: '#fff', 
                fontWeight: 'bold', 
                fontSize: '1rem', 
                border: 'none', 
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.3s ease',
                flex: 1,
                minWidth: '120px'
              }}
            >
              {loading ? '🔍 Searching...' : '🔍 Search Restaurants'}
            </button>
            
            {(restaurants.length > 0 || error) && (
              <button 
                type="button"
                onClick={clearResults}
                style={{ 
                  padding: '12px 20px', 
                  borderRadius: 6, 
                  background: '#95a5a6', 
                  color: '#fff', 
                  fontWeight: 'bold', 
                  fontSize: '1rem', 
                  border: 'none', 
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                  minWidth: '120px'
                }}
              >
                Clear Results
              </button>
            )}
          </div>
        </form>

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
            ❌ {error}
          </div>
        )}

        {success && (
          <div style={{ 
            textAlign: 'center', 
            color: '#27ae60', 
            padding: '1rem',
            background: '#d4edda',
            borderRadius: 8,
            border: '1px solid #c3e6cb',
            marginBottom: '1rem'
          }}>
            ✅ {success}
          </div>
        )}
        
        {showResults && restaurants.length > 0 && (
          <div style={{ 
            background: '#f8f9fa',
            borderRadius: 12,
            padding: '2rem',
            border: '1px solid #e9ecef'
          }}>
            <h3 style={{ 
              color: '#2c3e50', 
              fontSize: '1.5rem', 
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              🍽️ Found Restaurants
            </h3>
            
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '1.5rem'
            }}>
              {restaurants.map((restaurant, index) => (
                <div key={restaurant._id || index} style={{ 
                  background: '#fff',
                  borderRadius: 12,
                  padding: '1.5rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  border: '1px solid #e9ecef',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  cursor: 'pointer',
                  ':hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.15)'
                  }
                }}>
                  {/* Restaurant Header */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    marginBottom: '1rem'
                  }}>
                    <h4 style={{ 
                      color: '#2c3e50', 
                      fontSize: '1.3rem', 
                      fontWeight: 'bold',
                      margin: 0,
                      flex: 1
                    }}>
                      {restaurant.title}
                    </h4>
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      background: restaurant.isOpen ? '#d4edda' : '#f8d7da',
                      color: restaurant.isOpen ? '#155724' : '#721c24',
                      padding: '0.3rem 0.6rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}>
                      {restaurant.isOpen ? '🟢 Open' : '🔴 Closed'}
                    </div>
                  </div>

                  {/* Rating */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    <span style={{ color: '#555', fontWeight: 'bold' }}>Rating:</span>
                    <span style={{ color: '#f39c12', fontWeight: 'bold' }}>{restaurant.rating}/5</span>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[...Array(5)].map((_, i) => (
                        <span key={i} style={{ 
                          color: i < restaurant.rating ? '#f39c12' : '#ddd',
                          fontSize: '1.1rem'
                        }}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Address */}
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ 
                      color: '#555', 
                      fontSize: '0.95rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      📍 {restaurant.address}
                    </div>
                  </div>

                  {/* Operating Hours */}
                  <div style={{ 
                    background: '#f8f9fa',
                    padding: '0.8rem',
                    borderRadius: 6,
                    marginBottom: '1rem'
                  }}>
                    <div style={{ 
                      color: '#2c3e50', 
                      fontWeight: 'bold',
                      marginBottom: '0.3rem',
                      fontSize: '0.9rem'
                    }}>
                      🕐 Operating Hours
                    </div>
                    <div style={{ 
                      color: '#555', 
                      fontSize: '0.85rem',
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}>
                      <span>Open: {restaurant.opening_time}</span>
                      <span>Close: {restaurant.closing_time}</span>
                    </div>
                  </div>

                  {/* Services */}
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ 
                      color: '#2c3e50', 
                      fontWeight: 'bold',
                      marginBottom: '0.5rem',
                      fontSize: '0.9rem'
                    }}>
                      🚚 Services
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      gap: '0.5rem',
                      flexWrap: 'wrap'
                    }}>
                      <span style={{ 
                        padding: '0.2rem 0.6rem',
                        borderRadius: '15px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        background: restaurant.pickup ? '#d4edda' : '#f8d7da',
                        color: restaurant.pickup ? '#155724' : '#721c24'
                      }}>
                        {restaurant.pickup ? '✅ Pickup' : '❌ No Pickup'}
                      </span>
                      <span style={{ 
                        padding: '0.2rem 0.6rem',
                        borderRadius: '15px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        background: restaurant.delivery ? '#d4edda' : '#f8d7da',
                        color: restaurant.delivery ? '#155724' : '#721c24'
                      }}>
                        {restaurant.delivery ? '✅ Delivery' : '❌ No Delivery'}
                      </span>
                    </div>
                  </div>

                  {/* Menu Preview */}
                  <div>
                    <div style={{ 
                      color: '#2c3e50', 
                      fontWeight: 'bold',
                      marginBottom: '0.5rem',
                      fontSize: '0.9rem'
                    }}>
                      🍽️ Menu Items ({Array.isArray(restaurant.foods) ? restaurant.foods.length : 0})
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: '0.3rem'
                    }}>
                      {Array.isArray(restaurant.foods) && restaurant.foods.length > 0 ? (
                        restaurant.foods.slice(0, 3).map((food, index) => (
                          <span key={index} style={{ 
                            padding: '0.2rem 0.5rem',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            background: '#e3f2fd',
                            color: '#1565c0',
                            fontWeight: '500'
                          }}>
                            {food}
                          </span>
                        ))
                      ) : (
                        <span style={{ color: '#888', fontStyle: 'italic', fontSize: '0.8rem' }}>
                          No menu items available
                        </span>
                      )}
                      {Array.isArray(restaurant.foods) && restaurant.foods.length > 3 && (
                        <span style={{ 
                          color: '#666', 
                          fontSize: '0.75rem',
                          fontStyle: 'italic'
                        }}>
                          +{restaurant.foods.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {showResults && restaurants.length === 0 && !loading && (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem',
            background: '#f8f9fa',
            borderRadius: 12,
            border: '1px solid #e9ecef'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
            <div style={{ 
              color: '#2c3e50', 
              fontSize: '1.2rem', 
              fontWeight: 'bold',
              marginBottom: '0.5rem'
            }}>
              No restaurants found
            </div>
            <div style={{ color: '#666', fontSize: '1rem' }}>
              Try adjusting your search criteria or search for something else.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantSearch; 
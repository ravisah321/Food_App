import React from 'react'
import { Link } from 'react-router-dom'

const RestaurantPage = () => {
  const userRole = localStorage.getItem('userRole') || 'User';

  return (
    <div style={{ 
      padding: '2rem',
      maxWidth: 800,
      margin: '0 auto',
      background: '#fff',
      borderRadius: 12,
      boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
      marginTop: '2rem'
    }}>
      <h2 style={{ 
        textAlign: 'center', 
        margin: '0 0 2rem 0', 
        color: '#2c3e50',
        fontSize: '2rem',
        fontWeight: 'bold'
      }}>
        🍽️ Restaurant Management
      </h2>

      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem'
      }}>
        {/* Client Features */}
        <Link to="/restaurantSearch" style={{ 
          display: 'block',
          padding: '1.5rem',
          background: '#e3f2fd',
          color: '#1565c0',
          textDecoration: 'none',
          borderRadius: 8,
          textAlign: 'center',
          fontWeight: 'bold',
          border: '2px solid #bbdefb',
          transition: 'all 0.3s ease'
        }}>
          🔍 Search Restaurants
        </Link>

        <Link to="/getAllRestaurant" style={{ 
          display: 'block',
          padding: '1.5rem',
          background: '#fff3cd',
          color: '#856404',
          textDecoration: 'none',
          borderRadius: 8,
          textAlign: 'center',
          fontWeight: 'bold',
          border: '2px solid #ffeaa7',
          transition: 'all 0.3s ease'
        }}>
          📋 All Restaurants
        </Link>

        {/* Admin Features */}
        {userRole === 'admin' && (
          <>
            <Link to="/createRestaurant" style={{ 
              display: 'block',
              padding: '1.5rem',
              background: '#d4edda',
              color: '#155724',
              textDecoration: 'none',
              borderRadius: 8,
              textAlign: 'center',
              fontWeight: 'bold',
              border: '2px solid #c3e6cb',
              transition: 'all 0.3s ease'
            }}>
              ➕ Create Restaurant
            </Link>

            <Link to="/findRestaurantId" style={{ 
              display: 'block',
              padding: '1.5rem',
              background: '#f8d7da',
              color: '#721c24',
              textDecoration: 'none',
              borderRadius: 8,
              textAlign: 'center',
              fontWeight: 'bold',
              border: '2px solid #f5c6cb',
              transition: 'all 0.3s ease'
            }}>
              🔍 Find My Restaurant IDs
            </Link>

            <Link to="/updateRestaurant" style={{ 
              display: 'block',
              padding: '1.5rem',
              background: '#d1ecf1',
              color: '#0c5460',
              textDecoration: 'none',
              borderRadius: 8,
              textAlign: 'center',
              fontWeight: 'bold',
              border: '2px solid #bee5eb',
              transition: 'all 0.3s ease'
            }}>
              ✏️ Update Restaurant
            </Link>

            <Link to="/deleteRestaurant" style={{ 
              display: 'block',
              padding: '1.5rem',
              background: '#f8d7da',
              color: '#721c24',
              textDecoration: 'none',
              borderRadius: 8,
              textAlign: 'center',
              fontWeight: 'bold',
              border: '2px solid #f5c6cb',
              transition: 'all 0.3s ease'
            }}>
              🗑️ Delete Restaurant
            </Link>
          </>
        )}
      </div>

      {userRole !== 'admin' && (
        <div style={{ 
          marginTop: '2rem',
          padding: '1rem',
          background: '#fff3cd',
          borderRadius: 8,
          border: '1px solid #ffeaa7',
          textAlign: 'center'
        }}>
          <div style={{ color: '#856404', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            👤 Client Access
          </div>
          <div style={{ color: '#666', fontSize: '0.9rem' }}>
            You can search and view all restaurants. Admin features require admin privileges.
          </div>
        </div>
      )}
    </div>
  )
}

export default RestaurantPage

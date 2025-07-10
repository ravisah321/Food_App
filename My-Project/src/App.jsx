import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import RestaurantPage from './pages/RestaurantPage'

// Restaurant Management Pages
import CreateRestaurant from './pages/createRestaurant'
import GetAllRestaurantPage from './pages/getAllRestaurantPage'
import RestaurantSearch from './pages/RestaurantSearch'
import UpdateRestaurantPage from './pages/updateRestaurantPage'
import DeleteRestaurantPage from './pages/deleteRestaurantPage'
import FindRestaurantId from './pages/findRestaurantId'
import UpdateProfilePage from './pages/updateProfile';
// import UserProfilePage from './pages/userProfile';
import YourProfilePage from './pages/yourProfile';
import DeleteProfilePage from './pages/deleteProfile';
import UserProfile from './pages/userProfile';

import './App.css'

function App() {
  return (
    <>
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/restaurant" element={<RestaurantPage />} />
        
        {/* Restaurant Management Routes */}
        <Route path="/createRestaurant" element={<CreateRestaurant />} />
        <Route path="/getAllRestaurant" element={<GetAllRestaurantPage />} />
        <Route path="/restaurantSearch" element={<RestaurantSearch />} />
        <Route path="/findRestaurantId" element={<FindRestaurantId />} />
        <Route path="/updateRestaurant" element={<UpdateRestaurantPage />} />
        <Route path="/deleteRestaurant" element={<DeleteRestaurantPage />} />
        <Route path="/updateProfile" element={<UpdateProfilePage />} />
       
        <Route path="/yourProfile" element={<YourProfilePage />} /> 
        <Route path="/deleteProfile" element={<DeleteProfilePage/>} />
        <Route path="/userProfile" element={<UserProfile />} />
        
        
      </Routes>
    </>
  )
}

export default App
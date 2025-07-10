import React, { useState } from 'react'


import { useNavigate } from 'react-router-dom'

import './Login.css'

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [message, setMessage] = useState('')
  const navigate = useNavigate();
 
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:5000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!data.success) {
        setMessage(data.message || 'Login failed')
        return
      }
      setMessage(data.message || 'Logged in successfully!')
      
        if (data.token) {
        localStorage.setItem('token', data.token) // Store token in localStorage
      }

      

      
     
      if(data.user.userName) {
        
        localStorage.setItem('userName', data.user.userName) // Store username in local
      }

      if(data.user.userRole) {
        localStorage.setItem('userRole', data.user.userRole) // Store user role in localStorage
       
      }
      navigate('/') // Navigate to home page
    } catch (err) {
      setMessage('Login failed')
    }
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        /><br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        /><br />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  )
}

export default Login
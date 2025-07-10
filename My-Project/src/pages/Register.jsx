import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Register.css'



const Register = () => {
  const [form, setForm] = useState({
    userName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    answer: '',
    userRole: '',
  })
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:5000/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      setMessage(data.message || 'Registered successfully!')
    
      navigate('/login')
    } catch (err) {
      setMessage('Registration failed')
    }
  }

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="userName"
          placeholder="Username"
          value={form.userName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="answer"
          placeholder="Security Answer"
          value={form.answer}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="userRole"
          placeholder="userRole such as client, admin, vendor, driver"
          value={form.userRole}
          onChange={handleChange}
          required
        />
      
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  )
}

export default Register
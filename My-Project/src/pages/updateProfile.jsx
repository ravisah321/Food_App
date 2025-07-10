import React, { useState } from "react";

const UpdateProfile = () => {
  const [form, setForm] = useState({
    userName: "",
    password: "",
    address: "",
    phone: "",
    userRole: "",
    answer: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/v1/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Update failed");
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2>Update Profile</h2>
        <input
          style={styles.input}
          type="text"
          name="userName"
          placeholder="User Name"
          value={form.userName}
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="text"
          name="userRole"
          placeholder="User Role"
          value={form.userRole}
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="text"
          name="answer"
          placeholder="Security Answer"
          value={form.answer}
          onChange={handleChange}
          required
        />
        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}
      </form>
      <style>{`
        @media (max-width: 600px) {
          .update-profile-form {
            width: 95vw !important;
            padding: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f7f7f7",
  },
  form: {
    background: "#fff",
    padding: "2rem 3rem",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "400px",
    maxWidth: "95vw",
  },
  input: {
    padding: "0.75rem 1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    padding: "0.75rem 1rem",
    borderRadius: "5px",
    border: "none",
    background: "#007bff",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  error: {
    color: "#d32f2f",
    background: "#ffebee",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    marginTop: "0.5rem",
  },
  success: {
    color: "#388e3c",
    background: "#e8f5e9",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    marginTop: "0.5rem",
  },
};

export default UpdateProfile;

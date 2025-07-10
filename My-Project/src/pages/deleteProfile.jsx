import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DeleteProfile = () => {
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleDelete = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/v1/user/profile", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Delete failed");
      setSuccess("Account deleted. Redirecting...");
      setTimeout(() => {
        localStorage.removeItem("token");
        navigate("/register");
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🗑️ Delete Profile</h2>
        {!confirm ? (
          <>
            <div style={styles.info}>Are you sure you want to delete your account? This action cannot be undone.</div>
            <button style={styles.deleteBtn} onClick={() => setConfirm(true)}>
              Yes, Delete My Account
            </button>
          </>
        ) : (
          <>
            <div style={styles.info}>Please confirm you want to permanently delete your account.</div>
            <button style={styles.deleteBtn} onClick={handleDelete} disabled={loading}>
              {loading ? "Deleting..." : "Confirm Delete"}
            </button>
            <button style={styles.cancelBtn} onClick={() => setConfirm(false)} disabled={loading}>
              Cancel
            </button>
          </>
        )}
        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}
      </div>
      <style>{`
        @media (max-width: 600px) {
          .delete-profile-card {
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
  card: {
    background: "#fff",
    padding: "2rem 3rem",
    borderRadius: "12px",
    boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
    width: "400px",
    maxWidth: "95vw",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    margin: "0 0 1.5rem 0",
    color: "#d32f2f",
    fontSize: "2rem",
    fontWeight: "bold",
  },
  info: {
    fontSize: "1.1rem",
    marginBottom: "0.5rem",
    color: "#721c24",
    textAlign: "center",
  },
  deleteBtn: {
    padding: "0.75rem 1.5rem",
    borderRadius: "5px",
    border: "none",
    background: "#d32f2f",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1rem",
    cursor: "pointer",
    marginBottom: "0.5rem",
    transition: "background 0.2s",
  },
  cancelBtn: {
    padding: "0.75rem 1.5rem",
    borderRadius: "5px",
    border: "none",
    background: "#bbb",
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

export default DeleteProfile;

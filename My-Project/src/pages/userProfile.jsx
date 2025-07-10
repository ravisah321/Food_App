import React from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>👤 User Profile Dashboard</h2>
        <div style={styles.grid}>
          <button style={{ ...styles.action, ...styles.show }} onClick={() => navigate("/yourProfile")}> 
            👁️ Show Profile
          </button>
          <button style={{ ...styles.action, ...styles.update }} onClick={() => navigate("/updateProfile")}> 
            ✏️ Update Profile
          </button>
          <button style={{ ...styles.action, ...styles.delete }} onClick={() => navigate("/deleteProfile")}> 
            🗑️ Delete Profile
          </button>
        </div>
        <div style={styles.infoBox}>
          <div style={styles.info}>Use the buttons above to view, update, or delete your profile.</div>
        </div>
      </div>
      <style>{`
        @media (max-width: 600px) {
          .user-profile-card {
            width: 95vw !important;
            padding: 1rem !important;
          }
          .user-profile-grid {
            grid-template-columns: 1fr !important;
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
    color: "#2c3e50",
    fontSize: "2rem",
    fontWeight: "bold",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "1rem",
    width: "100%",
    marginBottom: "1.5rem",
  },
  action: {
    display: "block",
    padding: "1.2rem 0.5rem",
    borderRadius: 8,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "1.1rem",
    border: "2px solid #e0e0e0",
    textDecoration: "none",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  show: {
    background: "#e3f2fd",
    color: "#1565c0",
    border: "2px solid #bbdefb",
  },
  update: {
    background: "#d4edda",
    color: "#155724",
    border: "2px solid #c3e6cb",
  },
  delete: {
    background: "#f8d7da",
    color: "#721c24",
    border: "2px solid #f5c6cb",
  },
  infoBox: {
    width: "100%",
    background: "#f7fafc",
    borderRadius: 8,
    padding: "1rem",
    marginTop: "1rem",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  },
  info: {
    fontSize: "1.1rem",
    marginBottom: "0.5rem",
    textAlign: "center",
  },
};

export default UserProfile;

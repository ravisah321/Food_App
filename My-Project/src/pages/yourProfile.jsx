import React, { useEffect, useState } from "react";

const YourProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found. Please log in.");
        const res = await fetch("http://localhost:5000/api/v1/user/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        let data;
        try {
          data = await res.json();
        } catch {
          throw new Error("Server returned an invalid response.");
        }
        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch user");
        }
        setUser(data.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card} className="your-profile-card">
        <h2 style={styles.title}>👤 Your Profile</h2>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div style={styles.error}>{error}</div>
        ) : user ? (
          <div style={styles.infoBox}>
            <div style={styles.info}><b>Name:</b> {user.userName || "N/A"}</div>
            <div style={styles.info}><b>Email:</b> {user.email || "N/A"}</div>
            <div style={styles.info}><b>Phone:</b> {user.phone || "N/A"}</div>
            <div style={styles.info}><b>Role:</b> {user.userRole || "N/A"}</div>
            <div style={styles.info}>
              <b>Address:</b> {user.address ? (Array.isArray(user.address) ? user.address.join(", ") : user.address) : "N/A"}
            </div>
          </div>
        ) : (
          <div>No user data found.</div>
        )}
      </div>
      <style>{`
        @media (max-width: 600px) {
          .your-profile-card {
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
    gap: "1rem",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    margin: "0 0 1.5rem 0",
    color: "#2c3e50",
    fontSize: "2rem",
    fontWeight: "bold",
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
  },
  error: {
    color: "#d32f2f",
    background: "#ffebee",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    marginTop: "0.5rem",
  },
};

export default YourProfile;

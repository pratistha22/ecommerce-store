import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function CustomerLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("https://ecommerce-backend-iwho.onrender.com/api/customers/login", {
        email, password,
      });
      onLogin(res.data.token, res.data.customer);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  }

  return (
    <div style={{ padding: "32px", maxWidth: "400px", margin: "0 auto" }}>
      <h1 style={{ color: "#e75480" }}>Log In</h1>
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: "block", width: "100%", padding: "10px", marginBottom: "12px", borderRadius: "6px", border: "1px solid #ddd" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: "block", width: "100%", padding: "10px", marginBottom: "12px", borderRadius: "6px", border: "1px solid #ddd" }}
        />
        {error && <p style={{ color: "red", fontSize: "13px", marginBottom: "12px" }}>{error}</p>}
        <button
          type="submit"
          style={{
            backgroundColor: "#e75480",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "6px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Log In
        </button>
      </form>
      <p style={{ marginTop: "16px", fontSize: "14px" }}>
        Don't have an account? <Link to="/customer-signup" style={{ color: "#e75480" }}>Sign up</Link>
      </p>
    </div>
  );
}

export default CustomerLogin;
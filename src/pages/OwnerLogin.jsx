import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function OwnerLogin({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.post("https://ecommerce-backend-iwho.onrender.com/api/login", { password });
      if (res.data.success) {
        onLogin(res.data.token);
        navigate("/orders");
      }
    } catch (err) {
      setError("Incorrect password.");
    }
  }

  return (
    <div style={{ padding: "32px", maxWidth: "400px", margin: "0 auto" }}>
      <h1 style={{ color: "#e75480" }}>Owner Login</h1>
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            display: "block",
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            borderRadius: "6px",
            border: "1px solid #ddd",
          }}
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
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default OwnerLogin;
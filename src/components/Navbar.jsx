import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px 20px",
flexWrap: "wrap",
      backgroundColor: "#1f3864",
      color: "white",
    }}>
      <h2 style={{ margin: 0 }}>MyStore</h2>
      <div style={{ display: "flex", gap: "24px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
        <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>Cart</Link>
      </div>
    </nav>
  );
}

export default Navbar;
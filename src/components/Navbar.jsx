import { Link } from "react-router-dom";

function Navbar({ cartCount }) {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px 20px",
flexWrap: "wrap",
      backgroundColor: "#e75480",
      color: "white",
    }}>
      <h2 style={{ margin: 0 }}>MyStore</h2>
      <div style={{ display: "flex", gap: "24px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
        <Link to="/cart" style={{ color: "white", textDecoration: "none", position: "relative" }}>
  Cart
  {cartCount > 0 && (
    <span style={{
      position: "absolute",
      top: "-10px",
      right: "-14px",
      backgroundColor: "#e53e3e",
      color: "white",
      borderRadius: "50%",
      width: "18px",
      height: "18px",
      fontSize: "11px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      {cartCount}
    </span>
  )}
</Link>
      </div>
    </nav>
  );
}

export default Navbar;
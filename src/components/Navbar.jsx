import { Link } from "react-router-dom";

function Navbar({ cartCount, isOwnerLoggedIn, customer, onCustomerLogout }) {
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
        <Link to="/wishlist" style={{ color: "white", textDecoration: "none" }}>Wishlist</Link>
        {isOwnerLoggedIn ? (
  <Link to="/orders" style={{ color: "white", textDecoration: "none" }}>Orders</Link>
) : (
  <Link to="/owner-login" style={{ color: "white", textDecoration: "none", fontSize: "12px", opacity: 0.7 }}>Owner Login</Link>
)}
{customer ? (
  <span style={{ color: "white", fontSize: "14px", display: "flex", alignItems: "center", gap: "10px" }}>
    <Link to="/my-orders" style={{ color: "white", textDecoration: "none" }}>My Orders</Link>
    Hi, {customer.name}
    <button
      onClick={onCustomerLogout}
      style={{
        background: "transparent",
        border: "1px solid white",
        color: "white",
        padding: "4px 10px",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "12px",
      }}
    >
      Logout
    </button>
  </span>
) : (
  <Link to="/customer-login" style={{ color: "white", textDecoration: "none" }}>Login</Link>
)}
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
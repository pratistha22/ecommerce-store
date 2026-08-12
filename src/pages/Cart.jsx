import { Link } from "react-router-dom";
function Cart({ cartItems, onRemove, onUpdateQuantity }) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: "32px", maxWidth: "1100px", margin: "0 auto" }}>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #eee",
              padding: "12px 0",
              maxWidth: "500px",
              gap: "16px",
            }}>
              <span style={{ flex: 1 }}>{item.name}</span>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  style={{ padding: "2px 8px", cursor: "pointer" }}
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  style={{ padding: "2px 8px", cursor: "pointer" }}
                >
                  +
                </button>
              </div>

              <span>Rs. {item.price * item.quantity}</span>

              <button
                onClick={() => onRemove(item.id)}
                style={{
                  backgroundColor: "#e53e3e",
                  color: "white",
                  border: "none",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                Remove
              </button>
            </div>
          ))}
          <h3 style={{ marginTop: "20px" }}>Total: Rs. {total}</h3>
          <Link to="/checkout">
  <button style={{
    marginTop: "16px",
    backgroundColor: "#e75480",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "15px",
  }}>
    Proceed to Checkout
  </button>
</Link>
        </>
      )}
    </div>
  );
}

export default Cart;
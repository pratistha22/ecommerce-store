function Cart({ cartItems }) {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: "32px" }}>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div key={index} style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid #eee",
              padding: "12px 0",
              maxWidth: "400px",
            }}>
              <span>{item.name}</span>
              <span>Rs. {item.price}</span>
            </div>
          ))}
          <h3 style={{ marginTop: "20px" }}>Total: Rs. {total}</h3>
        </>
      )}
    </div>
  );
}

export default Cart;
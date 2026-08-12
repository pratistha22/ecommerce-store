import { useState, useEffect } from "react";

function Orders({ onLogout }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <div style={{ padding: "32px", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  <h1 style={{ color: "#e75480" }}>Orders</h1>
  <button
    onClick={onLogout}
    style={{
      backgroundColor: "transparent",
      color: "#e75480",
      border: "1px solid #e75480",
      padding: "8px 16px",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "14px",
    }}
  >
    Logout
  </button>
</div>
      {orders.length === 0 ? (
        <p style={{ marginTop: "12px" }}>No orders yet.</p>
      ) : (
        orders.slice().reverse().map((order) => (
          <div key={order.id} style={{
            border: "1px solid #eee",
            borderRadius: "10px",
            padding: "16px",
            marginTop: "16px",
          }}>
            <p style={{ fontWeight: "bold" }}>{order.name} — Rs. {order.total}</p>
            <p style={{ fontSize: "13px", color: "#777" }}>{order.date}</p>
            <p style={{ fontSize: "13px", color: "#555" }}>{order.address} · {order.phone}</p>
            <div style={{ marginTop: "8px" }}>
              {order.items.map((item, i) => (
                <p key={i} style={{ fontSize: "14px" }}>
                  {item.name} × {item.quantity} — Rs. {item.price * item.quantity}
                </p>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
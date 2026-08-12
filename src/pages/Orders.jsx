import { useState, useEffect } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <div style={{ padding: "32px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ color: "#e75480" }}>Orders</h1>
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
import { useState, useEffect } from "react";
import axios from "axios";

const statusColors = {
  Pending: "#f0ad4e",
  Shipped: "#3b82f6",
  Delivered: "#2e7d32",
};

function MyOrders({ customer }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!customer) return;
    axios.get(`https://ecommerce-backend-iwho.onrender.com/api/orders/customer/${customer.email}`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Failed to fetch your orders:", err));
  }, [customer]);

  if (!customer) {
    return (
      <div style={{ padding: "32px", textAlign: "center" }}>
        <p>Please log in to see your orders.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "32px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ color: "#e75480" }}>My Orders</h1>
      {orders.length === 0 ? (
        <p style={{ marginTop: "12px" }}>You haven't placed any orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} style={{
            border: "1px solid #eee",
            borderRadius: "10px",
            padding: "16px",
            marginTop: "16px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p style={{ fontWeight: "bold" }}>Rs. {order.total}</p>
              <span style={{
                backgroundColor: statusColors[order.status] || "#999",
                color: "white",
                fontSize: "12px",
                fontWeight: "bold",
                padding: "4px 10px",
                borderRadius: "12px",
              }}>
                {order.status || "Pending"}
              </span>
            </div>
            <p style={{ fontSize: "13px", color: "#777" }}>{order.date}</p>
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

export default MyOrders;
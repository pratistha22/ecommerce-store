import { useState, useEffect } from "react";
import axios from "axios";

const statusColors = {
  Pending: "#f0ad4e",
  Shipped: "#3b82f6",
  Delivered: "#2e7d32",
};

function Orders({ onLogout }) {
  const [orders, setOrders] = useState([]);

 useEffect(() => {
    axios.get("https://ecommerce-backend-iwho.onrender.com/api/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Failed to fetch orders:", err));
  }, []);

  function updateStatus(orderId, newStatus) {
    axios.patch(`https://ecommerce-backend-iwho.onrender.com/api/orders/${orderId}`, { status: newStatus })
      .then(() => {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      })
      .catch((err) => console.error("Failed to update status:", err));
  }

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
          <div key={order._id} style={{
            border: "1px solid #eee",
            borderRadius: "10px",
            padding: "16px",
            marginTop: "16px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p style={{ fontWeight: "bold" }}>{order.name} — Rs. {order.total}</p>
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
            <p style={{ fontSize: "13px", color: "#555" }}>{order.address} · {order.phone}</p>
            <div style={{ marginTop: "8px" }}>
              {order.items.map((item, i) => (
                <p key={i} style={{ fontSize: "14px" }}>
                  {item.name} × {item.quantity} — Rs. {item.price * item.quantity}
                </p>
              ))}
            </div>
            <div style={{ marginTop: "12px" }}>
              <select
                value={order.status || "Pending"}
                onChange={(e) => updateStatus(order._id, e.target.value)}
                style={{
                  padding: "6px 10px",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                  fontSize: "13px",
                }}
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
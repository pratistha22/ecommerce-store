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

  function getStats(orders) {
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const totalOrders = orders.length;

    const productCounts = {};
    orders.forEach((order) => {
      order.items.forEach((item) => {
        productCounts[item.name] = (productCounts[item.name] || 0) + item.quantity;
      });
    });

    let bestSeller = "N/A";
    let maxCount = 0;
    for (const [name, count] of Object.entries(productCounts)) {
      if (count > maxCount) {
        maxCount = count;
        bestSeller = name;
      }
    }

    return { totalRevenue, totalOrders, bestSeller };
  }
  function deleteOrder(orderId) {
    if (!window.confirm("Delete this order?")) return;

    axios.delete(`https://ecommerce-backend-iwho.onrender.com/api/orders/${orderId}`)
      .then(() => {
        setOrders((prev) => prev.filter((order) => order._id !== orderId));
      })
      .catch((err) => console.error("Failed to delete order:", err));
  }
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
      <div style={{
  display: "flex",
  gap: "16px",
  marginTop: "16px",
  marginBottom: "8px",
  flexWrap: "wrap",
}}>
  {(() => {
    const stats = getStats(orders);
    return (
      <>
        <div style={{ backgroundColor: "#fff0f5", padding: "16px", borderRadius: "10px", flex: 1, minWidth: "150px" }}>
          <p style={{ fontSize: "13px", color: "#777" }}>Total Revenue</p>
          <p style={{ fontSize: "20px", fontWeight: "bold", color: "#e75480" }}>Rs. {stats.totalRevenue}</p>
        </div>
        <div style={{ backgroundColor: "#fff0f5", padding: "16px", borderRadius: "10px", flex: 1, minWidth: "150px" }}>
          <p style={{ fontSize: "13px", color: "#777" }}>Total Orders</p>
          <p style={{ fontSize: "20px", fontWeight: "bold", color: "#e75480" }}>{stats.totalOrders}</p>
        </div>
        <div style={{ backgroundColor: "#fff0f5", padding: "16px", borderRadius: "10px", flex: 1, minWidth: "150px" }}>
          <p style={{ fontSize: "13px", color: "#777" }}>Best Seller</p>
          <p style={{ fontSize: "16px", fontWeight: "bold", color: "#e75480" }}>{stats.bestSeller}</p>
        </div>
      </>
    );
  })()}
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
              <button
  onClick={() => deleteOrder(order._id)}
  style={{
    marginLeft: "10px",
    backgroundColor: "#e53e3e",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
  }}
>
  Delete
</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
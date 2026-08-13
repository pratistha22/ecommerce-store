import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Checkout({ cartItems, onOrderComplete }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

 async function handlePlaceOrder(e) {
    e.preventDefault();

    const newOrder = {
      name,
      address,
      phone,
      items: cartItems,
      total,
      date: new Date().toLocaleString(),
      status: "Pending",
    };

    try {
      await axios.post("https://ecommerce-backend-iwho.onrender.com/api/orders", newOrder);
      setOrderPlaced(true);
      onOrderComplete();
    } catch (err) {
      console.error("Failed to place order:", err);
      alert("Something went wrong placing your order. Please try again.");
    }
  }

  if (orderPlaced) {
    return (
      <div style={{ padding: "32px", textAlign: "center" }}>
        <h1 style={{ color: "#e75480" }}>🎉 Order Placed!</h1>
        <p style={{ marginTop: "12px" }}>Thank you, {name}! Your order is on its way.</p>
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "20px",
            backgroundColor: "#e75480",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "32px", maxWidth: "500px", margin: "0 auto" }}>
      <h1 style={{ color: "#e75480" }}>Checkout</h1>
      <p style={{ marginBottom: "20px" }}>Total: Rs. {total}</p>

      <form onSubmit={handlePlaceOrder}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ display: "block", width: "100%", padding: "10px", marginBottom: "12px", borderRadius: "6px", border: "1px solid #ddd" }}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          style={{ display: "block", width: "100%", padding: "10px", marginBottom: "12px", borderRadius: "6px", border: "1px solid #ddd" }}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          style={{ display: "block", width: "100%", padding: "10px", marginBottom: "20px", borderRadius: "6px", border: "1px solid #ddd" }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#e75480",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;
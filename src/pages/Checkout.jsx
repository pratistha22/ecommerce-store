import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Checkout({ cartItems, onOrderComplete }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  async function handlePlaceOrder(e) {
    e.preventDefault();

    const transactionId = "txn_" + Date.now();

    const pendingOrder = {
      name,
      address,
      phone,
      items: cartItems,
      total,
      date: new Date().toLocaleString(),
      status: "Pending",
    };
    localStorage.setItem("pendingOrder", JSON.stringify(pendingOrder));

    try {
      const res = await axios.post("https://ecommerce-backend-iwho.onrender.com/api/esewa/initiate", {
        amount: total,
        transactionId,
      });

      const paymentData = res.data;

      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

      Object.keys(paymentData).forEach((key) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = paymentData[key];
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error("Failed to initiate payment:", err);
      alert("Something went wrong starting payment. Please try again.");
    }
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
          Pay with eSewa
        </button>
      </form>
    </div>
  );
}

export default Checkout;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Checkout({ cartItems, onOrderComplete, customer }) {
  const [name, setName] = useState(customer?.name || "");
  const [address, setAddress] = useState(customer?.address || "");
  const [phone, setPhone] = useState(customer?.phone || "");
    const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discountedTotal = total - (total * discount) / 100;

  async function handleApplyCoupon() {
    try {
      const res = await axios.get(`https://ecommerce-backend-iwho.onrender.com/api/coupons/validate/${couponCode}`);
      setDiscount(res.data.discountPercent);
      setCouponMessage(`Coupon applied! ${res.data.discountPercent}% off`);
    } catch (err) {
      setDiscount(0);
      setCouponMessage("Invalid coupon code");
    }
  }

  async function handlePlaceOrder(e) {
    e.preventDefault();

    const transactionId = "txn_" + Date.now();

    const pendingOrder = {
      name,
      address,
      phone,
      items: cartItems,
      total: discountedTotal,
      date: new Date().toLocaleString(),
      status: "Pending",
      customerEmail: customer?.email || null,
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

      <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
        <input
          type="text"
          placeholder="Coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "1px solid #ddd" }}
        />
        <button
          type="button"
          onClick={handleApplyCoupon}
          style={{
            backgroundColor: "#1f3864",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Apply
        </button>
      </div>
      {couponMessage && <p style={{ fontSize: "13px", color: discount > 0 ? "#2e7d32" : "red", marginBottom: "12px" }}>{couponMessage}</p>}

      <p style={{ marginBottom: "20px" }}>
        {discount > 0 && <span style={{ textDecoration: "line-through", color: "#999", marginRight: "8px" }}>Rs. {total}</span>}
        Total: Rs. {discountedTotal}
      </p>

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
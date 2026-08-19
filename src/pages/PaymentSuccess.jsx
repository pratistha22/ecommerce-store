import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PaymentSuccess({ onOrderComplete }) {
  const [status, setStatus] = useState("Processing your order...");
  const navigate = useNavigate();

  useEffect(() => {
    async function saveOrder() {
      const pendingOrder = JSON.parse(localStorage.getItem("pendingOrder"));

      if (!pendingOrder) {
        setStatus("No order found.");
        return;
      }

      try {
        await axios.post("https://ecommerce-backend-iwho.onrender.com/api/orders", pendingOrder);
        localStorage.removeItem("pendingOrder");
        onOrderComplete();
        setStatus("done");
      } catch (err) {
        console.error("Failed to save order:", err);
        setStatus("Payment succeeded, but saving your order failed. Please contact us.");
      }
    }

    saveOrder();
  }, []);

  if (status === "done") {
    return (
      <div style={{ padding: "32px", textAlign: "center" }}>
        <h1 style={{ color: "#e75480" }}>🎉 Payment Successful!</h1>
        <p style={{ marginTop: "12px" }}>Your order has been placed. Thank you!</p>
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
    <div style={{ padding: "32px", textAlign: "center" }}>
      <p>{status}</p>
    </div>
  );
}

export default PaymentSuccess;
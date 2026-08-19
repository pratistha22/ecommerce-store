import { Link } from "react-router-dom";

function PaymentFailure() {
  return (
    <div style={{ padding: "32px", textAlign: "center" }}>
      <h1 style={{ color: "#e53e3e" }}>Payment Failed</h1>
      <p style={{ marginTop: "12px" }}>Something went wrong with your payment. Please try again.</p>
      <Link to="/cart" style={{
        display: "inline-block",
        marginTop: "20px",
        backgroundColor: "#e75480",
        color: "white",
        padding: "10px 20px",
        borderRadius: "6px",
        textDecoration: "none",
      }}>
        Back to Cart
      </Link>
    </div>
  );
}

export default PaymentFailure;
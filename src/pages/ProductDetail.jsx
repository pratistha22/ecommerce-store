import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import products from "../data/products";

function ProductDetail({ onAddToCart, customer }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  useEffect(() => {
    axios.get(`https://ecommerce-backend-iwho.onrender.com/api/reviews/${id}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Failed to fetch reviews:", err));
  }, [id]);

  async function handleSubmitReview(e) {
    e.preventDefault();
    try {
      const newReview = {
        productId: Number(id),
        customerName: customer.name,
        customerEmail: customer.email,
        rating,
        comment,
      };
      const res = await axios.post("https://ecommerce-backend-iwho.onrender.com/api/reviews", newReview);
      setReviews([res.data, ...reviews]);
      setComment("");
      setRating(5);
    } catch (err) {
      console.error("Failed to submit review:", err);
    }
  }

  if (!product) {
    return (
      <div style={{ padding: "32px" }}>
        <p>Product not found.</p>
        <Link to="/">Back to shop</Link>
      </div>
    );
  }

  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 3);
  const whatsappMessage = "Hi! I'd like to order: " + product.name + " (Rs. " + product.price + ")";
  const whatsappUrl = "https://wa.me/9779811073733?text=" + encodeURIComponent(whatsappMessage);

  return (
    <div style={{ padding: "32px", maxWidth: "900px", margin: "0 auto" }}>
      <Link to="/" style={{ color: "#e75480" }}>← Back to shop</Link>
      <div style={{ display: "flex", gap: "40px", marginTop: "20px", flexWrap: "wrap" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "350px", borderRadius: "12px" }}
        />
        <div>
          <h1>{product.name}</h1>
          <p style={{ fontSize: "20px", color: "#555", margin: "12px 0" }}>Rs. {product.price}</p>
          <p style={{ color: "#666", maxWidth: "400px" }}>{product.description}</p>
          <button
            onClick={() => onAddToCart(product)}
            style={{
              marginTop: "20px",
              backgroundColor: "#e75480",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            Add to Cart
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              marginTop: "12px",
              marginLeft: "12px",
              backgroundColor: "#25D366",
              color: "white",
              padding: "12px 24px",
              borderRadius: "6px",
              textDecoration: "none",
              fontSize: "15px",
            }}
          >
            Order via WhatsApp
          </a>
        </div>
      </div>

      <div style={{ marginTop: "48px", maxWidth: "500px" }}>
        <h2 style={{ color: "#e75480", fontSize: "20px", marginBottom: "16px" }}>Reviews</h2>

        {customer ? (
          <form onSubmit={handleSubmitReview} style={{ marginBottom: "24px" }}>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ddd", marginBottom: "10px" }}
            >
              <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
              <option value={4}>⭐⭐⭐⭐ (4)</option>
              <option value={3}>⭐⭐⭐ (3)</option>
              <option value={2}>⭐⭐ (2)</option>
              <option value={1}>⭐ (1)</option>
            </select>
            <textarea
              placeholder="Write your review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              style={{ display: "block", width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ddd", marginBottom: "10px", minHeight: "60px" }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: "#e75480",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Submit Review
            </button>
          </form>
        ) : (
          <p style={{ fontSize: "14px", color: "#777", marginBottom: "16px" }}>
            <Link to="/customer-login" style={{ color: "#e75480" }}>Log in</Link> to leave a review.
          </p>
        )}

        {reviews.length === 0 ? (
          <p style={{ color: "#777" }}>No reviews yet — be the first!</p>
        ) : (
          reviews.map((r) => (
            <div key={r._id} style={{ borderBottom: "1px solid #eee", padding: "12px 0" }}>
              <p style={{ fontWeight: "bold", fontSize: "14px" }}>{r.customerName} — {"⭐".repeat(r.rating)}</p>
              <p style={{ fontSize: "14px", color: "#555" }}>{r.comment}</p>
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: "48px" }}>
        <h2 style={{ color: "#e75480", fontSize: "20px", marginBottom: "16px" }}>You might also like</h2>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {relatedProducts.map((p) => (
            <Link key={p.id} to={`/product/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div style={{ width: "180px" }}>
                <img src={p.image} alt={p.name} style={{ width: "100%", borderRadius: "8px" }} />
                <p style={{ fontSize: "14px", marginTop: "8px" }}>{p.name}</p>
                <p style={{ fontSize: "13px", color: "#777" }}>Rs. {p.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
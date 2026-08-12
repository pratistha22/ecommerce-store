import { useState } from "react";
import { Link } from "react-router-dom";
function ProductCard({ product, onAddToCart, onToggleWishlist, isWishlisted }) {
  const tagColors = {
  New: "#4caf50",
  Sale: "#e53e3e",
  Trending: "#e75480",
};
  const [added, setAdded] = useState(false);

  function handleClick() {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }
  return (
    <div style={{
  border: "1px solid #eee",
  borderRadius: "12px",
  padding: "16px",
  width: "220px",
  textAlign: "center",
  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  transition: "transform 0.15s ease, box-shadow 0.15s ease",
}}
onMouseEnter={(e) => {
  e.currentTarget.style.transform = "translateY(-4px)";
  e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.12)";
}}
onMouseLeave={(e) => {
  e.currentTarget.style.transform = "translateY(0)";
  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
}}
>
      <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
  <div style={{ position: "relative" }}>
    <img src={product.image} alt={product.name} style={{ width: "100%", borderRadius: "6px" }} />
    {product.tag && (
      <span style={{
        position: "absolute",
        top: "8px",
        left: "8px",
        backgroundColor: tagColors[product.tag] || "#e75480",
        color: "white",
        fontSize: "11px",
        fontWeight: "bold",
        padding: "3px 8px",
        borderRadius: "4px",
      }}>
        {product.tag}
      </span>
    )}
  </div>
  <h3 style={{ fontSize: "16px", margin: "12px 0 4px" }}>{product.name}</h3>
</Link>
      <p style={{ color: "#555", fontSize: "14px" }}>Rs. {product.price}</p>
      <button
  onClick={() => onToggleWishlist(product)}
  style={{
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    marginBottom: "8px",
  }}
>
  {isWishlisted ? "❤️" : "🤍"}
</button>
      <button
  onClick={handleClick}
  style={{
    backgroundColor: added ? "#2e7d32" : "#e75480",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "transform 0.1s ease, background-color 0.15s ease",
  }}
  onMouseEnter={(e) => {
    if (!added) e.currentTarget.style.transform = "scale(1.05)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
  }}
  onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.95)"; }}
  onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
>
  {added ? "✓ Added!" : "Add to Cart"}
</button>
    </div>
  );
}

export default ProductCard;
function ProductCard({ product, onAddToCart }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "16px",
      width: "220px",
      textAlign: "center",
    }}>
      <img src={product.image} alt={product.name} style={{ width: "100%", borderRadius: "6px" }} />
      <h3 style={{ fontSize: "16px", margin: "12px 0 4px" }}>{product.name}</h3>
      <p style={{ color: "#555", fontSize: "14px" }}>Rs. {product.price}</p>
      <button
        onClick={() => onAddToCart(product)}
        style={{
          backgroundColor: "#1f3864",
          color: "white",
          border: "none",
          padding: "8px 16px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
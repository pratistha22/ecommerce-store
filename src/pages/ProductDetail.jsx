import { useParams, Link } from "react-router-dom";
import products from "../data/products";

function ProductDetail({ onAddToCart }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div style={{ padding: "32px" }}>
        <p>Product not found.</p>
        <Link to="/">Back to shop</Link>
      </div>
    );
  }

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
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
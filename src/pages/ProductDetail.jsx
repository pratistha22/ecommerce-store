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
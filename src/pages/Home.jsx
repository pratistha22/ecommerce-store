import { useState } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

function Home({ onAddToCart }) {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "32px", maxWidth: "1100px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "36px", color: "#1f3864", marginBottom: "8px" }}>Our Products</h1>
      <p style={{ color: "#666", marginBottom: "24px" }}>Fresh styles, straight to your cart.</p>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px 14px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          width: "100%",
          maxWidth: "320px",
          marginBottom: "24px",
          fontSize: "14px",
        }}
      />
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "20px",
        marginTop: "20px",
      }}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
}

export default Home;
import { useState } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

function Home({ onAddToCart, wishlist, onToggleWishlist }) {
  const [search, setSearch] = useState("");
const [activeTag, setActiveTag] = useState("All");
const [activeCategory, setActiveCategory] = useState("All");
const [sortOrder, setSortOrder] = useState("none");

  const tags = ["All", ...new Set(products.map((p) => p.tag).filter(Boolean))];
  const categories = ["All", ...new Set(products.map((p) => p.category).filter(Boolean))];

let filteredProducts = products.filter((p) =>
  p.name.toLowerCase().includes(search.toLowerCase())
);

if (activeTag !== "All") {
  filteredProducts = filteredProducts.filter((p) => p.tag === activeTag);
}
if (activeCategory !== "All") {
  filteredProducts = filteredProducts.filter((p) => p.category === activeCategory);
}

if (sortOrder === "low-high") {
  filteredProducts = filteredProducts.slice().sort((a, b) => a.price - b.price);
} else if (sortOrder === "high-low") {
  filteredProducts = filteredProducts.slice().sort((a, b) => b.price - a.price);
}

  return (
    <div style={{ padding: "32px", maxWidth: "1100px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "36px", color: "#e75480", marginBottom: "8px" }}>Our Products</h1>
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
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "12px" }}>
  {categories.map((cat) => (
    <button
      key={cat}
      onClick={() => setActiveCategory(cat)}
      style={{
        padding: "6px 14px",
        borderRadius: "20px",
        border: activeCategory === cat ? "1px solid #1f3864" : "1px solid #ddd",
        backgroundColor: activeCategory === cat ? "#1f3864" : "white",
        color: activeCategory === cat ? "white" : "#333",
        cursor: "pointer",
        fontSize: "13px",
      }}
    >
      {cat}
    </button>
  ))}
</div>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center", marginBottom: "24px" }}>
  {tags.map((tag) => (
    <button
      key={tag}
      onClick={() => setActiveTag(tag)}
      style={{
        padding: "6px 14px",
        borderRadius: "20px",
        border: activeTag === tag ? "1px solid #e75480" : "1px solid #ddd",
        backgroundColor: activeTag === tag ? "#e75480" : "white",
        color: activeTag === tag ? "white" : "#333",
        cursor: "pointer",
        fontSize: "13px",
      }}
    >
      {tag}
    </button>
  ))}

  <select
    value={sortOrder}
    onChange={(e) => setSortOrder(e.target.value)}
    style={{
      padding: "7px 10px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      fontSize: "13px",
      marginLeft: "auto",
    }}
  >
    <option value="none">Sort by</option>
    <option value="low-high">Price: Low to High</option>
    <option value="high-low">Price: High to Low</option>
  </select>
</div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "20px",
        marginTop: "20px",
      }}>
        {filteredProducts.map((product) => (
  <ProductCard
    key={product.id}
    product={product}
    onAddToCart={onAddToCart}
    onToggleWishlist={onToggleWishlist}
    isWishlisted={wishlist.some((item) => item.id === product.id)}
  />
))}
      </div>
    </div>
  );
}

export default Home;
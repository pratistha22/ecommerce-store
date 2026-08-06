import products from "../data/products";
import ProductCard from "../components/ProductCard";

function Home({ onAddToCart }) {
  return (
    <div style={{ padding: "32px", maxWidth: "1100px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "36px", color: "#1f3864", marginBottom: "8px" }}>Our Products</h1>
<p style={{ color: "#666", marginBottom: "24px" }}>Fresh styles, straight to your cart.</p>
     <div style={{
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: "20px",
  marginTop: "20px",
}}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
}

export default Home;
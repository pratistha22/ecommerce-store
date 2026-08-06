import products from "../data/products";
import ProductCard from "../components/ProductCard";

function Home({ onAddToCart }) {
  return (
    <div style={{ padding: "32px" }}>
      <h1>Our Products</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
}

export default Home;
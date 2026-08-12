import ProductCard from "../components/ProductCard";

function Wishlist({ wishlist, onAddToCart, onToggleWishlist }) {
  return (
    <div style={{ padding: "32px", maxWidth: "1100px", margin: "0 auto" }}>
      <h1 style={{ color: "#e75480" }}>Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p style={{ marginTop: "12px" }}>No favorites yet — tap the heart on any product to save it here.</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}>
          {wishlist.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
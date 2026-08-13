import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Footer from "./components/Footer";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";
import OwnerLogin from "./pages/OwnerLogin";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState("");
  const [isOwnerLoggedIn, setIsOwnerLoggedIn] = useState(
  !!sessionStorage.getItem("ownerToken")
);

 function handleAddToCart(product) {
  setCartItems((prev) => {
    const existing = prev.find((item) => item.id === product.id);
    if (existing) {
      return prev.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    }
    return [...prev, { ...product, quantity: 1 }];
  });
  showToast(product.name + " added to cart!");
}

function showToast(message) {
  setToast(message);
  setTimeout(() => setToast(""), 2000);
}
  function handleRemoveFromCart(productId) {
  setCartItems(cartItems.filter((item) => item.id !== productId));
}

function handleUpdateQuantity(productId, newQuantity) {
  if (newQuantity < 1) {
    handleRemoveFromCart(productId);
    return;
  }
  setCartItems(cartItems.map((item) =>
    item.id === productId ? { ...item, quantity: newQuantity } : item
  ));
}

function handleOrderComplete() {
  setCartItems([]);
}
function handleLogout() {
  sessionStorage.removeItem("ownerToken");
  setIsOwnerLoggedIn(false);
}

function handleToggleWishlist(product) {
  setWishlist((prev) => {
    const exists = prev.find((item) => item.id === product.id);
    if (exists) {
      return prev.filter((item) => item.id !== product.id);
    }
    return [...prev, product];
  });
}
  return (
    <BrowserRouter>
      <Navbar
  cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
  isOwnerLoggedIn={isOwnerLoggedIn}
/>
      <Routes>
        <Route path="/" element={<Home onAddToCart={handleAddToCart} wishlist={wishlist} onToggleWishlist={handleToggleWishlist} />} />
        <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} onRemove={handleRemoveFromCart} onUpdateQuantity={handleUpdateQuantity} />} />
        <Route path="/checkout" element={<Checkout cartItems={cartItems} onOrderComplete={handleOrderComplete} />} />
        <Route path="/wishlist" element={<Wishlist wishlist={wishlist} onAddToCart={handleAddToCart} onToggleWishlist={handleToggleWishlist} />} />
        <Route
  path="/owner-login"
  element={
    <OwnerLogin
      onLogin={(token) => {
        sessionStorage.setItem("ownerToken", token);
        setIsOwnerLoggedIn(true);
      }}
    />
  }
/>
        <Route
  path="/orders"
  element={isOwnerLoggedIn ? <Orders onLogout={handleLogout} /> : <Navigate to="/owner-login" replace />}
/>
      </Routes>
      {toast && (
  <div style={{
    position: "fixed",
    top: "20px",
    right: "20px",
    backgroundColor: "#e75480",
    color: "white",
    padding: "12px 20px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    fontSize: "14px",
    zIndex: 1000,
  }}>
    {toast}
  </div>
)}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
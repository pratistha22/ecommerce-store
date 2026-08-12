import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Footer from "./components/Footer";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);

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
      <Navbar cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />
      <Routes>
        <Route path="/" element={<Home onAddToCart={handleAddToCart} wishlist={wishlist} onToggleWishlist={handleToggleWishlist} />} />
        <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} onRemove={handleRemoveFromCart} onUpdateQuantity={handleUpdateQuantity} />} />
        <Route path="/checkout" element={<Checkout cartItems={cartItems} onOrderComplete={handleOrderComplete} />} />
        <Route path="/wishlist" element={<Wishlist wishlist={wishlist} onAddToCart={handleAddToCart} onToggleWishlist={handleToggleWishlist} />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
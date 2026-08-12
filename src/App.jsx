import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";

function App() {
  const [cartItems, setCartItems] = useState([]);

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
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
        <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} onRemove={handleRemoveFromCart} onUpdateQuantity={handleUpdateQuantity} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
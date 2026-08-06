import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

function App() {
  const [cartItems, setCartItems] = useState([]);

  function handleAddToCart(product) {
    setCartItems([...cartItems, product]);
  }
  function handleRemoveFromCart(index) {
  setCartItems(cartItems.filter((_, i) => i !== index));
}

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} onRemove={handleRemoveFromCart} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
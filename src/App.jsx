import { useState } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav/Nav.jsx";

export default function App() {
  const [carouselImages, setCarouselImages] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  return (
    <div className="app">
      <Nav />
      <Outlet context={{ carouselImages, setCarouselImages, cartItems, setCartItems }} />
    </div>
  );
}

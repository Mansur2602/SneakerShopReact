import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Card from "./components/Card";
import Banner from "./components/banner";
import Login from "./components/Login";
import { useState, useEffect } from "react";
import Register from "./components/Register";
import Footer from "./components/Footer";
import apiClient from "./api/client";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
  const [cartItems, setCartItems] = useState([]);

   useEffect(() => {
    if (user) fetchCart();
  }, [user]);

  const fetchCart = async () => {
    try {
      const response = await apiClient.get("cart/");
      setCartItems(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Ошибка при загрузке корзины:", error);
    }
  };

  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  const removeFromCart = (sneakerId) => {
    setCartItems((prev) => prev.filter((i) => i.sneaker.id !== sneakerId));
  };
  return (
    <BrowserRouter>
      <Header user = {user} setUser = {setUser} cartItems={cartItems} removeFromCart={removeFromCart}/>
      {/* <Basket/> */}
      <Routes>
        <Route path="/" element={<><Banner/><Card user={user} cartItems={cartItems} addToCart={addToCart} removeFromCart={removeFromCart}/></>} />
        <Route path="/login" element={<Login setUser = {setUser} />} />
        <Route path="/register" element={<Register setUser = {setUser}/>} />
      </Routes>
     <Footer/>
    </BrowserRouter>
  );
}

export default App;

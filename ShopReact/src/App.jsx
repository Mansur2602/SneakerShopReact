import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchCart, fetchFavorites, fetchSneakers, addToCart, removeFromCart, addToFavorite, removeFromFavorite } from "./store/actions";
import "./App.css";
import Header from "./components/Header";
import Card from "./components/Card";
import Banner from "./components/banner";
import Login from "./components/Login";
import Register from "./components/Register";
import Footer from "./components/Footer";
import Favorite from "./components/Favorite";

function App() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
  const sneakers = useSelector((state) => state.sneakers.items);
  const cartItems = useSelector((state) => state.cart.items);
  const favoriteItems = useSelector((state) => state.favorites.items);

  useEffect(() => {
    dispatch(fetchSneakers());
    if (user) { 
    dispatch(fetchCart()); 
    dispatch(fetchFavorites());
    }
  }, [user]);

 
  const handleAddToCart = (sneakerId, e) => {
    e.stopPropagation();
    dispatch(addToCart(sneakerId));
  }

  const handleDeleteFromCart = (sneakerId, e) => {
    e.stopPropagation();
    dispatch(removeFromCart(sneakerId));
  }

  const toggleFavorite = (sneakerId) => {
    const isFavorite = favoriteItems.some(item => item.sneaker.id === sneakerId);
    if (isFavorite) {
      dispatch(removeFromFavorite(sneakerId));
    } else {
      dispatch(addToFavorite(sneakerId));
    }
  }

  
  return (
    <div className="appWrapper">
    <BrowserRouter>
      <Header user = {user} setUser = {setUser} handleDeleteFromCart={handleDeleteFromCart} />
      {/* <Basket/> */}
      <Routes>
        <Route path="/" element={<><Banner/><Card sneakers={sneakers} cartItems={cartItems} favoriteItems={favoriteItems} handleAddToCart={handleAddToCart}
        handleDeleteFromCart={handleDeleteFromCart} toggleFavorite={toggleFavorite}/></>} />
        <Route path="/login" element={<Login setUser = {setUser} />} />
        <Route path="/register" element={<Register setUser = {setUser}/>} />
        <Route path="/favorite" element={<Favorite cartItems={cartItems} favoriteItems={favoriteItems} handleAddToCart={handleAddToCart}
        handleDeleteFromCart={handleDeleteFromCart} toggleFavorite={toggleFavorite} />}></Route>
      </Routes>
     <Footer/>
    </BrowserRouter>
    </div>
  );
}

export default App;

import icon from "../assets/icon.png";
import cart from "../assets/cart.svg";
import favorite from "../assets/favorite.svg";
import empty from "../assets/empty.jpg";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../api/client";
import { useState } from "react";


const Header = ({ user, setUser, cartItems, removeFromCart }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  const handleLogout = async () => {
    try {
      await apiClient.post("logout/");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  const BasketClick = () => {
    setActive(!active);
  };

  const handleDeleteFromCart = (sneakerId) => {
    apiClient
      .delete("cart/", { data: { sneakerId } })
      .then((response) => {
        removeFromCart(sneakerId); 
      })
      .catch((error) => {
        console.error("Ошибка при удалении товара из корзины:", error);
      });
  };

  return (
    <>
    
      <div className={active ? "basket" : "basket_hidden"}>
        <h2 className="basketText">Корзина</h2>
        <div className="basketItems">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              
              <div className="item" key={item.id}>
                <img className="sneakersImg" src={`http://127.0.0.1:8000${item.sneaker.image}`} alt={item.sneaker.name}/>
                <div className="itemText">
                  <p className="description">{item.sneaker.name}</p>
                  <p className="price">{item.sneaker.price} тг</p>
                </div>
                <button onClick={() => handleDeleteFromCart(item.sneaker.id)}> Удалить </button>
              </div>
            )
          )
            
          ) : (
            <div className="emptyBasket">
              <img src={empty} alt="Пустая корзина" width={120} height={120} />
              <h1 className="emptyBasketText">Корзина пустая</h1>
              <p className="emptyBasketPar">Добавьте хотя бы одну пару <br />
                 кроссовок, чтобы сделать заказ.</p>
                 <button onClick={BasketClick} className="returnBackButt">Вернуться назад</button>
            </div>
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="basketTotal">
            <div className="totalText">
              <p className="totalP">Итого:</p>
              <b className="totalPrice">
                {cartItems.reduce((sum, item) => sum + Number(item.sneaker.price), 0)} тг
              </b>
            </div>
            <button className="orderButt">Оформить заказ</button>
          </div>
        )}
      </div>

      <header>
        <div className="iconBox">
          <img src={icon} alt="" width={40} height={40} />
          <div className="textBox">
            <h1 className="iconText">SNEAKERS</h1>
            <p className="iconP">Магазин лучших кроссовок</p>
          </div>
        </div>
        <div className="iconButtons">
          <div className="cartButton" onClick={BasketClick}>
            <img src={cart} alt="" />
          </div>
          <img src={favorite} alt="" />
          {user ? (
            <>
              <span className="login">Привет, {user.username}!</span>
              <button onClick={handleLogout} className="logoutButton">
                Выйти
              </button>
            </>
          ) : (
            <Link className="login" to="/login">Войти</Link>
          )}
        </div>
      </header>
      <hr />
    </>
  );
};

export default Header;

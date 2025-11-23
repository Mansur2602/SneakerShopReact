import { useEffect, useState } from "react";
import addButton from "../assets/addButton.svg";
import apiClient from "../api/client";
import ChMark from "../assets/ChMark.svg";

const Card = ({ cartItems, addToCart, removeFromCart }) => {
  const [sneakers, setSneakers] = useState([]);

  useEffect(() => {
    getSneakers();
  }, []);

  const getSneakers = () => {
    apiClient
      .get("sneaker/")
      .then((response) => {
        setSneakers(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
      });
  };

  const handleAddToCart = (sneakerId) => {
    apiClient
      .post("cart/", { sneakerId })
      .then((response) => {
        addToCart(response.data); 
      })
      .catch((error) => {
        console.error("Ошибка при добавлении товара в корзину:", error);
      });
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
    <div className="cardContainer">
      <div className="headContent">
        <h1 className="headText">Все кроссовки</h1>
        <input className="searchInput" placeholder="Поиск" type="text" />
      </div>
      <div className="cards">
        {sneakers.length > 0 ? (
      sneakers.map((sneaker) => {
        const inCart = cartItems.some(item => item.sneaker.id === sneaker.id);

      return (
      <div className="card" key={sneaker.id}>
        <img className="sneakersImage" src={`http://127.0.0.1:8000${sneaker.image}`} alt={sneaker.name}/>
        <p className="sneakersName">{sneaker.name}</p>
        <div className="priceContainer">
          <div className="priceBlock">
            <p className="priceText">Цена:</p>
            <b className="price">{sneaker.price} тг</b>
          </div>

          {inCart ? (
            <img onClick={() => handleDeleteFromCart(sneaker.id)} src={ChMark} alt="Удалить из корзины"/>
          ) : (
            <img onClick={() => handleAddToCart(sneaker.id)} src={addButton} alt="Добавить в корзину"/>
          )}
        </div>
      </div>
    );
  })
) : (
  <p>Загрузка Кроссовок...</p>
)}

      </div>
    </div>
  );
};

export default Card;

import { useEffect, useState } from "react";
import axios from "axios";
import sneakersImage from "../assets/sneakersImage.jpg";
import addButton from "../assets/addButton.svg";
const API_URL = "http://127.0.0.1:8000/api/sneaker/";

const Card = () => {
  const [sneaker, setSneaker] = useState([]);


  useEffect(() => {
    getSneaker();
  }, []);

  const getSneaker = () => 
    {
    axios
      .get(API_URL)
      .then((response) => {
        setSneaker(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
      });
  };

 

  return (
    <>
    <div className="cardContainer">
      <div className="headContent">
        <h1 className="headText">Все кроссовки</h1>
        <input className="searchInput" placeholder="Поиск" type="text"/>
      </div>
      <div className="cards">
        {sneaker.length > 0 ? (
          sneaker.map((sneaker) =>
          (
            <div className="card">
        <img className="sneakersImage" src={`http://127.0.0.1:8000${sneaker.image}`} alt={sneaker.name} width={133} height={112} />
        <p className="sneakersName">{sneaker.name}</p>
        <div className="priceContainer">
          <div className="priceBlock">
            <p className="priceText">Цена:</p>
            <b className="price">{sneaker.price} тг</b>
          </div>
          <img src={addButton} alt="" />
        </div>
      </div>
          ))
        ) : (
          <p>Загрузка Кроссовок...</p>
        )}
      </div>
      
    </div>
    </>
  );
};

export default Card;

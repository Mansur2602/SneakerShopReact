import { useState } from "react";
import addButton from "../assets/addButton.svg";
import ChMark from "../assets/ChMark.svg";
import favoriteIcon from "../assets/favoriteIcon.png";
import notFound from "../assets/notFound.png";

const Card = ({sneakers, cartItems, favoriteItems, handleAddToCart, handleDeleteFromCart, toggleFavorite}) => {  
  const [seacrh, setSearch] = useState("");

  const SearchSneaker = sneakers.filter((sneaker) =>
    sneaker.name.toLowerCase().includes(seacrh.toLowerCase())
  );

  return (
    <div className="cardContainer">
      <div className="headContent">
        <h1 className="headText">Все кроссовки</h1>
        <input value={seacrh} onChange={(e) => setSearch(e.target.value)} className="searchInput" placeholder="Поиск" type="text" />
      </div>
      <div className="cards">
        {SearchSneaker.length > 0 ? (
      SearchSneaker.map((sneaker) => {
        const inCart = cartItems.some(item => item.sneaker.id === sneaker.id);

      return (
      <div onClick={() => toggleFavorite(sneaker.id)} className="card" key={sneaker.id}>
        {favoriteItems.some(item => item.sneaker.id === sneaker.id) && (
          <img className="favoriteIcon" src={favoriteIcon} alt="В избранном" />
        )}
  
        <img className="sneakersImage" src={`http://127.0.0.1:8000${sneaker.image}`} alt={sneaker.name}/>
        <p className="sneakersName">{sneaker.name}</p>
        <div className="priceContainer">
          <div className="priceBlock">
            <p className="priceText">Цена:</p>
            <b className="price">{sneaker.price} тг</b>
          </div>

          {inCart ? (
            <img onClick={(e) => handleDeleteFromCart(sneaker.id, e)} src={ChMark} alt="Удалить из корзины"/>
          ) : (
            <img onClick={(e) => handleAddToCart(sneaker.id, e)} src={addButton} alt="Добавить в корзину"/>
          )}
        </div>
      </div>
    );
  })
) : (
  <img className="notFound" src={notFound} alt="" />
)}

      </div>
    </div>
  );
};

export default Card;

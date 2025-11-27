import pointer from '../assets/pointer.svg';
import { Link } from "react-router-dom";
import addButton from "../assets/addButton.svg";
import ChMark from "../assets/ChMark.svg";
import favoriteIcon from "../assets/favoriteIcon.png";

const Favorite = ({favoriteItems, cartItems, handleAddToCart, handleDeleteFromCart, toggleFavorite }) => 
{
    
    return(
        <>
        <div className="favoriteHeader">
            <Link to="/"><div className="returnBack"><img src={pointer} alt="" /></div></Link>
            
            <h1 className="favoriteText">Мои закладки</h1>
            
        </div>
         <div className="cards">
          {favoriteItems.length > 0 ? (
            favoriteItems.map((item) => {
                const sneaker = item.sneaker;
                const inCart = cartItems.some(ci => ci.sneaker.id === sneaker.id);
              return (
                <div className="card" key={sneaker.id} onClick={() => toggleFavorite(sneaker.id)}>
                  <img className="favoriteIcon" src={favoriteIcon} alt="В избранном" />
                  <img className="sneakersImage" src={`http://127.0.0.1:8000${sneaker.image}`} alt={sneaker.name}/>
                  <p className="sneakersName">{sneaker.name}</p>
                  <div className="priceContainer">
                    <div className="priceBlock">
                      <p className="priceText">Цена:</p>
                      <b className="price">{sneaker.price} тг</b>
                    </div>
                    {inCart ? (
                      <img src={ChMark} alt="Удалить из корзины" onClick={(e) => handleDeleteFromCart(sneaker.id, e)}/>) 
                      : (
                      <img src={addButton} alt="Добавить в корзину" onClick={(e) => handleAddToCart(sneaker.id, e)}/>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p>Закладок пока нет...</p>
          )}
        </div>
        </>
    )
}
export default Favorite;
import pointer from '../assets/pointer.svg';
import { Link } from "react-router-dom";
const Favorite = ({favoriteItems, setFavoriteItems}) => 
{

    return(
        <>
        <div className="favoriteHeader">
            <Link to="/"><div className="returnBack"><img src={pointer} alt="" /></div></Link>
            
            <h1 className="favoriteText">Мои закладки</h1>
        </div>
        </>
    )
}
export default Favorite;
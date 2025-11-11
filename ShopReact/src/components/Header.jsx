import icon from "../assets/icon.png";
import cart from "../assets/cart.svg";
import favorite from "../assets/favorite.svg";
const Header = () => {
    return (
        <>
        <header>
            <div className="iconBox">
                <img src={icon} alt="" width={40} height={40} />
                <div className="textBox">

                    <h1 className="iconText">SNEAKERS</h1>
                    <p className="iconP">Магазин лучших кроссовок</p>
                </div>
            </div>
            <div className="iconButtons">
            <img src={cart} alt="" />
            <img src={favorite} alt="" />
            <a className="login" href="">Войти</a>
            </div>
        </header>
        <hr/>
        </>

    )
}
export default Header
import sponsors from '../assets/sponsors.png'
import bannerImage from '../assets/bannerImage.png'
const Banner = () =>
{
    return(
        <>
        <div className="banner">
            <div className="content">
            <img className="sponsors" src={sponsors} alt=""  width={99} height={40}/>
           <h1 className="bannerText">
            Stan Smith<span className="black">,</span><br />
            <span className="black">Forever!</span>
            </h1>
            <button className='buyButton'>Купить</button>
            </div>
            <img src={bannerImage} alt="" />
        </div>
        </>
    )
}
export default Banner;
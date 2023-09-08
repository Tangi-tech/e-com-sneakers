import ContentLoader from "react-content-loader"
import { useEffect, useState } from 'react'

import style from './Card.module.scss'
// import AppContext from '../../context'

const Card = ({ item, setDrawerItems, onClickFavorite, setInitialFavorites = false, isAdded = false, loading = false }) => {
    const [btnChecked, setBtnChecked] = useState(isAdded)
    const [favorite, setFavorite] = useState(setInitialFavorites)

    // const { checkIsAdded } = useContext(AppContext)

    useEffect(() => {
      setBtnChecked(isAdded)
    }, [isAdded])
    const handleBtnChecked = () => {
      setDrawerItems(item)
      setBtnChecked(!btnChecked)
    }
    const handleSetFavorite = () => {
      onClickFavorite(item)
      setFavorite(!favorite)
    }

    return (
        <div className={style.card}>
          { 
            loading ? <ContentLoader 
            speed={0.5}
            width={180}
            height={220}
            viewBox="0 0 180 220"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="8" ry="8" width="170" height="124" /> 
            <rect x="0" y="137" rx="8" ry="8" width="170" height="15" /> 
            <rect x="0" y="162" rx="8" ry="8" width="121" height="15" /> 
            <rect x="0" y="194" rx="8" ry="8" width="121" height="24" /> 
            <rect x="138" y="187" rx="8" ry="8" width="32" height="32" />
          </ContentLoader> : 
          <>
            <div className={style.cartHeart} onClick={handleSetFavorite}>
            <img src={favorite ? "/img/favoriteOn.svg" : "/img/heartOff.svg"} alt="heart" />
            </div>
            <img width='100%' height={135} src={item.imgURL} alt="card" className={style.cardImg}/>
            <p>{item.name}</p>
            <div className={style.cardBottom}>
              <div className={style.cardPrice}>
                <span>ЦЕНА:</span>
                <b>{item.price} руб.</b>
              </div>
                <img src={ btnChecked ? '/img/plusChecked.svg' : '/img/plus.svg'} alt="" className={style.btnPlus} onClick={handleBtnChecked}/>
            </div>
          </>
          }
        </div>
    )
}

export default Card
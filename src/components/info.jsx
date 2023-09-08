import { useContext } from 'react'
import { Link } from 'react-router-dom'

import AppContext from '../context'

export const Info = ({title, description, image, smallSize = false, redirectToHome = false}) => {
    const { setCartOpened } = useContext(AppContext)

    return (
        <div className="cartEmpty">
            <img width={smallSize ? 70 : 132} height={smallSize ? 70 : 132} src={image} alt="box" className="imgBox"/>
            <h3>{title}</h3>
            <p className="cartEmptyText">{description}</p>
            {
                redirectToHome ? 
                <Link to='/'>
                    <button onClick={() => setCartOpened(false)}>
                        <p>Вернуться назад</p>
                        <img src="img/arrow-left.svg" alt=""/>
                    </button>
                </Link> :

                <button onClick={() => setCartOpened(false)}>
                <p>Вернуться назад</p>
                <img src="img/arrow-left.svg" alt=""/>
            </button>
            }
            
        </div>
  )
}

export default Info
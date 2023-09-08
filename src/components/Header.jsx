import { Link } from 'react-router-dom'

import { useCartPrice } from '../hooks/useCartPrice'

const Header = (props) => {
  
    const { totalPrice } = useCartPrice()

    return (
        <header>
        <Link to='/'>
          <div className="headerLeft">
            <img width={40} height={40} src="img/logo.png" alt="logo"/>
            <div className="headerInfo">
              <h3>REACT SNEACKERS</h3>
              <p>Магазин лучших кросовок</p>
            </div>
          </div>
        </Link>
        
        <ul className="headerRight">
          <li onClick={props.onClickCart} className="cartIcon">
          <img width={18} height={18} src="img/cart.svg" alt="cart" />
            <span>{totalPrice} руб.</span>
          </li>
          <Link to="/favorite">
            <li>
              <img width={20} height={20} src="img/favorite.svg" alt="favorite" />
            </li>
          </Link>
          <Link to="/orders">
            <li>
            <img width={20} height={20} src="img/user.svg" alt="user" />
            </li>
          </Link>
        </ul>
      </header>
    )
}

export default Header
import { useState, useContext } from 'react'
import axios from 'axios'

import Info from '../info'
import AppContext from '../../context'
import { useCartPrice } from '../../hooks/useCartPrice'

import Styles from './Drawer.module.scss'

const Drawer = ({onClickClose, onClickRemove, cartOpened }) => {
    const [isOrderCompleted, setIsOrderCompleted] = useState(false)
    const [buttonDesabled, setButtonDesabled] = useState(false)
    
    const { setOrderItems } = useContext(AppContext)
    const { drawerItems, setDrawerItems, totalPrice } = useCartPrice()

    const handlerMakeOrder = async () => {
      setButtonDesabled(true)
      for (let i = 0; i < drawerItems.length; i++) {
        await axios.delete(`https://64ea5446bf99bdcc8e677e33.mockapi.io/cart/${drawerItems[i].id}`)
      }
      setIsOrderCompleted(true)
      setOrderItems(drawerItems)
      setDrawerItems([])
      setButtonDesabled(false)
    }
    
    return (
        <div className={`${Styles.drawerOuter} ${cartOpened ? Styles.drawerOuterVisible : ''} `}>
        <div className={Styles.drawerInner}>
          <h2>Корзина
          <img src="img/btnRemove.svg" alt="" className="btnRemove" onClick={() => onClickClose(false)}/>
          </h2>
          
            {drawerItems.length > 0 ? 
              (
              <div className={Styles.contentWrapper}>
                <div className={Styles.cartItems}>
                  {drawerItems.map((item, index) => (
                    <div key={index + item.name} className={Styles.cartItem}>
                      <img width={70} height={70} src={item.imgURL} alt="" className={Styles.imgItem}/>
                      <div className={Styles.decription}>
                        <p>{item.name}</p>
                        <b>{item.price} руб.</b>
                      </div>
                      <img src="img/btnRemove.svg" alt="remove" className={Styles.btnRemove} onClick={() => onClickRemove(item)}/>
                    </div>
                    ))}
                </div>
                  <div>
                    <ul className={Styles.cartBottom}>
                      <li className={Styles.cartBottomDesc}>
                        <span>Итого:</span>
                        <div className={Styles.cartSeporator}></div>
                        <b>{totalPrice} руб.</b>
                      </li>
                      <li className={Styles.cartBottomDesc}>
                        <span>Налог 5%:
                        </span>
                        <div className={Styles.cartSeporator}></div>
                        <b>{Math.round(totalPrice*0.05)} руб.</b></li>
                    </ul>
                    <button disabled={buttonDesabled} className={Styles.cartButton} onClick={handlerMakeOrder}>
                      <span className={Styles.cartText}>Оформить заказ</span>
                      <img src="img/arrow.svg" alt=""/>
                    </button>
                  </div>
              </div>
              )

              :
              
              <Info 
                title={ isOrderCompleted ? "Заказ оформлен" : "Корзина пустая" }
                description={ isOrderCompleted ? "Ваш заказ №18 будет передан курьерской службе" : "Добавьте хотя бы одну пару кроссовок, что бы сделать заказ." }
                image={ isOrderCompleted ? "img/list.jpg" : "img/box.jpg" }
              />
              
            }
          
        </div>
      </div>
    )
}

export default Drawer
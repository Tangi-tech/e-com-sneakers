import { useContext } from 'react'

import Card from '../components/Card/index'
import Info from '../components/info'

import AppContext from '../context'

const Orders = (  ) => {
    const { handleAddToDrawer, handleAddFavoriteItem, checkIsAdded, orderItems } = useContext(AppContext)
   
    return (
        <div className="content">
            <div className="contentHeaderWrapper">
                <h1 className="contentHeader">Мои заказы</h1>
            </div>

            <div className="cards">
            {
                orderItems.length > 0 ? orderItems.map((item, index) => 
                <Card 
                    key={index + item.name} 
                    item={item} 
                    setDrawerItems={handleAddToDrawer} 
                    onClickFavorite={handleAddFavoriteItem} 
                    setInitialFavorites={true}
                    isAdded={checkIsAdded(item)}
                />) :
                <Info 
                title={ "У вас нет заказов" }
                description={ "Добавьте хотя бы одну пару кроссовок, что бы сделать заказ." }
                image={ "img/sad.jpg" }
                smallSize={true}
                redirectToHome={true}
              />
            } 
            </div>
        
      </div>
    )
}

export default Orders
import Card from '../components/Card/index'
import { useContext } from 'react'
import AppContext from '../context'
import Info from '../components/info'


const Favorite = (  ) => {
    const { favoriteItems, handleAddToDrawer, handleAddFavoriteItem, checkIsAdded } = useContext(AppContext)
   
    return (
        <div className="content">
            <div className="contentHeaderWrapper">
                <h1 className="contentHeader">Избранное</h1>
            </div>

            <div className="cards">
            {
                favoriteItems.length > 0 ? favoriteItems.map((item, index) => 
                <Card 
                    key={index + item.name} 
                    item={item} 
                    setDrawerItems={handleAddToDrawer} 
                    onClickFavorite={handleAddFavoriteItem} 
                    setInitialFavorites={true}
                    isAdded={checkIsAdded(item)}
                />) :
                <Info 
                title={ "Закладок нет :(" }
                description={ "Вы ничего не добавили в закладки" }
                image={ "/img/cry.jpg" }
                smallSize={true}
                redirectToHome={true}
              />
            }
            </div>
        
      </div>
    )
}

export default Favorite
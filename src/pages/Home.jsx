import { useContext } from 'react'

import AppContext from '../context'

import Card from '../components/Card/index'

const Home = ({ 
    searchInput,
    handleSearchInput,
    handlerClearSearchBar,
    Items,
    handleAddToDrawer,
    handleAddFavoriteItem,
    isLoading
}) => {
    const { checkIsAdded, checkIsFavorited } = useContext(AppContext)

    const renderItems = () => {
        const filteredItems = Items.filter(item => item.name.toLowerCase().includes(searchInput.toLowerCase()))

        return  (isLoading ? [...Array(12)] : filteredItems)
                .map((item, index) => 
                    <Card 
                        key={index} 
                        item={item} 
                        setDrawerItems={handleAddToDrawer} 
                        onClickFavorite={handleAddFavoriteItem} 
                        isAdded={checkIsAdded(item)} 
                        setInitialFavorites={checkIsFavorited(item)} 
                        loading={isLoading} 
                    />)
    }

    return (
        <div className="content">
            <div className="contentHeaderWrapper">
                <h1 className="contentHeader">{searchInput ? `Поиск по запросу: ${searchInput}` : 'Все кроссовки'}</h1>
                <div className="searchBar">
                    <img width={14} height={14} src="/img/search.svg" alt="search" className="search"/>
                    <input onChange={handleSearchInput} value={searchInput} placeholder="Поиск..."></input>
                    {searchInput && <img src="/img/btnRemove.svg" alt="" className="btnSearchRemove" onClick={handlerClearSearchBar}/>}
                </div>
            </div>

            <div className="cards">
            {
                renderItems()
            }
            </div>
        
      </div>
    )
}

export default Home
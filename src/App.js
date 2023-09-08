import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import AppContext from './context'
import axios from 'axios'
import Header from './components/Header'
import Drawer from './components/Drawer'
import Home from './pages/Home'
import Favorite from './pages/Favorite'
import Orders from './pages/Orders'


function App() {
  const [cartOpened, setCartOpened] = useState(false);
  const [Items, setItems] = useState([]);
  const [drawerItems, setDrawerItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {

        const [drawerData, itemsData] = await Promise.all([
          axios.get('https://64ea5446bf99bdcc8e677e33.mockapi.io/cart'),
          axios.get('https://64ea5446bf99bdcc8e677e33.mockapi.io/items')
        ])

        // const drawerData = await axios.get('https://64ea5446bf99bdcc8e677e33.mockapi.io/cart')
        // const itemsData = await axios.get('https://64ea5446bf99bdcc8e677e33.mockapi.io/items')

        setIsLoading(false)
        setDrawerItems(drawerData.data)
        setItems(itemsData.data)
      } catch(error) {
        alert('Ошибка получения данных')
        console.error(error)
      }
      
    }
    fetchData()
 
  }, [])

  const handleAddFavoriteItem = (item) => {
    if(favoriteItems.find(i => i.id === item.id)){
      setFavoriteItems(prev => favoriteItems.filter(i => i.id !== item.id))
    } else {
      setFavoriteItems(prev => [...prev, item])
    }
  }

  const handleRemoveCartItem = (item) => {
    setDrawerItems(prev => prev.filter(i => i.id !== item.id))
    axios.delete(`https://64ea5446bf99bdcc8e677e33.mockapi.io/cart/${item.id}`)
  }
  
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value)
  }

  const handleAddToDrawer = async (item) => {
    try {
      const { data } = await axios.get(`https://64ea5446bf99bdcc8e677e33.mockapi.io/cart`)
      
      if (data.some(cartItem => {
        if (cartItem.parentId === item.id) {
          axios.delete(`https://64ea5446bf99bdcc8e677e33.mockapi.io/cart/${cartItem.id}`)
          setDrawerItems(prev => prev.filter(i => i.id !== cartItem.id))
          return true
        } else {
          return false
        }
      })) 
      {
        // Nothing to put here
      } else {
        const { data } = await axios.post(`https://64ea5446bf99bdcc8e677e33.mockapi.io/cart`, {...item, parentId: item.id})
        setDrawerItems(prev => [...prev, data])
      }
    } catch(error) {
      alert('Не удалось отправить обьект на сервер')
      console.error(error)
    }
    
  }

  const handlerClearSearchBar = () => {
    setSearchInput('')
  }

  const checkIsAdded = (item) => {
    return drawerItems.some(i => i.parentId === item?.id)
  }
  const checkIsFavorited = (item) => {
    return favoriteItems.some(i => i?.id === item?.id)
  }

  return (
    <AppContext.Provider value={{ Items, drawerItems, favoriteItems, handleAddToDrawer, handleAddFavoriteItem, checkIsAdded, checkIsFavorited, setCartOpened, setDrawerItems, orderItems, setOrderItems }}>
      <div className="wrapper clear">

      <Drawer 
        onClickRemove={handleRemoveCartItem}
        onClickClose={setCartOpened}
        cartOpened={cartOpened}
      />      
      <Header onClickCart={() => setCartOpened(true)}/>
       
      <Routes>
        <Route path='/'>

          <Route index element={
            <Home 
              searchInput={searchInput} 
              handleSearchInput={handleSearchInput} 
              handlerClearSearchBar={handlerClearSearchBar} 
              Items={Items} 
              handleAddToDrawer={handleAddToDrawer} 
              handleAddFavoriteItem={handleAddFavoriteItem} 
              drawerItems={drawerItems} 
              isLoading={isLoading}
            />} 
          />

          <Route path="/favorite" element={ <Favorite /> } />
          <Route path="/orders" element={ <Orders /> } />

          <Route path="*" element={ <center>NOT FOUND PAGE</center> } />

        </Route>
      </Routes>
    </div>
    </AppContext.Provider>
  );
}

export default App;

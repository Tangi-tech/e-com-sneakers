import AppContext from '../context'
import { useContext } from 'react'

export const useCartPrice = () => {
    const { drawerItems, setDrawerItems } = useContext(AppContext) 
    const totalPrice = drawerItems.reduce((sum, obj) => obj.price + sum, 0)

    return { drawerItems, setDrawerItems, totalPrice }
}
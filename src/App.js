import axios from 'axios';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Drawer from './components/Drawer';
import Header from './components/Header/Header';
import AppContext  from './context';
import FavouritesPage from './pages/FavouritesPage';
import HomePage from './pages/HomePage';
import OrdersPage from './pages/OrdersPage';





function App() {
    
    //CART OPENED STATE
    const [isCartOpened, setIsCartOpened] = React.useState(false);

    const [isItemsLoading, setIsItemsLoading] = React.useState(true);
    
    //CARDS STATE
    const [items, setItems] = React.useState([]);

    //ITEMS IN CART STATE
    const [cartItems, setCartItems] = React.useState([]);

    //ITEMS IN FAVOURITES STATE
    const [favourites, setFavourites] = React.useState([]);

    //SEARCH STATE
    const [inputValue, setInputValue] = React.useState('');

    //INITIALIZE ITEMS
    React.useEffect(() => {
        async function fetchData() {

            const cartRes = await axios.get('https://6219e87481d4074e85b46e0d.mockapi.io/cart');
            const favouritesRes = await axios.get('https://6219e87481d4074e85b46e0d.mockapi.io/favourites');
            const itemsRes = await axios.get('https://6219e87481d4074e85b46e0d.mockapi.io/items');

            setIsItemsLoading(false);

            setCartItems(cartRes.data);
            setFavourites(favouritesRes.data);
            setItems(itemsRes.data);

        }

        fetchData()
    }, [])

    const onAddToCart = async (obj) => {
        try {
            const foundItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
            if(foundItem) {
                setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
                await axios.delete(`https://6219e87481d4074e85b46e0d.mockapi.io/cart/${foundItem.id}`);
            } else {
                setCartItems((prev) => [...prev, obj]);
        const { data } =  await axios.post('https://6219e87481d4074e85b46e0d.mockapi.io/cart', obj);
        setCartItems((prev) =>
            prev.map((item) => {
            if (item.parentId === data.parentId) {
                return {
                ...item,
                id: data.id,
                };
            }
            return item;
                }))
            }
        } catch (error) {
            
        }
    }

    const onAddToFavourites = async (obj) => {
        try {
            if (favourites.find(favouriteObj => favouriteObj.id === obj.id)) {
                axios.delete(`https://6219e87481d4074e85b46e0d.mockapi.io/favourites/${obj.id}`);
                setFavourites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
            } else {
                const { data } = await axios.post('https://6219e87481d4074e85b46e0d.mockapi.io/favourites', obj);
                setFavourites((prev) => [...prev, data])
            }
        } catch(error) {
            alert('Error on adding favourite')
        }

    }

    const onRemoveFromCart = (id) => {
        axios.delete(`https://6219e87481d4074e85b46e0d.mockapi.io/cart/${id}`);
        setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)))
    }

    const onSearchInputChange = (event) => {
        setInputValue(event.currentTarget.value);
    }

    const isItemAdded = (id) => {
        return cartItems.some((obj) => Number(obj.parentId) === Number(id))
    }

    return (
    <AppContext.Provider value={{items, 
                        cartItems, 
                        favourites, 
                        isItemAdded, 
                        onAddToFavourites, 
                        setIsCartOpened, 
                        setCartItems,
                        onAddToCart }}>
        <div className='wrapper clear'>
            {isCartOpened && <Drawer onRemoveFromCart={onRemoveFromCart} items= {cartItems} onCartClose = {() => setIsCartOpened(false)} />}
            <Header onCartClick = {() => setIsCartOpened(true)}/>

            <Routes>
                <Route path="/" element={
                <HomePage items={items}
                    cartItems = {cartItems} 
                    inputValue={inputValue} 
                    onAddToCart={onAddToCart} 
                    onAddToFavourites={onAddToFavourites} 
                    onSearchInputChange={onSearchInputChange}
                    isItemsLoading={isItemsLoading}
                    />} exact>
                </Route>

                <Route path='/favourites' element={<FavouritesPage/>}></Route>

                <Route path='/orders' element={<OrdersPage/>}></Route>
            </Routes>
        </div>
    </AppContext.Provider>
    );
}

export default App;

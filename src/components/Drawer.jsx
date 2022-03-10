import axios from "axios";
import React from "react";
import AppContext from "../context";
import Info from "./Info.jsx/Info";

const Drawer = ({ onCartClose, onRemoveFromCart, items = [] }) => {

    const { cartItems, setCartItems } = React.useContext(AppContext);



    const totalCartPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);


    const [isOrderCompleted, setIsOrderCompleted] = React.useState(false);


    const [orderId, setOrderId] = React.useState(null);

    const onMakeOrderClick = async () => {
        try {
            const { data } = await axios.post('https://6219e87481d4074e85b46e0d.mockapi.io/orders', { items: cartItems });
            setOrderId(data.id);
            setIsOrderCompleted(true);
            setCartItems([]);

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete(`https://6219e87481d4074e85b46e0d.mockapi.io/cart/${item.id}`)
            }
        } catch (error) {
            alert('Something went wrong')
        }

    }


    return (
        <div className="overlay">
            <div className="drawer">
                <h2 className='mb-30 d-flex justify-between'>
                    Cart <img className='removeBtn cu-p' src="/images/btn-remove.svg" alt="Remove" onClick={onCartClose} />
                </h2>

                {
                    items.length > 0 ?
                        <>
                            <div className='items mb-20'>
                                {items.map(item => (
                                    <div key={item.id} className="cartItem d-flex align-center ">
                                        <div style={{ backgroundImage: `url(${item.imageUrl})` }} className="cartItemImg"></div>
                                        <div className='mr-20 flex'>
                                            <p className='mb-5'>{item.name}</p>
                                            <b>{item.price} rub.</b>
                                        </div>
                                        <img onClick={() => onRemoveFromCart(item.id)} className='removeBtn' src="/images/btn-remove.svg" alt="Remove" />
                                    </div>
                                ))}
                            </div>

                            <div className="cartTotalBlock">
                                <ul>
                                    <li>
                                        <span>Summ: </span>
                                        <div></div>
                                        <b>{totalCartPrice.toFixed(3)} rub.</b>
                                    </li>
                                    <li>
                                        <span>Fee 5%: </span>
                                        <div></div>
                                        <b>{(totalCartPrice * 0.05).toFixed(3)} rub.</b>
                                    </li>
                                </ul>
                                <button onClick={onMakeOrderClick} className='greenBtn'>Make an order <img src="/images/cartBtnArrow.svg" alt="" /> </button>
                            </div>
                        </> : <Info title={isOrderCompleted ? 'Заказ оформлен!' : 'Корзина пустая'}
                            description={isOrderCompleted ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'}
                            image={isOrderCompleted ? '/images/order-completed.jpg' : '/images/empty-cart.jpg'} />
                }



            </div>
        </div>
    )
}

export default Drawer;
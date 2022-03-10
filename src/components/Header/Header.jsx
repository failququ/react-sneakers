import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../context';
import styles from './Header.module.scss'


const Header = (props) => {

    const { cartItems } = React.useContext(AppContext);

    const totalCartPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

    return (
        <header className='d-flex justify-between align-center p-40'>
            <Link to='/'>
                <div className='d-flex align-center'>
                    <img width={40} height={40} src='/images/logo.png' alt="#" />
                    <div>
                        <h3 className={styles.shopName}>Sneakers Shop</h3>
                        <p className='opacity-5'>Online sneakers shop</p>
                    </div>
                </div>
            </Link>


            <ul className='d-flex'>
                <li className='mr-30 cu-p' onClick={props.onCartClick}>
                    <img width={18} height={18} src='/images/cart.svg' alt="#" />
                    <span> {totalCartPrice.toFixed(3)} rub.</span>
                </li>
                <li className='mr-20 cu-p'>
                    <Link to='/favourites'>
                        <img width={18} height={18} src='/images/heart-gray.svg' alt="#" />
                    </Link>
                </li>
                <li>
                    <Link to='/orders'>
                        <img width={18} height={18} src='/images/user.svg' alt="#" />
                    </Link>
                </li>
            </ul>
        </header>
    )
}

export default Header;
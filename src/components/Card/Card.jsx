import React from 'react';
import ContentLoader from "react-content-loader"
import AppContext from '../../context';
import styles from './Card.module.scss';

const Card = ({ id, imageUrl, name, price, onPlus, onFavourite, favoured = false, loading = false }) => {

    const { isItemAdded } = React.useContext(AppContext);

    const obj = { id, parentId: id, name, imageUrl, price }

    //SNEAKER LIKED STATE
    const [isFavourite, setIsFavourite] = React.useState(favoured);

    const onPlusClick = () => {
        onPlus(obj);
    }

    const onFavouriteClick = () => {
        onFavourite(obj);
        setIsFavourite(!isFavourite)
    }

    return (
        <div className={styles.card}>
            {
                loading
                    ?
                    <ContentLoader
                        speed={2}
                        width={155}
                        height={265}
                        viewBox="0 0 155 265"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb">
                        <rect x="0" y="0" rx="10" ry="10" width="155" height="90" />
                        <rect x="-1" y="99" rx="10" ry="10" width="155" height="15" />
                        <rect x="0" y="124" rx="10" ry="10" width="100" height="15" />
                        <rect x="0" y="162" rx="10" ry="10" width="80" height="24" />
                        <rect x="118" y="158" rx="10" ry="10" width="32" height="30" />
                    </ContentLoader>
                    :
                    <>
                        <div onClick={onFavouriteClick} className={styles.favourite}>
                            {onFavourite && <img src={isFavourite ? "/images/heart-red.svg" : "/images/heart-gray.svg"} alt="heart" />}
                        </div>
                        <img width={130} height={110} src={imageUrl} alt="sneakers" />
                        <h5>{name}</h5>
                        <div className='d-flex justify-between align-center'>
                            <div className='d-flex flex-column'>
                                <span>Price: </span>
                                <b>{price} rub</b>
                            </div>
                            <div onClick={onPlusClick} width={32} height={32} className={styles.plusButton}>
                                {onPlus && <img src={isItemAdded(id) ? "/images/checkedBtn.svg" : "/images/plusBtn.svg"} alt="Plus" />}
                            </div>
                        </div>
                    </>
            }

        </div>

    )
}

export default Card;
import React from "react";
import Card from "../components/Card/Card"

const HomePage = ({ items, inputValue, onSearchInputChange, onAddToCart, onAddToFavourites, isItemsLoading }) => {




    const renderItems = () => {

        const filteredItems = items.filter((item) => item.name.toLowerCase().includes(inputValue.toLowerCase()));

        return (isItemsLoading ? [...Array(10)] : filteredItems).map((item, index) =>
            <Card
                key={index}
                onPlus={(obj) => onAddToCart(obj)}
                onFavourite={(obj) => onAddToFavourites(obj)}
                loading={isItemsLoading}
                {...item} />)

    }

    return (
        <div className="content p-40">
            <div className='d-flex align-center justify-between mb-40'>
                <h1>{inputValue ? `Searching for: ${inputValue}` : "Our sneakers"}</h1>
                <div className='search d-flex'>
                    <img src="/images/search.svg" alt="" />
                    <input onChange={onSearchInputChange} value={inputValue} type="text" placeholder='Search' />
                </div>
            </div>
            <div className="d-flex flex-wrap ml-50 sneakersList">
                {renderItems()}
            </div>
        </div>
    )
}

export default HomePage;
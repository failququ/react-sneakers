import React from "react";
import AppContext from "../context";
import Card from "../components/Card/Card";

const FavouritesPage = () => {

    const { favourites, onAddToFavourites } = React.useContext(AppContext);

    return (
        <div className="content p-40">
            <div className='d-flex align-center justify-between mb-40'>
                <h1>FAVOURITES</h1>
            </div>
            <div className="d-flex flex-wrap ml-50 sneakersList">
                {favourites
                    .map((item, index) =>
                        <Card
                            key={index}
                            favoured={true}
                            onFavourite={onAddToFavourites}
                            {...item}
                        />)}
            </div>
        </div>
    )
}

export default FavouritesPage;
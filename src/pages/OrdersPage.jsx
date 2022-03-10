import React from "react";
import AppContext from "../context";
import Card from "../components/Card/Card";
import axios from "axios";

const OrdersPage = () => {

    const { onAddToCart, onAddToFavourites } = React.useContext(AppContext);

    const [orders, setOrders] = React.useState([]);

    React.useEffect(() => {
        (async () => {
            const { data } = await axios.get('https://6219e87481d4074e85b46e0d.mockapi.io/orders');
            setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
        })();
    }, [])


    return (
        <div className="content p-40">
            <div className='d-flex align-center justify-between mb-40'>
                <h1>ORDERS</h1>
            </div>
            <div className="d-flex flex-wrap ml-50 sneakersList">
                {orders.map((item, index) =>
                    <Card
                        key={index}
                        {...item} />)}
            </div>
        </div>
    )
}

export default OrdersPage;
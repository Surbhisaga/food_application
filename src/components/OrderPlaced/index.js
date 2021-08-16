import React from 'react';
import { Link} from 'react-router-dom';

const OrderPlaced = () => {
return (
    <div>
        <h1 style={{ textAlign: 'center', margin: '100px', color: "blue" }}>
            Successfully ... Your order is confirm
        </h1>
        <div  style={{textAlign:'center',fontSize:'40px'}}>
            <Link to="/search" >
                Confirm Cash On Delivery
            </Link>

        </div>
    </div>)
}

export default OrderPlaced
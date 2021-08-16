import React, { useEffect } from 'react';
import './styles.scss'
import FormInput from './../forms/FormInput';
import Button from './../forms/Button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from './../../redux/Cart/cart.actions'
import { selectCartItemsCount } from './../../redux/Cart/cart.selector'
import { createStructuredSelector } from 'reselect';
import { useHistory } from 'react-router';
import OrderPlaced from './../OrderPlaced';
import { db } from '../../firebase/utils';

const initialAddressState = {
    line1: '',
    line2: '',
    city: '',
    state: '',
    number: '',
    postal_code: ''
};

const mapState = createStructuredSelector({
    itemCount: selectCartItemsCount
})

const PaymentDetails = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [address, setAddress] = useState({ ...initialAddressState });
    const [recipientName, setRecipientName] = useState('');
    const { itemCount } = useSelector(mapState);

    useEffect(() => {
        if (itemCount < 1) {
            history.push('/')
        }
    }, [itemCount])

    const handleAddress = evt => {
        const { name, value } = evt.target;
        setAddress({
            ...address,
            [name]: value
        })
    }

    const handleFormSubmit = async evt => {
        evt.preventDefault();
        db.ref("UserOrder").push({
            recipientName: recipientName,
            line1:address.line1,
            line2:address.line2,
            city:address.city,
            state:address.state,
            number:address.number,
            postal_code:address.postal_code

        }).catch(alert)
        dispatch(
            clearCart()
        )
        history.push('/orderPlaced')
    };

    // const handleDataCod = ()=>{

    //     dispatch(
    //         clearCart()
    //     );
    //     // history.push('/cart')
    //     console.log("order place")
    // }

    return (
        <div className="paymentDetails">
            <form onSubmit={handleFormSubmit}>

                <div className="group">
                    <h2>Address</h2>

                    <FormInput
                        placeholder="Recipient name"
                        name="recipientName"
                        handleChange={evt => setRecipientName(evt.target.value)}
                        value={recipientName}
                        type="text"
                        required
                    />

                    <FormInput
                        placeholder="Your address Line 1"
                        handleChange={evt => handleAddress(evt)}
                        name="line1"
                        ha
                        value={address.line1}
                        type="text"
                        required
                    />

                    <FormInput
                        placeholder="Your Address Line 2"
                        handleChange={evt => handleAddress(evt)}
                        name="line2"
                        value={address.line2}
                        type="text"
                    />
                    <FormInput
                        placeholder="City"
                        handleChange={evt => handleAddress(evt)}
                        name="city"
                        value={address.city}
                        type="text"
                        required
                    />
                    <FormInput
                        placeholder="State"
                        handleChange={evt => handleAddress(evt)}
                        name="state"
                        value={address.state}
                        type="text"
                        required
                    />
                    <FormInput
                        placeholder="Phone Number"
                        handleChange={evt => handleAddress(evt)}
                        name="number"
                        value={address.number}
                        type="number"
                        required
                    />
                    <FormInput
                        placeholder="Postal code"
                        handleChange={evt => handleAddress(evt)}
                        name="postal_code"
                        value={address.postal_code}
                        type="text"
                        required
                    />
                </div>
                {/* 
                <div className="group">
                    <h2>Payment</h2>
                    <FormInput
                        placeholder="cart Name"
                        type="text"
                    />

                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <FormInput
                            placeholder="card number"
                            name="cardNumber"
                            type="text"
                        />

                        <FormInput
                            placeholder="cvv"
                            type="text" />
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <h4>Or</h4>
                        <Link to="/orderPlaced">
                            <Button type="submit" onClick={() => handleDataCod()}>
                                COD
                            </Button>
                            </Link>
                    </div>
                </div> */}
                <br /><hr /><hr /><br />
                <div className="orderNow">
                <Button type="submit" >
                    Order Now
                </Button>
</div>
            </form>
        </div>
    );
}

export default PaymentDetails;
import React from 'react'
import { useDispatch } from 'react-redux';
import Button from './../../forms/Button'
import { addMeal } from './../../../redux/Cart/cart.actions'
import { useHistory } from 'react-router-dom';

const Meal = (meal) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {
        documentID,
        restaurant, 
        mealName, 
        mealThumbnail, 
        mealPrice,
    } = meal;
    if (!documentID || !mealThumbnail || !mealName ||
        typeof mealPrice === 'undefined') return null;

    const configAddToCartBtn = {
        type: 'button'
    };

    const handleAddToCart = (meal) => {
        if (!meal) return;
        dispatch(
            addMeal(meal)
        );
        history.push('/cart')
    };

    return (
        <div className="meal">
            <div className="thumb">
                <img src={mealThumbnail} alt={mealName} />
            </div>

            <div className="details">
                <ul>
                    <li className="name">
                        <span>{mealName}</span>
                    </li>
                    <li className="restaurant">
                        <span>{restaurant}</span>
                    </li>
                    <li className="price">
                        <span>Rs. {mealPrice}</span>
                    </li>
                    <li>
                        <div className="addToCart">
                            <Button {...configAddToCartBtn} onClick={() => handleAddToCart(meal)}>
                                Add To Cart
                            </Button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};
export default Meal;

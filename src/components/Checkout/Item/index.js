import React from 'react';
import { useDispatch } from 'react-redux';
import { addMeal, reduceCartItem, removeCartItem } from './../../../redux/Cart/cart.actions';

const Item = (meal) => {
    const dispatch = useDispatch();
    const {
        restaurant,
        mealName,
        mealThumbnail,
        mealPrice,
        quantity,
        documentID
    } = meal;

    const handleRemoveCartItem = (documentID) => {
        dispatch(
            removeCartItem({
                documentID
            })
        )
    }

    const handleReduceItem=(meal)=>{
        dispatch(
            reduceCartItem(meal)
        )
    }

    const handleAddMeal = (meal)=>{
        dispatch(
            addMeal(meal)
        )
    }

    return (
        <table className="cartItem" border="0" cellSpacing="0" cellPadding="10">
            <tbody>
                <tr>
                    <td>
                        <img src={mealThumbnail} alt={mealName} />
                    </td>
                    <td>
                        {restaurant}
                    </td>
                    <td>
                        {mealName}
                    </td>
                    <td>
                        <span className="cartplusminus" 
                        onClick={()=>handleReduceItem(meal)}>
                            {`-`}
                        </span>
                        <span>
                            &nbsp;|&nbsp;&nbsp;{quantity}&nbsp;&nbsp;|&nbsp;
                        </span>
                        <span className="cartplusminus" 
                            onClick={()=>handleAddMeal(meal)}>
                            {`+`}
                        </span>
                    </td>
                    <td>
                        Rs. {mealPrice}
                    </td>
                    <td align="center">
                        <span className="cartBtn" onClick={() => handleRemoveCartItem(documentID)}>
                            delete
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default Item;
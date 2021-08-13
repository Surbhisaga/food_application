import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./User/user.reducer";
import mealsReducer from './Meals/meals.reducer';
import cartReducer from "./Cart/cart.reducer";
import restaurantsReducer from "./Restaurant/restaurants.reducer"

export const rootReducer = combineReducers({
    user: userReducer,
    mealsData: mealsReducer,
    cartData: cartReducer,
    restaurantsData:restaurantsReducer
});

const configStorage = {
    key: 'root',
    storage,
    whitelist: ['cartData']
};

export default persistReducer(configStorage, rootReducer);
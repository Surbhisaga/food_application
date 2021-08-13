import { auth } from "./../../firebase/utils";
import { takeLatest, put, all, call } from "redux-saga/effects";
import { handleAddRestaurant,handleDeleteRestaurant,handleFetchRestaurants } from "./restaurants.helper";
import { fetchRestaurantStart, setRestaurant } from './restaurants.actions'
import restaurantsTypes from './restaurants.types';

export function* addRestaurant({payload} ) {
    try {
        const timestamp = new Date();
        yield handleAddRestaurant({
            ...payload,
            restaurantID: auth.currentUser.uid,
            createData: timestamp
        });
        yield put(
            fetchRestaurantStart()
        );
    } catch (err) {
        // console.log(err)
    }
}

export function* onAddRestaurantStart() {
    yield takeLatest(restaurantsTypes.ADD_NEW_RESTAURANTS_START,addRestaurant)
}


export function* fetchRestaurants() {
    try {
        const restaurants = yield handleFetchRestaurants();
        yield put(
            setRestaurant(restaurants)
        );
    } catch (err) {
        // console.log(err)
    }
}

export function* onFetchRestaurantsStart() {
    yield takeLatest(restaurantsTypes.FETCH_RESTAURANTS_START, fetchRestaurants);
}

export function* deleteRestaurant({ payload }) {
    try {
        yield handleDeleteRestaurant(payload);
        yield put(
            fetchRestaurantStart()
        )
    } catch (err) {
        // console.log(err)
    }
}

export function* onDeleteRestaurantStart() {
    yield takeLatest(restaurantsTypes.DELETE_RESTAURANTS_START, deleteRestaurant)
}


export default function* RestaurantsSagas() {
    yield all([
        call(onAddRestaurantStart),
        call(onFetchRestaurantsStart),
        call(onDeleteRestaurantStart)
    ])
}
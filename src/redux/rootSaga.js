import { all, call } from 'redux-saga/effects';

import userSagas from './User/user.sagas';
import mealsSagas from './Meals/meals.sagas';
import RestaurantsSagas from './Restaurant/restaurants.sagas'

export default function* rootSaga() {
    yield all([
        call(userSagas),
        call(mealsSagas),
        call(RestaurantsSagas)
    ])
}
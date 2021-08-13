import { auth } from "./../../firebase/utils";
import { takeLatest, put, all, call } from "redux-saga/effects";
import { handleAddMeal, handleDeleteMeal, handleFetchMeals } from "./meals.helper";
import { fetchMealsStart, setMeals } from './meals.actions'
import mealsTypes from './meals.types';

export function* addMeal({ payload }) {
    try {
        const timestamp = new Date();
        yield handleAddMeal({
            ...payload,
            mealAdminUserUID: auth.currentUser.uid,
            createData: timestamp
        });
        yield put(
            fetchMealsStart()
        );
    } catch (err) {
        // console.log(err)
    }
}


export function* onAddMealStart() {
    yield takeLatest(mealsTypes.ADD_NEW_MEAL_START,addMeal)
}

export function* fetchMeals({payload:{
    filterType
}}) {
    try {
        const meals = yield handleFetchMeals({filterType});
        yield put(
            setMeals(meals)
        );
    } catch (err) {
        // console.log(err)
    }
}

export function* onFetchMealsStart() {
    yield takeLatest(mealsTypes.FETCH_MEAL_START, fetchMeals);
}

export function* deleteMeal({ payload }) {
    try {
        yield handleDeleteMeal(payload);
        yield put(
            fetchMealsStart()
        )
    } catch (err) {
        // console.log(err)
    }
}

export function* onDeleteMealStart() {
    yield takeLatest(mealsTypes.DELETE_MEAL_START, deleteMeal)
}

export default function* mealsSagas() {
    yield all([
        call(onAddMealStart),
        call(onFetchMealsStart),
        call(onDeleteMealStart)
    ])
}
import mealsTypes from './meals.types';

export const addMealsStart = mealData => ({
    type: mealsTypes.ADD_NEW_MEAL_START,
    payload: mealData
});

export const fetchMealsStart = (filters={}) => ({
    type: mealsTypes.FETCH_MEAL_START,
    payload:filters
});

export const setMeals = meals => ({
    type:mealsTypes.SET_MEALS,
    payload:meals
})

export const deleteMealStart = mealID =>({
    type:mealsTypes.DELETE_MEAL_START,
    payload:mealID
})
import restaurantsTypes from './restaurants.types'

export const addRestaurantStart = restaurantData =>({
    type:restaurantsTypes.ADD_NEW_RESTAURANTS_START,
    payload:restaurantData
});


export const fetchRestaurantStart = () => ({
    type: restaurantsTypes.FETCH_RESTAURANTS_START,
});

export const setRestaurant = restaurants => ({
    type:restaurantsTypes.SET_RESTAURANTS,
    payload:restaurants
})

export const deleteRestaurantStart = restaurantID =>({
    type:restaurantsTypes.DELETE_RESTAURANTS_START,
    payload:restaurantID
})
import restaurantsTypes from './restaurants.types';

const INITIAL_STATE = {
    restaurants: []
}

const restaurantsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case restaurantsTypes.SET_RESTAURANTS:
            return {
                ...state,
                meals: action.payload
            }
        default:
            return state;
    }
};

export default restaurantsReducer;
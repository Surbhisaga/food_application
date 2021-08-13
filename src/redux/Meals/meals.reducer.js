import mealsTypes from "./meals.types";

const INITIAL_STATE = {
    meals: []
}

const mealsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case mealsTypes.SET_MEALS:
            return {
                ...state,
                meals: action.payload
            }
        default:
            return state;
    }
};

export default mealsReducer;
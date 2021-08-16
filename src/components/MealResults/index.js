import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchMealsStart } from './../../redux/Meals/meals.actions';
import FormSelect from './../forms/FormSelect';
import Meal from './Meal'
import './styles.scss'
import {firestore} from './../../firebase/utils'

const mapState = ({ mealsData }) => ({
    meals: mealsData.meals
})

const MealResults = ({ }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { filterType } = useParams();
    const { meals } = useSelector(mapState);

    useEffect(() => {
        dispatch(
            fetchMealsStart({ filterType })
        );
    }, [filterType]);

    const handleFilter = (e) => {
        const nextFilter = e.target.value;
        history.push(`/search/${nextFilter}`);
    }

    if (!Array.isArray(meals)) return null;

    if (meals.length < 1) {
        return (
            <div className="meals">
                <p>
                    No Results Match
                </p>
            </div>
        );
    }

    const configFilters = {
        defaultValue: filterType,
        options: [{
            name: 'show all',
            value: ''
        }, {
            name: 'Dominos',
            value: 'dominos'
        }, {
            name: 'Boston',
            value: 'boston'
        }],
        handleChange: handleFilter
    };


    return (
        <div className="meals">

            <div>
                <h1>Search meals </h1>
                {/* <input type="text" id="answer" placeholder="Type here...."></input>
                <button>Go</button> */}
            </div>

            <FormSelect {...configFilters} />
            <div className="mealResult">
                {meals.map((meal, pos) => {
                    const { restaurant, mealName, mealThumbnail, mealPrice } = meal;

                    if (!mealThumbnail || !mealName ||
                        typeof mealPrice === 'undefined') return null;

                    const configMeal = {
                        ...meal
                    }

                    return (
                        <Meal key={pos} {...configMeal} />
                    );
                })}
            </div>
        </div>
    );
};
export default MealResults;
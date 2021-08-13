import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRestaurantStart, deleteRestaurantStart, fetchRestaurantStart } from './../../redux/Restaurant/restaurants.actions';
import Modal from './../../components/Modal';
import FormInput from './../../components/forms/FormInput';
import Button from './../../components/forms/Button';
import './styles.scss';

const mapState = ({ restaurantsData }) => ({
    restaurants: restaurantsData.restaurants
});

const Restaurant = props => {
    const { restaurants } = useSelector(mapState);
    const dispatch = useDispatch();
    const [hideModal, setHideModal] = useState(true);
    const [restaurantName, setRestaurantName] = useState('');
    const [restaurantAddress, setRestaurantAddress] = useState('');
    const [restaurantNumber, setRestaurantNumber] = useState('');

    // const { data, queryDoc, isLastPage } = meals;

    useEffect(() => {
        dispatch(
            fetchRestaurantStart()
        );
    }, []);

    const toggleModal = () => setHideModal(!hideModal);

    const configModal = {
        hideModal,
        toggleModal
    };

    const resetForm = () => {
        setHideModal(true);
        setRestaurantName('');
        setRestaurantAddress('');
        setRestaurantNumber('');
    };

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(
            addRestaurantStart({
                restaurantName,
                restaurantAddress,
                restaurantNumber,
            })
        );
        resetForm();
    };

    // const handleLoadMore = () => {
    //   dispatch(
    //     fetchMealsStart({
    //       startAfterDoc: queryDoc,
    //       persistMeals: data
    //     })
    //   );
    // };

    // const configLoadMore = {
    //   onLoadMoreEvt: handleLoadMore,
    // };

    return (
        <div className="admin">

            <div className="callToActions">
                <ul>
                    <li>
                        <Button onClick={() => toggleModal()}>
                            Add new restaurant
                        </Button>
                    </li>
                </ul>
            </div>

            <Modal {...configModal}>
                <div className="addNewProductForm">
                    <form onSubmit={handleSubmit}>

                        <h2>
                            Add new restaurant
                        </h2>


                        <FormInput
                            label="RestaurantName"
                            type="text"
                            value={restaurantName}
                            handleChange={e => setRestaurantName(e.target.value)}
                        />

                        <FormInput
                            label="RestaurantAddress"
                            type="text"
                            value={restaurantAddress}
                            handleChange={e => setRestaurantAddress(e.target.value)}
                        />

                        <FormInput
                            label="RestaurantNumber"
                            type="text"
                            value={restaurantNumber}
                            handleChange={e => setRestaurantNumber(e.target.value)}
                        />
                        <br />

                        <Button type="submit">
                            Add Restaurant
                        </Button>

                    </form>
                </div>
            </Modal>

            <div className="manageProducts">

                <table border="0" cellPadding="0" cellSpacing="0">
                    <tbody>
                        <tr>
                            <th>
                                <h1>
                                    Manage Restaurants
                                </h1>
                            </th>
                        </tr>
                        <tr>
                            <td>
                                <table className="results" border="0" cellPadding="10" cellSpacing="0">
                                    <tbody>
                                        {restaurants.map((restaurant, index) => {
                                            const {
                                                restaurantName,
                                                restaurantAddress,
                                                restaurantNumber,
                                                restaurantID
                                            } = restaurant;

                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        {restaurantName}
                                                    </td>
                                                    <td>
                                                        {restaurantAddress}
                                                    </td>
                                                    <td>
                                                        {restaurantNumber}
                                                    </td>
                                                    <td>
                                                        <Button onClick={() => dispatch(deleteRestaurantStart(restaurantID))}>
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>

                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default Restaurant;
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMealsStart, deleteMealStart, fetchMealsStart } from './../../redux/Meals/meals.actions';
import Modal from './../../components/Modal';
import FormInput from './../../components/forms/FormInput';
import FormSelect from './../../components/forms/FormSelect';
import Button from './../../components/forms/Button';
// import LoadMore from './../../components/LoadMore';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import './styles.scss';

const mapState = ({ mealsData }) => ({
  meals: mealsData.meals
});

const Admin = props => {
  const { meals } = useSelector(mapState);
  const dispatch = useDispatch();
  const [hideModal, setHideModal] = useState(true);
  const [restaurant, setRestaurant] = useState('dominos');
  const [mealName, setmealName] = useState('');
  const [mealThumbnail, setmealThumbnail] = useState('');
  const [mealPrice, setmealPrice] = useState(0);
  const [mealDesc, setmealDesc] = useState('');

  // const { data, queryDoc, isLastPage } = meals;

  useEffect(() => {
    dispatch(
      fetchMealsStart()
    );
  }, []);

  const toggleModal = () => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal,
  };

  const resetForm = () => {
    setHideModal(true);
    setRestaurant('dominos');
    setmealName('');
    setmealThumbnail('');
    setmealPrice(0);
    setmealDesc('');
  };

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(
      addMealsStart({
        restaurant,
        mealName,
        mealPrice,
        mealThumbnail,
        mealDesc
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

      <div className="callToActions" >
        <ul>
          <li>
            <Button onClick={() => toggleModal()}>
              Add new meal
            </Button>
          </li>
        </ul>
      </div>

      <Modal {...configModal}>
        <div className="addNewProductForm">
          <form onSubmit={handleSubmit}>

            <h2>
              Add new meal
            </h2>

            <FormSelect
              label="Restaurant"
              options={[{
                value: "dominos",
                name: "Dominos"
              }, {
                value: "boston",
                name: "Boston"
              }]}
              handleChange={e => setRestaurant(e.target.value)}
            />

            <FormInput
              label="Name"
              type="text"
              value={mealName}
              handleChange={e => setmealName(e.target.value)}
            />

            <FormInput
              label="image URL"
              type="url"
              value={mealThumbnail}
              handleChange={e => setmealThumbnail(e.target.value)}
            />

            <FormInput
              label="Price"
              type="number"
              min="0.00"
              max="10000.00"
              step="0.01"
              value={mealPrice}
              handleChange={e => setmealPrice(e.target.value)}
            />

            <CKEditor
              onChange={evt => setmealDesc(evt.editor.getData())}
            />

            <br />

            <Button type="submit">
              Add meal
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
                  Manage Products
                </h1>
              </th>
            </tr>
            <tr>
              <td>
                <table className="results" border="0" cellPadding="10" cellSpacing="0">
                  <tbody>
                    {meals.map((meal, index) => {
                      const {
                        restaurant,
                        mealName,
                        mealThumbnail,
                        mealPrice,
                        documentID
                      } = meal;

                      return (
                        <tr key={index}>
                          <td>
                            <img className="thumb" src={mealThumbnail} />
                          </td>
                          <td>
                            {restaurant}
                          </td>
                          <td>
                            {mealName}
                          </td>
                          <td>
                            Rs.{mealPrice}
                          </td>
                          <td>
                            <Button onClick={() => dispatch(deleteMealStart(documentID))}>
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
            {/* <tr>
              <td>
                <table border="0" cellPadding="10" cellSpacing="0">
                  <tbody>
                    <tr>
                      <td>
                        {!isLastPage && (
                          <LoadMore {...configLoadMore} />
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr> */}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default Admin;
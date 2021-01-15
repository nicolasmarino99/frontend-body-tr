/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import ClearIcon from '@material-ui/icons/Clear';
import { ItemCont, Paragraph } from './StyledComponents/Components';
import { ItemsContext } from './ContextProviders/ItemsProvider';
import {
  getElements, postElement, deleteElement, getImage,
} from './apiCalls';
import { UserContext } from './ContextProviders/UserProvider';
import SubmitForm from './SubmitForm';
import { CategoryContext } from './ContextProviders/CategoryProvider';
import './Category.scss';
import { ItemContext } from './ContextProviders/ItemProvide';

const Category = () => {
  const [category, setCategory] = useContext(CategoryContext);
  const [item, setItem] = useContext(ItemContext);
  const [ItemState, dispatch] = useContext(ItemsContext);
  const [showForm, setshowForm] = useState(false);
  const [user, setUser] = useContext(UserContext);

  const itemsUrl = `https://backend-body-tr.herokuapp.com/api/v1/users/${user.user.id}/categories/${category.id}/tasks/`;

  const getItems = getElements;
  const postItem = postElement;
  const deleteItem = deleteElement;

  useEffect(() => {
    getItems('SHOW_ITEMS', itemsUrl, dispatch);
  }, []);

  const handleClickSubmitForm = async (name) => {
    const img = (await getImage(name.name));
    postItem({ name: name.name, img }, 'ADD_ITEM', itemsUrl, dispatch);
  };

  // eslint-disable-next-line no-shadow
  const handleClickDeleteButton = (item) => {
    deleteItem('DEL_ITEM', itemsUrl + item.id, dispatch, item.id);
  };

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="Category">
      <div className="header">
        <img src={category.img} alt="img" />
        <h1>{category.name}</h1>
        <div className="img-cover">
          <Link to="/"><ClearIcon /></Link>
        </div>
      </div>
      <div className="details">
        <div className="social">
          <button className="follow" type="submit">
            Follow
            <AddIcon />
          </button>
          <div className="tags">
            <p>Fitness</p>
            <p>Cardio</p>
          </div>
        </div>
        <div className="members">
          <button />
          <button />
          <button />
          <button />
          <p>1320 members</p>
        </div>
        <div className="options">
          <button>Workouts</button>
          <button>Live Class</button>
          <button>Leaderboard</button>
        </div>
        <div className="items">
          {ItemState.items ? ItemState.items.map((item, i) => (
            <ItemCont img={item.img} num={i} onClick={() => (setItem(item))}>
              <Link className="item-link" to={`/category/${category.name}/${item.name}`}>
                <Paragraph>
                  <p className="time">8 minutes</p>
                  {item.name}
                  <p className="difficulty-tag">easy</p>
                </Paragraph>
              </Link>
              <button className="deleteButton" onClick={() => handleClickDeleteButton(item)}>
                <ClearIcon />
              </button>
            </ItemCont>
          )) : '' }
        </div>
      </div>
      <button className="add-category" onClick={() => setshowForm(true)}><AddIcon /></button>
      {showForm ? <SubmitForm setshowForm={setshowForm} handleClickSubmitForm={handleClickSubmitForm} name="item" object={{ name: '' }} /> : ''}
    </div>
  );
};

export default Category;

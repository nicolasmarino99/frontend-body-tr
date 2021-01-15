/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import './Categories.scss';
import { Link } from 'react-router-dom';
import { CategoriesContext } from './ContextProviders/CategoriesProvider';
import { Paragraph, CategoryCont } from './StyledComponents/Components';
import {
  getElements, postElement, deleteElement, getImage,
} from './apiCalls';
import { UserContext } from './ContextProviders/UserProvider';
import SubmitForm from './SubmitForm';
import { CategoryContext } from './ContextProviders/CategoryProvider';

const Categories = () => {
  const [user, setUser] = useContext(UserContext);
  const [category, setCategory] = useContext(CategoryContext);
  const [state, dispatch] = useContext(CategoriesContext);
  const [showForm, setshowForm] = useState(false);

  const categoriesUrl = `https://backend-body-tr.herokuapp.com/api/v1/users/${user.user.id}/categories/`;

  const getCategories = getElements;
  const postCategory = postElement;
  const deleteCategory = deleteElement;

  useEffect(() => {
    getCategories('SHOW_CATEGORIES', categoriesUrl, dispatch);
  }, []);

  const handleClickSubmitForm = async (name) => {
    const img = (await getImage(name.name));
    postCategory({ name: name.name, img }, 'ADD_CATEGORY', categoriesUrl, dispatch);
  };

  const handleClickDeleteButton = (category) => {
    deleteCategory('DEL_CATEGORY', categoriesUrl + category.id, dispatch, category.id);
  };

  return (
    <>
      <h2>Your categories</h2>
      <div className="categories">
        <div className="categories-container">
          {state.categories ? state.categories.map((category, i) => (
            <div onClick={() => (setCategory(category))}>
              <CategoryCont img={category.img} num={i + 1}>
                <Link to={`/category/${category.name}`}>
                  <Paragraph>{category.name}</Paragraph>
                </Link>
                <button onClick={() => handleClickDeleteButton(category)}>
                  <ClearIcon />
                </button>
              </CategoryCont>
            </div>
          )) : ''}
        </div>
      </div>
      <button className="add-category" onClick={() => setshowForm(true)}><AddIcon /></button>
      {showForm ? <SubmitForm setshowForm={setshowForm} handleClickSubmitForm={handleClickSubmitForm} name="category" object={{ name: '' }} /> : ''}
    </>
  );
};

export default Categories;

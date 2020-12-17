import React, { useContext, useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import './Categories.scss';
import './PopForm.scss';
import { CategoriesContext } from './ContextProviders/CategoriesProvider';
import { Redirect, useHistory, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { Paragraph, CategoryCont } from './StyledComponents/Components';
import { getCategories, postCategory, deleteCategories, getImage } from './apiCalls';
import { UserContext } from './ContextProviders/UserStore';
import PopForm from './PopForm';

const Categories = () => {

  const {path,url} = useRouteMatch();
  const [user, setUser] = useContext(UserContext);
  const [state, dispatch] = useContext(CategoriesContext);
  const [showForm, setshowForm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const categoriesUrl = `http://localhost:3001/api/v1/users/${user.id}/categorys`
  const categoryIDUrl = `http://localhost:3001/api/v1/users/${user.id}/categorys/${category.id}`
  
  useEffect(() => {
    getCategories("ADD_CATEGORY", categoriesUrl, dispatch)
  }, []);

  const handleClick = () => {
    setshowForm(true)
  }

  const handleClickForm = async name => {
    let category = {name, getImage(name)}
    postCategory(category, "ADD_CATEGORY", categoriesUrl, dispatch)
  }

    return (
      <>
        <h2>Your categories</h2>
        <div className="categories">
          <div className="categories-container">
              {state.categories ? state.categories.map((category, i) =>(
                <Link to={`/category/${category.name}`}>
                  <button onClick={deleteCategories("DEL_CATEGORY",categoryIDUrl, dispatch, category.id)}><ClearIcon /></button>
                  <CategoryCont img={category.img} num={i+1}>
                    <Paragraph>{category.name}</Paragraph>
                  </CategoryCont>
                </Link>
              )) : ''}
            </div>
        </div>
        <button className='add-category' onClick={handleClick}><AddIcon /></button>
        {showForm ? <PopForm setshowForm={setshowForm} handleClickForm={handleClickForm}/> : ''}
      </>
    );
}

export default Categories;

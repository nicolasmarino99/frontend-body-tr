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
import { getCategories, postCategory } from './apiCalls';
import { UserContext } from './ContextProviders/UserStore';
import PopForm from './PopForm';

const Categories = () => {

  const {path,url} = useRouteMatch();
  const [user, setUser] = useContext(UserContext);
  const [showForm, setshowForm] = useState(false);
  const [state, dispatch] = useContext(CategoriesContext);

  useEffect(() => {
    getCategories("ADD_CATEGORY", `http://localhost:3001/api/v1/users/${user.id}/categorys`, dispatch)
  }, []);

  const handleClick = () => {
    setshowForm(true)
  }

  const handleClickForm = async name => {
    const clientIDKey = '5phIk2Z31V96pArCaFDbgnDH0rG6gJZ7NMaCr4R3CEg';
    const ulr2 = `https://api.unsplash.com/search/photos/?client_id=${clientIDKey}&query=${name}`;
    const img = (await axios.get(ulr2)).data.results[0].urls.thumb;
    postCategory({name,img}, "ADD_CATEGORY", `http://localhost:3001/api/v1/users/${user.id}/categorys`, dispatch)
  }

    return (
      <>
        <h2>Your categories</h2>
        <div className="categories">
          <div className="categories-container">
              {state.categories ? state.categories.map((category, i) =>(
                <Link to={`/category/${category.name}`}>
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

import React, { useContext, useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
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
import DecideForm from './DecideForm';

const Categories = () => {

  const {path,url} = useRouteMatch();
  const [user, setUser] = useContext(UserContext);
  const [state, dispatch] = useContext(CategoriesContext);
  const [showForm, setshowForm] = useState(false);
  const [showDecideForm, setShowDecideForm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const categoriesUrl = `http://localhost:3001/api/v1/users/${user.id}/categorys/`

  useEffect(() => {
    getCategories("ADD_CATEGORY", categoriesUrl, dispatch)
  }, []);

  
  const handleClickSubmitForm = async name => {
    let img = (await getImage(name));
    postCategory({name, img}, "ADD_CATEGORY", categoriesUrl, dispatch)
  }

  const handleClickDecideForm = () => {
    setShowDecideForm(true)
    deleteCategories("DEL_CATEGORY",categoriesUrl+category.id, dispatch, category.id)
  }

    return (
      <>
        <h2>Your categories</h2>
        <div className="categories">
          <div className="categories-container">
              {state.categories ? state.categories.map((category, i) =>(
                <div>
                <Link to={`/category/${category.name}`}>
                  <CategoryCont img={category.img} num={i+1}>
                    <Paragraph>{category.name}</Paragraph>
                    <button onClick={() => setShowDecideForm(true) }>
                  <ClearIcon />
                </button>
                  </CategoryCont>
                </Link>
                </div>
              )) : ''}
            </div>
        </div>
        <button className='add-category' onClick={ () => setshowForm(true) }><AddIcon /></button>
        {showForm ? <PopForm setshowForm={setshowForm} handleClickSubmitForm={handleClickSubmitForm}/> : ''}
        {showDecideForm ? <DecideForm setShowDecideForm={setShowDecideForm} handleClickDecideForm={handleClickDecideForm}/> : ''}
      </>
    );
}

export default Categories;

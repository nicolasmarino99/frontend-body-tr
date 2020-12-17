import React, { useContext, useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import './Categories.scss';
import { CategoriesContext } from './ContextProviders/CategoriesProvider';
import { Link } from 'react-router-dom';
import { Paragraph, CategoryCont } from './StyledComponents/Components';
import { getElements, postElement, deleteElement, getImage } from './apiCalls';
import { UserContext } from './ContextProviders/UserStore';
import SubmitForm from './SubmitForm';

const Categories = () => {

  const [user, setUser] = useContext(UserContext);
  const [state, dispatch] = useContext(CategoriesContext);
  const [showForm, setshowForm] = useState(false);

  const categoriesUrl = `http://localhost:3001/api/v1/users/${user.id}/categorys/`

  const getCategories = getElements
  const postCategory = postElement
  const deleteCategories = deleteElement

  useEffect(() => {
    getCategories("ADD_CATEGORY", categoriesUrl, dispatch)
  }, []);

  const handleClickSubmitForm = async name => {
    let img = (await getImage(name));
    postCategory({name, img}, "ADD_CATEGORY", categoriesUrl, dispatch)
  }

    return (
      <>
        <h2>Your categories</h2>
        <div className="categories">
          <div className="categories-container">
              {state.categories ? state.categories.map((category, i) =>(
                <div>
                  <CategoryCont img={category.img} num={i+1}>
                    <Link to={`/category/${category.name}`}>
                      <Paragraph>{category.name}</Paragraph>
                    </Link>
                    <button onClick={() => deleteCategories("DEL_CATEGORY",categoriesUrl+category.id, dispatch, category.id) }>
                      <ClearIcon />
                    </button>
                  </CategoryCont>
                </div>
              )) : ''}
            </div>
        </div>
        <button className='add-category' onClick={ () => setshowForm(true) }><AddIcon /></button>
        {showForm ? <SubmitForm setshowForm={setshowForm} handleClickSubmitForm={handleClickSubmitForm}/> : ''}
      </>
    );
}

export default Categories;

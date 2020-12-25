import React, { useContext, useState, useEffect } from 'react';
import { ItemsContext } from './ContextProviders/ItemsProvider';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import { ItemCont, Paragraph } from './StyledComponents/Components';
import ClearIcon from '@material-ui/icons/Clear';
import { getElements, postElement, deleteElement, getImage } from './apiCalls';
import { UserContext } from './ContextProviders/UserProvider';
import SubmitForm from './SubmitForm';
import { CategoryContext } from './ContextProviders/CategoryProvider';
import './Category.scss'
import { ItemContext } from './ContextProviders/ItemProvide';


const Category = () => {
  const [category, setCategory] = useContext(CategoryContext)
  const [item, setItem] = useContext(ItemContext)
  const [ItemState, dispatch] = useContext(ItemsContext)
  const [showForm, setshowForm] = useState(false)
  const [user, setUser] = useContext(UserContext);

  const itemsUrl = `http://localhost:3001/api/v1/users/${user.id}/categories/${category.id}/tasks/`

  const getItems = getElements
  const postItem = postElement
  const deleteItem = deleteElement

  useEffect(() => {
    getItems("SHOW_ITEMS", itemsUrl, dispatch)
  }, []);

  const handleClickSubmitForm = async name => {
    let img = (await getImage(name.name));
    postItem({name: name.name, img}, "ADD_ITEM", itemsUrl, dispatch)
  }

  const handleClickDeleteButton = item => {
    deleteItem("DEL_ITEM",itemsUrl+item.id, dispatch, item.id)
  }

    return (
        <div className="Category">
          <div className="header">
            <img src={category.img}/>
            <h1>{category.name}</h1>
            <Link to='/'><ClearIcon /></Link>
          </div>
          <div className="details">
            <div className="social">
              <button className="follow">Follow <AddIcon /></button>
              <div className="tags">
                <p>Fitness</p>
                <p>Cardio</p>
              </div>
            </div>
            <div className="members">
                <button></button>
                <button></button>
                <button></button>
                <button></button>
                <p>1320 members</p>
              </div>
            <div className="options">
                <button>Workouts</button>
                <button>Live Class</button>
                <button>Leaderboard</button>
            </div>
              <div className="items">
              {ItemState.items ? ItemState.items.map((item, i) =>(
                  <ItemCont img={item.img} num={i} onClick={() => (setItem(item))}>
                    <Link to={`/category/${category.name}/${item.name}`}>
                      <Paragraph>
                      <p className="time">8 minutes</p>
                        {item.name}
                        <p className="difficulty-tag">easy</p>
                      </Paragraph>
                      </Link>
                        <button className="deleteButton" onClick={() => handleClickDeleteButton(item) }>
                          <ClearIcon />
                        </button>
                  </ItemCont>
                  )) : '' }
              </div>
            </div>
            <button className='add-category' onClick={() => setshowForm(true)}><AddIcon /></button>
            {showForm ? <SubmitForm setshowForm={setshowForm} handleClickSubmitForm={handleClickSubmitForm} name="item" object={{name: ''}}/> : ''}
        </div>
    );
}

export default Category;

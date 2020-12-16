import React, { useContext, useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import './Categories.scss';
import './PopForm.scss';
import { CategoriesContext } from './ContextProviders/CategoriesProvider';
import { Redirect, useHistory, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { Paragraph } from './StyledComponents/Components';
import { UserContext } from './ContextProviders/UserStore';

const Categories = () => {

  const {path,url} = useRouteMatch();
  const [user, setUser] = useContext(UserContext);
  const [showForm, setshowForm] = useState(false);
  const [state, dispatch] = useContext(CategoriesContext);

  useEffect(() => {
    getCategoriesRequest()
  }, [])``

  const getCategoriesRequest = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/v1/users/${user.id}/categorys`, 
        {withCredentials: true}
      );
      dispatch({
        type: "ADD_CATEGORY",
        payload: [...response.data]
      });

    } catch (err) {
        console.error(err);
    }
};

  const makeBig = x => {
    const bigOnes = new Array(50).fill(0);
    for (let i = 0; i < bigOnes.length; i++) {
      if (i % 2 === 1) {
          bigOnes[i] = bigOnes[i-1]+1
      } else {
        bigOnes[i] = i-1 === -1 ? 0 : bigOnes[i-1]+3
      }
    }
      bigOnes.map(x => x-1)
      return bigOnes.includes(x)
  }

    const CategoryCont = styled.div`
      background: url(${props => props.img});
      background-size: cover;
      font-family: 'Oswald', sans-serif;
      text-transform: uppercase;
      margin: 7px 0;
      letter-spacing: 1px;
      color: white;
      display: flex;
      font-weight: bold;
      align-items: center;
      justify-content: center;
      height: ${props => makeBig(props.num) || props.num === 0 ? 12 : 8}em;
      width: 8em;
      background-color: #59c584;
      border-radius: 10px;
      position: relative;
      top :${props =>  props.num >= 4 ? -64*(Math.floor(props.num/4)) : 0}px;
    `;

      const handleClick = () => {
        setshowForm(true)
      }

      const handleClickForm = async name => {
        const clientIDKey = '5phIk2Z31V96pArCaFDbgnDH0rG6gJZ7NMaCr4R3CEg';
        const ulr2 = `https://api.unsplash.com/search/photos/?client_id=${clientIDKey}&query=${name}`;
        const img = (await axios.get(ulr2)).data.results[0].urls.thumb;
        console.log(user.id, 'category user')
        postCategory({name,img})
    }

    const postCategory = async category => {
      try {
        console.log(user.id, 'category user')
          const response = await axios.post(`http://localhost:3001/api/v1/users/${user.id}/categorys`,
          category,
          {withCredentials: true});
          dispatch({
            type: "ADD_CONTACT",
            payload: [response.data]
          });
      } catch (err) {
          console.error(err);
      }
    }

    const PopForm = () => {
      const [category, setCategory] = useState('')

      const handleChange = e => {
        setCategory(e.target.value);
      }
      const onEnterPress = e => {
        e.preventDefault();
        handleClickForm(category)
        setshowForm(false)
      }
      return (
        <div className="Form" >
          <div className="Form-cover" onClick={() => setshowForm(false)}>
          </div>
          <form onSubmit={onEnterPress}>
            <h1>Add another category</h1>
            <input type="text" id="category-name" name="name" onChange={handleChange}/>
          </form>
      </div>
      )
    };

    return (
      <>
        <h2>Your categories</h2>
        <div className="categories">
          <div className="categories-container">
              {state.categories.map((category, i) =>(
                <Link to={`/category/${category.name}`}>
                  <CategoryCont img={category.img} num={i+1}>
                    <Paragraph>{category.name}</Paragraph>
                  </CategoryCont>
                </Link>
              ))}
            </div>
        </div>
        <button className='add-category' onClick={handleClick}><AddIcon /></button>
        {showForm ? <PopForm /> : ''}
      </>
    );
}

export default Categories;

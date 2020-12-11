import React, { useContext, useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import './Categories.scss';
import './PopForm.scss';
import { CategoriesContext } from './Store/CategoriesStore';
import { Redirect, useHistory, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { Paragraph } from './StyledComponents/Components';



const Categories = () => {
   const {path,url} = useRouteMatch()
   //console.log(url,'url', path,'path') 
  const [showForm, setshowForm] = useState(false)
   const [categories, setCategories] = useContext(CategoriesContext)
   //const [category, setCategory] = useContext(CategoryContext)
    

   
    
    
   const isBig = x =>{
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
        height: ${props => isBig(props.num) || props.num === 0 ? 12 : 8}em;
        width: 8em;
        background-color: #59c584;
        border-radius: 10px;
        position: relative;
        top :${props =>  props.num >= 4 ? -64*(Math.floor(props.num/4)) : 0}px;
    `;
    
   
    /*
      const getCategoriesRequests = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/v1/users/${id}/categorys`, 
            {withCredentials: true});
            if (response.data.status === 'created') {
              props.handleLogin(response.data)
              
              
            } else {
              setCredentials({...credentials, errors: response.data.errors})
            }
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
        
      }*/   
      const handleClick = () => {
        setshowForm(true)
      }
      const handleClickForm = async name => {
        const clientIDKey = '5phIk2Z31V96pArCaFDbgnDH0rG6gJZ7NMaCr4R3CEg';
        const ulr2 = `https://api.unsplash.com/search/photos/?client_id=${clientIDKey}&query=${name}`;
        const img = (await axios.get(ulr2)).data.results[0].urls.thumb;
        setCategories([...categories,{name, img}])
    }
    
    

    
    

    

    const PopForm = () => {
       
       const [category, setCategory] = useState('')
      
      const handleChange = e => {
        console.log(e, 'target', category)
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
    )};

    console.log(categories, 'asd')
    return (
      <>
        <h2>Your categories</h2>
        <div className="categories">
          <div className="categories-container">
              {categories.map((category, i) =>(
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

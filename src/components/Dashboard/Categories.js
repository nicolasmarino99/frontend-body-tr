import React, { useContext, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import './Categories.scss';
import './PopForm.scss';
import { CategoriesContext } from './Store/CategoriesStore';
import { Redirect, useHistory, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';



const Categories = () => {
   const {path,url} = useRouteMatch()
   //console.log(url,'url', path,'path') 

   const [categories, setCategories] = useContext(CategoriesContext)
   //const [category, setCategory] = useContext(CategoryContext)
    const [showForm, setshowForm] = useState(false)
    const [category, setCategory] = useState('')
    const CategoryCont = styled.div`
        background: url(${props => props.img});
        background-size: cover;
        margin: 7px 0;
        color: white;
        display: flex;
        font-weight: bold;
        align-items: center;
        justify-content: center;
        height: ${props => props.num % 3 === 0 ? 8 : 12}em;
        width: 8em;
        background-color: #59c584;
        border-radius: 10px;
    `;
    const Form = styled.div`
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
      const handleClickForm = async () => {
        const name = 'running'
        const clientIDKey = '5phIk2Z31V96pArCaFDbgnDH0rG6gJZ7NMaCr4R3CEg';
      const ulr2 = `https://api.unsplash.com/search/photos/?client_id=${clientIDKey}&query=${name}`;
      const img = (await axios.get(ulr2)).data.results[0].urls.thumb;
      setCategories([...categories,{name, img}])
    }
    
    const onEnterPress = (e) => {
      if(e.keyCode == 13 && e.shiftKey == false) {
        e.preventDefault();
        this.myFormRef.submit();
      }
    }

    const handleChange = event => {
      setCategory(event.target.value);
    }

    const PopForm = () => (
      <div className="Form">
      <div className="Form-cover" onClick={() => setshowForm(false)}>
        
      </div>
        <form onKeyDown={onEnterPress}>
        <h1>Add another category</h1>
        <input type="text" id="category-name" name="name"/>
      </form>
    </div>
    );
    
   
    console.log(categories, 'asd')
    return (
        <>
        <h2>Your categories</h2>
        <div className="categories">
        {categories.map((category, i) =>(
          <Link to={`/category/${category.name}`}>
            <CategoryCont img={category.img} num={i}>
              {category.name}
            </CategoryCont>
          </Link>
          ))}
                    
        </div>
        <button className='add-category' onClick={handleClick}><AddIcon /></button>
        {showForm ? <PopForm /> : ''}
        </>
    );
}

export default Categories;

import React, { useContext, useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import './Categories.scss';
import { Context } from './CategoryStore';


const Categories = () => {
   
    const [state, setState] = useContext(Context)
    
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
      const handleClick = async () =>{
        const name = 'running'
        const clientIDKey = '5phIk2Z31V96pArCaFDbgnDH0rG6gJZ7NMaCr4R3CEg';
      const ulr2 = `https://api.unsplash.com/search/photos/?client_id=${clientIDKey}&query=${name}`;
      const img = (await axios.get(ulr2)).data.results[0].urls.thumb;
      setState([...state,{name, img}])
    }
    return (
        <>
        <h2>Your categories</h2>
        <div className="categories">
        {state.map((cate, i) =>(
            <CategoryCont img={cate.img} num={i}>
              {cate.name}
            </CategoryCont>
          ))}
                    
        </div>
        <button className='add-category' onClick={handleClick}><AddIcon /></button>
        </>
    );
}

export default Categories;

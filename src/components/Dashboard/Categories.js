import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import './Categories.scss';


const Categories = () => {
    const [categories, setCategories] = useState([{name: 'abs'}, {name: 'boxing'}, {name: 'basketball'}, {name: 'soccer'}])

    const CategoryCont = styled.div`
        
        backgroundSize: cover;
        
        height: ${props => props.num % 2 === 0 ? 2 : 4}em;
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
      const searchPhoto = async (keyWord) => {
        try {
          const clientIDKey = '5phIk2Z31V96pArCaFDbgnDH0rG6gJZ7NMaCr4R3CEg';
          const ulr2 = `https://api.unsplash.com/search/photos/?client_id=${clientIDKey}&query=${keyWord}`;
          const data2 = await axios.get(ulr2);
          return data2.results[0].urls.thumb;

        } catch (error) {
          // eslint-disable-next-line no-alert
          alert(error);
        }
      };

    return (
        <>
        <h2>Your categories</h2>
        <div className="categories">
          
            {categories.map((cat, i) => (
                <CategoryCont num={i} >
                    {cat.name}
                </CategoryCont>
            ))}
            <button className='add-category'><AddIcon /></button>
        </div>
        </>
    );
}

export default Categories;

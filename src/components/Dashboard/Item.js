import React, { useContext, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { CategoriesContext } from './Store/CategoriesStore';
import { ItemsContext } from './Store/ItemsStore';
import AddIcon from '@material-ui/icons/Add';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const Item = () => {
    //const [categories, setCategories] = useContext(CategoriesContext)
    const [items, setItems] = useContext(ItemsContext)
    const chopUrl = str => {
        let vas = 0
        let i = 0
        str.split('')
        while (vas !== 3) {
         if (str[i] === '/') vas += 1 
         if (vas == 3) return str.slice(i+1, str.length)
         i++
        }
      
      }
    let item
    const {url} = useRouteMatch()
    const cleanUrl = chopUrl(url);
    item = items.filter(x => x.name === cleanUrl)[0]
    console.log(cleanUrl,'url') 
    //console.log(category)
    return (
        <div>
            <h1>{item.name}</h1>
            <img src={item.img}></img>
        </div>
    );
}

export default Item;

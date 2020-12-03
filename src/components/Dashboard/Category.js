import React, { useContext, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { CategoriesContext } from './Store/CategoriesStore';


const Category = () => {
    const [categories, setCategories] = useContext(CategoriesContext)
    let category
    const {url} = useRouteMatch()
    const cleanUrl = url.replace(/category/g, "").replace(/\//g, "");
    category = categories.filter(x => x.name === cleanUrl)[0]
    console.log(cleanUrl,'url') 
    console.log(category)
    return (
        <div>
            <img></img>
          
        </div>
    );
}

export default Category;

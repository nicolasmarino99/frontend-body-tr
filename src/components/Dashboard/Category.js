import React, { useContext, useState } from 'react';
import { CategoryContext } from './Store/CategoryStore';

const Category = ({}) => {
    
    const [category, setcategory] = useContext(CategoryContext)

    return (
        <div>
            {category.name}
        </div>
    );
}

export default Category;

import React, { createContext, useState } from 'react';

export const CategoryContext = createContext({});

const CategoryStore = ({children}) => {
    const [state, setstate] = useState(initialState)
    return <CategoryContext.Provider value={[state, setstate]}>
            {children}
            </CategoryContext.Provider>
}

export default CategoryStore;

import React, { createContext, useState } from 'react';

export const CategoryContext = createContext({});

const CategoryStore = ({children}) => {
    const [state, setstate] = useState(initialState)
    return <Context.Provider value={[state, setstate]}>
            {children}
            </Context.Provider>
}

export default CategoryStore;

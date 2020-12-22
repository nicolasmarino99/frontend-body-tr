import React, { createContext, useState } from 'react';

export const ItemContext = createContext();

const ItemProvider = ({children}) => {
    const [state, setstate] = useState({})
    return <ItemContext.Provider value={[state, setstate]}>
            {children}
            </ItemContext.Provider>
}

export default ItemProvider;

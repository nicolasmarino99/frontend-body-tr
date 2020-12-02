import React, { createContext, useState } from 'react';

export const UserContext = createContext({});

const UserStore = ({children}) => {
    const [state, setstate] = useState(initialState)
    return <Context.Provider value={[state, setstate]}>
            {children}
            </Context.Provider>
}

export default UserStore;

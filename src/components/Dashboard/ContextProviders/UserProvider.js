import React, { createContext, useState } from 'react';

export const UserContext = createContext({});

const UserProvider = ({children}) => {
    const [state, setstate] = useState({})
    return <UserContext.Provider value={[state, setstate]}>
            {children}
            </UserContext.Provider>
}

export default UserProvider;

/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';

export const ItemContext = createContext();

const ItemProvider = ({ children }) => {
  const [state, setstate] = useState({});
  return (
    <ItemContext.Provider value={[state, setstate]}>
      {children}
    </ItemContext.Provider>
  );
};

export default ItemProvider;

/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';

export const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [state, setstate] = useState({});
  return (
    <CategoryContext.Provider value={[state, setstate]}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;

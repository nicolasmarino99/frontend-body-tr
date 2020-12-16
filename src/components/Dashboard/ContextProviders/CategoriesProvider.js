import React, { createContext, useState } from 'react';

const initialState = [
];

const reducer = (state, action) => {
    console.log(action, action.type)
    switch (action.type) {
      case "ADD_CATEGORY":
          console.log(state, 'asssfsd')
        return {
          categories: [...state.categories, ...action.payload]
        };
      case "DEL_CONTACT":
        return {
         categories: state.contacts.filter(
            contact => contact.id !== action.payload
          )
        };
      case "START":
        return {
          loading: true
        };
      case "COMPLETE":
        return {
          loading: false
        };
      default:
        throw new Error();
    }
  };

export const CategoriesContext = createContext()

const CategoriesProvider = ({children}) => {
    const [state, dispatch] = useState(reducer,initialState)
    return (<CategoriesContext.Provider value={[state, dispatch]}>
            {children}
            </CategoriesContext.Provider>)
}

export default CategoriesProvider;

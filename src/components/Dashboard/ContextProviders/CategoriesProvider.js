import React, { createContext, useReducer } from 'react';

const initialState = {
    categories: [],
};

const reducer = (state = [{categories: []}], action) => {
    console.log(state.categories)
    switch (action.type) {
      case "ADD_CATEGORY":
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
    const [state, dispatch] = useReducer(reducer,initialState)
    return (<CategoriesContext.Provider value={[state, dispatch]}>
            {children}
            </CategoriesContext.Provider>)
}

export default CategoriesProvider;

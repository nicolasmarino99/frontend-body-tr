import React, { createContext, useReducer } from 'react';

const initialState = {
    categories: [],
};

const reducer = (state, action) => {

    switch (action.type) {
      case "SHOW_CATEGORIES":
        state.categories = [];
        let categories = [...state.categories, ...action.payload];
        categories = Array.from(new Set(categories.map(a => a.id)))
            .map(id =>  categories.find(a => a.id === id))
        return {
          categories: [...categories]
        };
      case "ADD_CATEGORY":
        return {
          categories: [...state.categories, ...action.payload]
        };
      case "DEL_CATEGORY":
        return {
         categories: state.categories.filter(
            category => category.id !== action.payload
          )
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

import React, { createContext, useReducer, useState } from 'react';


const initialState = {
  items: [],
};

const reducer = (state, action) => {

  switch (action.type) {
    case "ADD_ITEM":
      return {
        items: [...state.items, ...action.payload]
      };
    case "DEL_ITEM":
      return {
        items: state.items.filter(
          items => items.id !== action.payload
        )
      };
    default:
      throw new Error();
  }
};

export const ItemsContext = createContext()

const ItemsProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer,initialState)
    return <ItemsContext.Provider value={[state, dispatch]}>
            {children}
            </ItemsContext.Provider>
}

export default ItemsProvider;

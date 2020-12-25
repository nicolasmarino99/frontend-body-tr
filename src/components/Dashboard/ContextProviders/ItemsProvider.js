import React, { createContext, useReducer, useState } from 'react';


const initialItemsState = {
  items: [],
};

const reducer = (state, action) => {

  switch (action.type) {
    case "SHOW_ITEMS":
    state.items = [ ]
    let items = [...state.items, ...action.payload];
    items = Array.from(new Set(items.map(a => a.id)))
        .map(id =>  items.find(a => a.id === id))
    return {
      items: [...items]
    };

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
    const [state, dispatch] = useReducer(reducer,initialItemsState)
    return <ItemsContext.Provider value={[state, dispatch]}>
            {children}
            </ItemsContext.Provider>
}

export default ItemsProvider;

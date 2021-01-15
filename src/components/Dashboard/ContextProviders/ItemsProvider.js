/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React, { createContext, useReducer } from 'react';

const initialItemsState = {
  items: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_ITEMS':
      // eslint-disable-next-line no-param-reassign
      state.items = [];
      // eslint-disable-next-line no-case-declarations
      let items = [...state.items, ...action.payload];
      items = Array.from(new Set(items.map((a) => a.id)))
        .map((id) => items.find((a) => a.id === id));
      return {
        items: [...items],
      };

    case 'ADD_ITEM':
      return {
        items: [...state.items, ...action.payload],
      };
    case 'DEL_ITEM':
      return {
        items: state.items.filter(
          // eslint-disable-next-line no-shadow
          (items) => items.id !== action.payload,
        ),
      };
    default:
      throw new Error();
  }
};

export const ItemsContext = createContext();

const ItemsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialItemsState);
  return (
    <ItemsContext.Provider value={[state, dispatch]}>
      {children}
    </ItemsContext.Provider>
  );
};

export default ItemsProvider;

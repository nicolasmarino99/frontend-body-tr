import React, { createContext, useReducer, useState } from 'react';


const initialProgressItemsState = {
  progressItems: [],
};

const reducer = (state, action) => {
  console.log(action, state)
  switch (action.type) {
    case "SHOW_PROGRESS_ITEMS":
      state.progressItems = []
      let progressItems = [...state.progressItems, ...action.payload];
      progressItems = Array.from(new Set(progressItems.map(a => a.id)))
                      .map(id =>  progressItems.find(a => a.id === id))
                      console.log(progressItems)
      return {
        progressItems: [...progressItems]
      };
      case "ADD_PROGRESS_ITEMS":
        return {
          progressItems: [...state.progressItems, ...action.payload]
        };  

    case "SHOW_EXERCISE_ITEM":
      return {
        progressItems: [...state.progressItems, ...action.payload]
      };
      case "ADD_EXERCISE_ITEM":
        return {
          progressItems: [...state.progressItems, ...action.payload]
        };  

        case "DEL_EXERCISE_ITEMS":
      return {
        progressItems: state.progressItems.filter(
          items => items.id !== action.payload
        )
      };

    case "DEL_PROGRESS_ITEMS":
      return {
        progressItems: state.progressItems.filter(
          items => items.id !== action.payload
        )
      };
    default:
      throw new Error();
  }
};

export const ProgressItemsContext = createContext()

const ProgressItemsProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer,initialProgressItemsState)
    return <ProgressItemsContext.Provider value={[state, dispatch]}>
            {children}
            </ProgressItemsContext.Provider>
}

export default ProgressItemsProvider;

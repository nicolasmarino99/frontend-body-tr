import React, { createContext, useState } from 'react';
import axios from 'axios';

const initialState = [
    {name: 'abs'}, 
    {name: 'boxing'}, 
    {name: 'basketball'}, 
    {name: 'soccer'},
];

const getPhoto = async (keyWord,i) => {
        
    try {
      const clientIDKey = '5phIk2Z31V96pArCaFDbgnDH0rG6gJZ7NMaCr4R3CEg';
      const ulr2 = `https://api.unsplash.com/search/photos/?client_id=${clientIDKey}&query=${keyWord}`;
      initialState[i].img = (await axios.get(ulr2)).data.results[0].urls.thumb;
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error);
    }
    
  };
        
    try {
      const clientIDKey = '5phIk2Z31V96pArCaFDbgnDH0rG6gJZ7NMaCr4R3CEg';
      const ulr2 = `https://api.unsplash.com/search/photos/?client_id=${clientIDKey}&query=${keyWord}`;
      initialState[i].img = (await axios.get(ulr2)).data.results[0].urls.thumb;
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error);
    }
    
  };  

initialState.map((cat,i) => {(async () => await getPhoto(cat.name, i))()})
console.log(initialState,'initialState')
export const CategoriesContext = createContext()

const CategoriesStore = ({children}) => {
    const [state, setstate] = useState(initialState)
    return <Context.Provider value={[state, setstate]}>
            {children}
            </Context.Provider>
}

export default CategoriesStore;

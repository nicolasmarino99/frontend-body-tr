import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import CategoriesStore from './components/Dashboard/ContextProviders/CategoriesProvider';
import ItemsStore from './components/Dashboard/ContextProviders/ItemsProvider';
import UserStore from './components/Dashboard/ContextProviders/UserStore';

ReactDOM.render(
  <React.StrictMode>
    <UserStore>
    <CategoriesStore>
    <ItemsStore>
      <App />
    </ItemsStore>
    </CategoriesStore>
    </UserStore>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

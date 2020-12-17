import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import CategoriesProvider from './components/Dashboard/ContextProviders/CategoriesProvider';
import ItemsProvider from './components/Dashboard/ContextProviders/ItemsProvider';
import UserProvider from './components/Dashboard/ContextProviders/UserProvider';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <CategoriesProvider>
        <ItemsProvider>
          <App />
        </ItemsProvider>
      </CategoriesProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

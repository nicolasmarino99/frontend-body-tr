import React from 'react';
import {Link} from 'react-router-dom'
import CategoryStore from './Dashboard/Store/CategoriesStore';
import Dashboard from './Dashboard/Dashboard';
import Login from './Login';
import './ocean.scss';

const Home = ({user, isLoggedIn}) => (
     
    <div className="Home">
      {isLoggedIn ? 
        <CategoryStore>
          <Dashboard user={user}/>
        </CategoryStore>
         : <Login />}

      
    </div>
      
  );

export default Home;
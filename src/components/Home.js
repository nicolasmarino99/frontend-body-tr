import React from 'react';
import {Link} from 'react-router-dom'

import Dashboard from './Dashboard/Dashboard';
import Login from './Login';
import './ocean.scss';

const Home = ({user, isLoggedIn}) => (
  <div className="Home">
    {isLoggedIn ? <Dashboard user={user}/> : <Login />}
  </div>
);

export default Home;
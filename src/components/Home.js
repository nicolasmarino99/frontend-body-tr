import React from 'react';
import {Link} from 'react-router-dom'
import Dashboard from './Dashboard';
import HomeSign from './HomeSign';
const Home = ({user, isLoggedIn}) => (
     
    <div className="Home">
      {isLoggedIn ? <Dashboard user={user}/> : <HomeSign />}
      <div id="flow">
        <span className="flow-1"></span>
        <span className="flow-2"></span>
        <span className="flow-3"></span>
      </div>
    </div>
  );

export default Home;
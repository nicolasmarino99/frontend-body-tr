/* eslint-disable react/jsx-filename-extension */
import React, { useContext } from 'react';
import { UserContext } from './Dashboard/ContextProviders/UserProvider';
import Dashboard from './Dashboard/Dashboard';
import Login from './Login';
import './ocean.scss';

const Home = () => {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useContext(UserContext);
  return (
    <div className="Home">
      {user.logged_in ? <Dashboard user={user} /> : <Login />}
    </div>
  );
};

export default Home;

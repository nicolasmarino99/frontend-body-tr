import React, { useContext } from 'react';
import { UserContext } from './Dashboard/ContextProviders/UserProvider';
import Dashboard from './Dashboard/Dashboard';
import Login from './Login';
import './ocean.scss';

const Home = () => {
  const [user, setUser] = useContext(UserContext)
  console.log(user.logged_in, user)
  return (
  <div className="Home">
    {user.logged_in ? <Dashboard user={user}/> : <Login/>}
  </div>
)};

export default Home;
import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Login from './components/Login';
import Signup from './components/Signup';
import Logout from './components/Logout';
import Home from './components/Home';

const App = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})

  const handleLogin = data => { 
    setIsLoggedIn(true)
    setUser(data.data.user)
    console.log(data.user)
  }
  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser({})
  }
  useEffect(() => {
    sendGetRequest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const sendGetRequest = async () => {
    try {
        const response = await axios.get('http://localhost:3001/api/v1/logged_in', 
        {withCredentials: true});
        if (response.data.logged_in) {
          handleLogin(response)
          
          
        } else {
          handleLogout()
        }
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};
  console.log(user)
  return (
    <div>
        <BrowserRouter>
        <Switch>
          <Route path="/" exact >
            <Home user={user} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
          </Route>
          <Route path="/signup" exact >
            <Signup handleLogin={handleLogin}/>
          </Route>
          <Route path="/login" exact >
            <Login handleLogin={handleLogin}/>
          </Route>
    
          <Route path="/logout" exact >
              <Logout handleLogout={handleLogout}/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
  
};
export default App;
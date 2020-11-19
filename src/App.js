import React, { useState } from 'react';
import './App.css';
import axios from 'axios'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

const App = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})
 
  const handleLogin = data => {
    setIsLoggedIn(true)
    setUser(data.user)
  }
  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser({})
  }
  useEffect(() => (
    sendGetRequest()
  ), [0])
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
  
  return (
    <div>
        <BrowserRouter>
        <Switch>
          <Route exact path='/' component={}/>
          <Route exact path='api/v1/login' component={}/>
          <Route exact path='api/v1/signup' component={}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
  
};
export default App;
import React, { useContext, useEffect, useState } from 'react';
import './App.scss';
import axios from 'axios'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Login from './components/Login';
import Signup from './components/Signup';
import Logout from './components/Logout';
import Home from './components/Home';
import Dashboard from './components/Dashboard/Dashboard';
import { UserContext } from './components/Dashboard/ContextProviders/UserStore';

import Category from './components/Dashboard/Category';
import ItemsStore from './components/Dashboard/ContextProviders/ItemsProvider';
import Item from './components/Dashboard/Item';



const App = props => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useContext(UserContext)
  console.log(user)
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

  
  return (
    
    <div className="App">
      
        <BrowserRouter>
        <Switch>
          <Route path="/" exact >
            <Home isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
          </Route>
          <Route path="/signup" exact >
            <Signup handleLogin={handleLogin}/>
          </Route>
          <Route path='/category/:name' exact >
          
            <Category/>
          
          </Route>
          <Route path='/category/:name/:name' exact >
            
              <Item/>
            
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
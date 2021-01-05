import React, { useContext, useEffect, useState } from 'react';
import './App.scss';
import axios from 'axios'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Signup from './components/Signup';
import Logout from './components/Logout';
import Home from './components/Home';
import { UserContext } from './components/Dashboard/ContextProviders/UserProvider';
import Category from './components/Dashboard/Category';
import Item from './components/Dashboard/Item';



const App = props => {
  const [user, setUser] = useContext(UserContext)

  useEffect(() => {
    sendGetRequest()
  }, [])
  const sendGetRequest = async () => {
    try {
        const response = await axios.get('https://backend-body-tr.herokuapp.com/api/v1/logged_in', 
        {withCredentials: true});
        if (response.data.logged_in) {
          console.log(response)
          setUser(response.data)
        } else {
          setUser({})
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
            <Home/>
          </Route>
          <Route path="/signup" exact >
            <Signup/>
          </Route>
          <Route path='/category/:name' exact >
            <Category/>
          </Route>
          <Route path='/category/:name/:name' exact >
              <Item/>
          </Route>
          <Route path="/logout" exact >
              <Logout/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};
export default App;
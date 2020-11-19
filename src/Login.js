import React, { useState } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
const Login = props => {
  const [credentials, setCredentials] = useState({ 
    username: '',
    email: '',
    password: '',
    errors: ''
   }) 
   const {username, email, password} = credentials

   const handleChange = event => {
    const {name, value} = event.target
    setCredentials({[name]: value})
  };
  
    const handleSubmit = event => {
        event.preventDefault()
    };

return ( 
    
      <div>
        <h1>Log In</h1>        
          <form onSubmit={handleSubmit}>
            <input
              placeholder="username"
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
            />
          <input
            placeholder="email"
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />         
        <button placeholder="submit" type="submit">
            Log In
          </button>          
          <div>
            or <Link to='/signup'>sign up</Link>
          </div>
          
         </form>
      </div>
    );
  }
}
export default Login;
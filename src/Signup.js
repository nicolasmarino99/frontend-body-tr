import React, { useState } from 'react';
import axios from 'axios'

const Signup = props => {
    const [credentials, setCredentials] = useState({ 
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        errors: ''
     }) 
     const {username, email, password, password_confirmation} = credentials
  
     const handleChange = event => {
      const {name, value} = event.target
      setCredentials({[name]: value})
    };
    
      const handleSubmit = event => {
          event.preventDefault()
      };
  
  return ( 
      
    <div>
    <h1>Sign Up</h1>        
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
      <input
        placeholder="password confirmation"
        type="password"
        name="password_confirmation"
        value={password_confirmation}
        onChange={handleChange}
      />
    
      <button placeholder="submit" type="submit">
        Sign Up
      </button>
  
    </form>
  </div>
      );
    }
  }
  export default Signup;
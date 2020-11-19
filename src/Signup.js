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
          const {username, email, password, password_confirmation} = credentials
          let user = {
            username: username,
            email: email,
            password: password,
            password_confirmation: password_confirmation
          }
          sendPostRequest(user)
        };
        const sendPostRequest = async () => {
            try {
                const response = await axios.post('http://localhost:3001/api/v1/users',
                {user}, 
                {withCredentials: true});
                if (response.data.status === 'created') {
                  props.handleLogin(response.data)
                  redirect()
                } else {
                  setCredentials({errors: response.data.errors})
                }
            } catch (err) {
                // Handle Error Here
                console.error(err);
          }        
          const redirect = () => {
            props.history.push('/')
          }
          handleErrors = () => (
            <div>
              <ul>
                {credentials.errors.map(error => <li key={error}>{error}</li>)}
              </ul>
            </div>
          )
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
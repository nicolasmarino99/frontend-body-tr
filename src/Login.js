import React, { useState } from 'react';
import axios from 'axios'
import {Link, useHistory} from 'react-router-dom'

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

    setCredentials({...credentials, [name]: value})
  };

    const handleSubmit = event => {
        event.preventDefault()
        const {username, email, password} = credentials
        let user = {
          username: username,
          email: email,
          password: password
        }
        console.log(user)
        sendPostRequest(user)
    };
    let history = useHistory()
    const redirect = () => {
      history.push('/')
    }

    const sendPostRequest = async (user) => {
      try {
          const response = await axios.post('http://localhost:3001/api/v1/login',
          {user}, 
          {withCredentials: true});
          if (response.data.logged_in) {
            props.handleLogin(response.data)
            console.log(response)
            redirect()
          } else {
            setCredentials({errors: response.data.errors})
          }
      } catch (err) {
          // Handle Error Here
          console.error(err);
      }
    }
      
      const handleErrors = () => (
          <div>
            <ul>
              {credentials.errors.map(error => <li key={error}>{error}</li>)}
            </ul>
          </div>
        )
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
};
export default Login;
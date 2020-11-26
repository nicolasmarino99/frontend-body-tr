import React, { useState } from 'react';
import axios from 'axios'
import {Link, useHistory} from 'react-router-dom'

const Login = props => {
  const [credentials, setCredentials] = useState({ 
    name: '',
    password: '',
    errors: ''
   }) 
   const {name, password} = credentials

   const handleChange = event => {
    const {name, value} = event.target

    setCredentials({...credentials, [name]: value})
  };
  let history = useHistory()
    const handleSubmit = event => {
        event.preventDefault()
        const {name, password} = credentials
        let user = {
          name: name,
          password: password
        }
        console.log(user)
        sendPostRequest(user)
        history.push('/')
    };
    
    

    const sendPostRequest = async (user) => {
      try {
          const response = await axios.post('http://localhost:3001/api/v1/login',
          {user}, 
          {withCredentials: true});
          if (response.data.logged_in) {
            props.handleLogin(response.data)
            console.log(response)
            
          } else {
            setCredentials({...credentials ,errors: response.data.errors})
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
              placeholder="name"
              type="text"
              name="name"
              value={name}
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
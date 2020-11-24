import React, { useState } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router';

const Signup = props => {
    const [credentials, setCredentials] = useState({ 
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        weight: '', 
        height: '',
        errors: ''
     }) 
     const {name, email, password, password_confirmation, weight, height} = credentials
  
     const handleChange = event => {
      const {name, value} = event.target
      setCredentials({...credentials, [name]: value})
     
    };
    let history = useHistory();
    
      const handleSubmit = event => {
          event.preventDefault()
          const {name, email, password, password_confirmation, weight, height} = credentials
          let user = {
            name: name,
            email: email,
            password: password,
            password_confirmation: password_confirmation,
            weight: weight,
            height: height,
          }
          console.log(credentials)
          sendPostRequest(user)
        };
        const sendPostRequest = async (user) => {
            try {
                const response = await axios.post('http://localhost:3001/api/v1/users',
                {user}, 
                {withCredentials: true});
                if (response.data.status === 'created') {
                  props.handleLogin(response.data)
                  handleClick()
                } else {
                  setCredentials({...credentials, errors: response.data.errors})
                }
            } catch (err) {
                // Handle Error Here
                console.error(err);
            }
          }        
          const handleClick = () => {
            
            history.push('/')
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
      
    <h1>Sign Up</h1>        
    <form onSubmit={handleSubmit}>
      <input
        placeholder="name"
        type="text"
        name="name"
        value={name}
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
      <input
        placeholder="weight"
        type="number"
        name="weight"
        value={weight}
        onChange={handleChange}
      />
      <input
        placeholder="height"  
        type="number"
        name="height"
        value={height}
        onChange={handleChange}
      />
    
      <button placeholder="submit" type="submit" >
        Sign Up
      </button>
  
    </form>
    
  </div>
      );
    
  };
  export default Signup;
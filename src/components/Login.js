import React, { useState } from 'react';
import axios from 'axios'
import {Link, useHistory} from 'react-router-dom'
import { Form,Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.scss';
import './ocean.scss';

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
      <>
      <nav>
        <h1>Log In</h1> 
      </nav>
      
               
          <div className='Login'>
         <Form onSubmit={handleSubmit}>
         
          <Form.Group controlId="formBasicEmail">
            <Form.Label>UserName</Form.Label>
            <Form.Control 
            placeholder="name"
            type="text"
            name="name"
            value={name}
            onChange={handleChange} 
            />
            
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              placeholder="password"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </Form.Group>
          
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
          Log In
          </Button>
          <Form.Text className="text-muted">
              or <Link to='/signup'>sign up</Link>
            </Form.Text>
        </Form>
        </div>
        <div className="ocean">
        <div className="wave"></div> 
        <div className="wave"></div>
      </div>
    
      </>
  );
};
export default Login;
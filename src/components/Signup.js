import React, { useState } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router';
import { Form,Button,Row,Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ocean.scss';
import './Login.scss';

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
          
           history.push('/')
        };
        const sendPostRequest = async (user) => {
            try {
                const response = await axios.post('http://localhost:3001/api/v1/users',
                {user}, 
                {withCredentials: true});
                if (response.data.status === 'created') {
                  props.handleLogin(response.data)
                  
                  
                } else {
                  setCredentials({...credentials, errors: response.data.errors})
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
        <h1>Sign Up</h1>
      </nav>

    <div className='Signup'>
      
            
    

      <Form onSubmit={handleSubmit}>
      <Row>
          <Col>
          <Form.Group controlId="formBasicEmail" >
            <Form.Label>Username</Form.Label>
            <Form.Control 
            placeholder="name"
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            />
            
            
          </Form.Group>
          </Col>
          <Col>
          <Form.Group controlId="formBasicEmail" onSubmit={handleSubmit}>
            <Form.Label>Email</Form.Label>
            <Form.Control 
            placeholder="email"
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
            />
            
          </Form.Group>
          </Col>
          </Row>

          <Row>
          <Col>

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
          </Col>
          </Row>
          <Row>
          <Col>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password confirmation</Form.Label>
            <Form.Control 
              placeholder="Password confirmation"
              type="password"
              name="Password confirmation"
              value={password_confirmation}
              onChange={handleChange}
            />
          </Form.Group>
          </Col>
          </Row>
          <Row>
          <Col>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Height</Form.Label>
            <Form.Control 
              placeholder="height"  
              type="number"
              name="height"
              value={height}
              onChange={handleChange}
            />
          </Form.Group>
          </Col>
          <Col>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Weight</Form.Label>
            <Form.Control 
              placeholder="height"  
              type="number"
              name="Weight"
              value={weight}
              onChange={handleChange}
            />
          </Form.Group>
          </Col>
          </Row>
          <Button variant="primary" type="submit">
          Signup
          </Button>
          
        </Form>
    
  
      </div>

      <div className="ocean">
        <div className="wave"></div> 
        <div className="wave"></div>
      </div>

    </>
    
    );
    
  };
  export default Signup;
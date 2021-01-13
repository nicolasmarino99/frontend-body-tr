import React, { useContext, useState } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router';
import { Form,Button,Row,Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ocean.scss';
import './Login.scss';
import { UserContext } from './Dashboard/ContextProviders/UserProvider';

const Signup = props => {
  const [user, setUser] = useContext(UserContext)
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    errors: []
  })

  const handleChange = event => {
    const {name, value} = event.target
    credentials.name = value
    setCredentials({...credentials, [name]: value})
  };

  let history = useHistory();

  const handleSubmit = event => {
    event.preventDefault()
    const {name, email, password, password_confirmation} = credentials
    let user = {
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    }
    let loginUser = {
      name: name,
      password: password,
    }
    console.log(user, password_confirmation, name)
    sendPostRequest(user)
    logginUserRequest(loginUser)
    history.push('/')
  };
  const logginUserRequest = async user => {
    try {
        const response = await axios.post('https://backend-body-tr.herokuapp.com/api/v1/login/',
        {user},
        {withCredentials: true});
        if (response.data.logged_in) {
          console.log(response.data)
          setUser(response.data)
          history.push('/')
        } else {
          setCredentials({...credentials ,errors: response.data.errors})
        }
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
  }

  const sendPostRequest = async (user) => {
    try {
        const response = await axios.post('https://backend-body-tr.herokuapp.com/api/v1/users',
        {user}, 
        {withCredentials: true});
        if (response.data.status === 'created') {
          console.log(response.data)
          setUser(response.data)
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
          <Form.Group controlId="formBasicUsername" >
            <Form.Label>Username</Form.Label>
            <Form.Control 
            placeholder="name"
            type="text"
            name="name"
            
            onChange={handleChange}
            />
            
            
          </Form.Group>
          </Col>
          <Col>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control 
            placeholder="email"
            type="text"
            name="email"
           
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
            
              onChange={handleChange}
            />
            
          </Form.Group>
          </Col>
          </Row>
          <Row>
          <Col>
          <Form.Group controlId="formBasicPasswordconfirmation">
            <Form.Label>Password confirmation</Form.Label>
            <Form.Control 
              placeholder="password_confirmation"
              type="password"
              name="password_confirmation"
              
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
      <div>
              <ul>
                {credentials.errors.map(error => <li key={error}>{error}</li>)}
              </ul>
            </div>
      <div className="ocean">
        <div className="wave"></div> 
        <div className="wave"></div>
      </div>

    </>
    
    );
    
  };
  export default Signup;
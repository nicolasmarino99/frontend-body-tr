/* eslint-disable no-shadow */
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.scss';
import './ocean.scss';
import { UserContext } from './Dashboard/ContextProviders/UserProvider';

const Login = () => {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useContext(UserContext);

  const [credentials, setCredentials] = useState({
    name: '',
    password: '',
    errors: '',
  });

  const { name, password } = credentials;

  const handleChange = (event) => {
    // eslint-disable-next-line no-shadow
    const { name, value } = event.target;

    setCredentials({ ...credentials, [name]: value });
  };
  const history = useHistory();
  const logginUserRequest = async (user) => {
    try {
      const response = await axios.post('https://backend-body-tr.herokuapp.com/api/v1/login/',
        { user },
        { withCredentials: true });
      if (response.data.logged_in) {
        setUser(response.data);
        history.push('/');
      } else {
        setCredentials({ ...credentials, errors: response.data.errors });
      }
    } catch (err) {
      // Handle Error Here
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, password } = credentials;
    const user = {
      name,
      password,
    };
    logginUserRequest(user);
  };

  // eslint-disable-next-line no-unused-vars
  const handleErrors = () => (
    // eslint-disable-next-line react/jsx-filename-extension
    <div>
      <ul>
        {credentials.errors.map((error) => <li key={error}>{error}</li>)}
      </ul>
    </div>
  );

  return (
    <>
      <nav>
        <h1>Log In</h1>
      </nav>

      <div className="Login">
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
            or
            {' '}
            <Link to="/signup">sign up</Link>
          </Form.Text>
        </Form>
      </div>
      <div className="ocean">
        <div className="wave" />
        <div className="wave" />
      </div>

    </>
  );
};
export default Login;

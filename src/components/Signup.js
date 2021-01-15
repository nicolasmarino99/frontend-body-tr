/* eslint-disable camelcase */
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import {
  Form, Button, Row, Col,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ocean.scss';
import './Login.scss';
import { UserContext } from './Dashboard/ContextProviders/UserProvider';

const Signup = () => {
  const [user, setUser] = useContext(UserContext);
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    errors: [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const history = useHistory();

  const logginUserRequest = async (logginUser) => {
    try {
      const response = await axios.post('https://backend-body-tr.herokuapp.com/api/v1/login/',
        { logginUser },
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

  const sendPostRequest = async () => {
    try {
      const response = await axios.post('https://backend-body-tr.herokuapp.com/api/v1/users',
        { user },
        { withCredentials: true });
      if (response.data.status === 'created') {
        setUser(response.data);
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
    const {
      name, email, password, password_confirmation,
    } = credentials;
    setUser({
      name,
      email,
      password,
      password_confirmation,
    });
    const loginUser = {
      name,
      password,
    };
    sendPostRequest();
    logginUserRequest(loginUser);
    history.push('/');
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
        <h1>Sign Up</h1>
      </nav>

      <div className="Signup">

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group controlId="formBasicUsername">
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
          {credentials.errors.map((error) => <li key={error}>{error}</li>)}
        </ul>
      </div>
      <div className="ocean">
        <div className="wave" />
        <div className="wave" />
      </div>

    </>

  );
};
export default Signup;

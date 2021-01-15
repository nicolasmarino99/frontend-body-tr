import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { UserContext } from './Dashboard/ContextProviders/UserProvider';

const Logout = () => {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useContext(UserContext);
  const history = useHistory();
  history.push('/');

  const sendPostRequest = async () => {
    try {
      const response = await axios.post('https://backend-body-tr.herokuapp.com/api/v1/logout',
        { withCredentials: true });
      if (response.data.logged_in) {
        document.cookie = '_session_id= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
        localStorage.removeItem('_session_id');
        history.push('/');
      }
    } catch (err) {
      // Handle Error Here
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  useEffect(() => {
    setUser({});
    sendPostRequest();
  }, [0]);

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div>
      logged out succesfully
    </div>
  );
};

export default Logout;

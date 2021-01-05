import axios from 'axios'
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { UserContext } from './Dashboard/ContextProviders/UserProvider';

const Logout = () => {
    const [user, setUser] = useContext(UserContext)
    let history = useHistory()
    history.push('/')
    useEffect(() => {
        setUser({})
        sendPostRequest()
      }, [0])
      
    const sendPostRequest = async () => {
        try {
            const response = await axios.post('https://backend-body-tr.herokuapp.com/api/v1/logout', 
            {withCredentials: true});
            if (response.data.logged_in) {
              document.cookie = "_session_id= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
              localStorage.removeItem('_session_id')
              history.push('/')
              console.log(response)   
            } 
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    }

    return (
        <div>
            logged out succesfully
        </div>
    );
}

export default Logout;

import axios from 'axios'
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

const Logout = ({handleLogout}) => {
    let history = useHistory()
    history.push('/')
    useEffect(() => {
        handleLogout()
        sendPostRequest()
      }, [0])
      
    const sendPostRequest = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/v1/logout', 
            {withCredentials: true});
            if (response.data.logged_in) {
              
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

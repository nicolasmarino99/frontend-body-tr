import React from 'react';
import {Link} from 'react-router-dom'

const HomeSign = ({user}) => {
    return (
        <div>
            <Link to='/logout'>Logout</Link>
             <h1>Hello {user.name}</h1>

             
      </div>
    );
}

export default HomeSign;

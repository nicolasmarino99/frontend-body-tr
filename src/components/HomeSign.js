import React from 'react';
import {Link} from 'react-router-dom'

const HomeSign = () => {
    return (
        <div className="HomeSign">
            
            <Link to='/login'>Log In</Link>
            <Link to='/signup'>Sign Up</Link>
             
      </div>
    );
}

export default HomeSign;

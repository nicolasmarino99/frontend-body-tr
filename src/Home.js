import React from 'react';
import {Link} from 'react-router-dom'
const Home = ({user, isLoggedIn}) => {

  console.log(user, isLoggedIn)

  return (
     
    <div>
      {isLoggedIn ? 
      <div>
        <Link to='/logout'>Logout</Link>
        <h1>Hello {user.name}</h1>
      </div>
      : 
      <div>
       <Link to='/login'>Log In</Link>
       <br></br>
       <Link to='/signup'>Sign Up</Link>

       
      </div>}

      
    </div>
  );
};
export default Home;
import React from 'react';
import {Link} from 'react-router-dom'
const Home = () => {
  return (
    <div>
      <Link to='api/v1/login'>Log In</Link>
      <br></br>
      <Link to='api/v1/signup'>Sign Up</Link>
    </div>
  );
};
export default Home;
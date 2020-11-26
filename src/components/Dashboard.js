import React from 'react';
import {Link} from 'react-router-dom'

const Dashboard = ({user}) => {
    return (
        <div>
            <Link to='/logout'>Logout</Link>
             <h1>Hello {user.name}</h1>
        </div>
    );
}

export default Dashboard;

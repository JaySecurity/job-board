import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className='nav-container'>
      <img src='../../images/logo.png' alt='logo' />
      <ul>
        <Link to='/'>
          <li>Job Board</li>
        </Link>
        <li>Profile</li>
        <li>Logout</li>
      </ul>
    </div>
  );
};

export default Nav;

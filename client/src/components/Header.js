import React from 'react'
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';


import User from '../contexts/user';

export default function Header() {
  const user = useContext(User);
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();


  const handleLogout = () => {
    user.updateUser(false);
    localStorage.removeItem('token');   
    handleGoHome(); 
  }

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className='header'>
        {user.signedIn &&
          <span className='logout'>
            <a onClick={handleLogout}>Logout</a>
        </span>
        }
    </div>
  )
}

import React from 'react'
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import ThemeToggle from "./ThemeToggle";
import User from '../contexts/user';
import store from "../store";
import * as identificacionActions from "../actions/identificacion";

export default function Header() {
  const user = useContext(User);

  const navigate = useNavigate();

  const handleLogout = () => {
    user.updateUser(false);
    localStorage.removeItem('token');
    store.dispatch(identificacionActions.updateToken(null));
    handleGoHome(); 
  }

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <>
      <div className='header'>
        {user.signedIn &&
          <span className='logout'>
            <a onClick={handleLogout}>Logout</a>
          </span>}
      </div>
      <ThemeToggle />
    </>
  )
}

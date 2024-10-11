// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import "./allPages.css"
import Axios from 'axios';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import { useNavigate } from "react-router-dom";

import { Typography } from '@material-ui/core';


const Navbar = () => {

    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/login');
        alert("You are logged out!")
        // Clear the token from localStorage
      localStorage.removeItem('authToken');
      }

      const logoutStyle = {
        color: 'red',
        cursor: 'pointer',
      }
  
   

    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/news-details">Detail News</Link></li>
                <li><Link to="/gallery">Gallery</Link></li>
                <LogoutIcon  onClick={ handleLogout} style={logoutStyle} />           
               </ul>
        </nav>
    );
};

export default Navbar;

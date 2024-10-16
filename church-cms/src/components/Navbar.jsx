

import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./allPages.css";
import LogoutIcon from '@material-ui/icons/ExitToApp';
import { useNavigate } from "react-router-dom";
import { Typography } from '@material-ui/core';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        navigate('/login');
        alert("See you later!");
        localStorage.removeItem('authToken');
    };

    const logoutStyle = {
        color: 'red',
        cursor: 'pointer',
    };

    const [greeting, setGreeting] = useState('');
  
    useEffect(() => {
      const updateGreeting = () => {
        const date = new Date();
        const hours = date.getHours();
  
        let newGreeting;
        if (hours < 12) {
          newGreeting = 'Good Morning Admin!';
        } else if (hours >= 12 && hours < 17) {
          newGreeting = 'Good Afternoon Admin!';
        } else {
          newGreeting = 'Good Evening Admin!';
        }
        setGreeting(newGreeting);
      };
  
      updateGreeting();
  
    }, []);

    return (
      <div className="All">
        <nav className="navbar">

            <ul className="navbar-list">
                <li>
                    <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/news-details" className={location.pathname === '/news-details' ? 'active' : ''}>
                        Detail News
                    </Link>
                </li>
                <li>
                    <Link to="/gallery" className={location.pathname === '/gallery' ? 'active' : ''}>
                        Gallery
                    </Link>
                </li>
                <LogoutIcon onClick={handleLogout} style={logoutStyle} />
            </ul>
        </nav>
        <Typography variant="h4" style={{fontFamily: "arial", marginTop: "10px" }}>{greeting}</Typography>

      </div> 
    );
};

export default Navbar;

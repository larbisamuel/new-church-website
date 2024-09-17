// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import "./allPages.css"

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about-us">About Us</Link></li>
                <li><Link to="/news">News</Link></li>
                <li><Link to="/gallery">Gallery</Link></li>
                <li><Link to="/ministries">Ministries</Link></li>
                <li><Link to="/contact-us">Contact Us</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;

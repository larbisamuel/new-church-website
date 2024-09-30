// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import "./allPages.css"
import Axios from 'axios';


const Navbar = () => {

    // const handlePublish = async () => {
    //     try {
    //         const response = await Axios.post('http://localhost:3000/api/publish');
    //         if (response.status === 200) {
    //             alert('Website content published successfully');
    //         }
    //     } catch (error) {
    //         console.error('Error publishing content:', error);
    //         alert('Failed to publish content');
    //     }
    // };

    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about-us">About Us</Link></li>
                <li><Link to="/news-details">Detail News</Link></li>
                <li><Link to="/gallery">Gallery</Link></li>
                {/* <li><Link to="/ministries">Ministries</Link></li> */}
                {/* <li><Link to="/contact-us">Contact Us</Link></li> */}
                <button>Publish</button>
            </ul>
        </nav>
    );
};

export default Navbar;

// src/pages/ContactUs.js
import React from 'react';
import "./allPages.css"
import Modal from '../components/Modal';

const ContactUs = () => {
    return (
        <div className="contact-us-page">
            <h1>Contact Us</h1>
            <button className="add-button">Add New</button>
            <div className="contact-info">
                <p>Email: example@church.com</p>
                <p>Phone: +123 456 789</p>
                <p>Address: 123 Church Street</p>
                <button>Edit</button>
            </div>
        </div>
    );
};

export default ContactUs;

import React, { useState } from 'react';
import './modal.css';

const Modal4 = ({ show, onClose, onSubmit, title, currentData }) => {
    const [formData, setFormData] = useState({
        date: currentData?.date || '',
        activity: currentData?.activity || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        onSubmit(formData); 
    };

    return show ? (
        <div className="modal">
          <div className="modal-content">

            <h2>{title}</h2>
            <form onSubmit={e => e.preventDefault()}>
                <label>Date</label>
                <input name="date" value={formData.date} onChange={handleChange} className="modal-input"/>
                
                <label>Activity</label>
                <input name="activity" value={formData.activity} onChange={handleChange} className="modal-input" />
                
               
                <div className="modal-actions">

                    <button type="button" onClick={handleSubmit}className="submit-button">Submit</button>
                   
                    <button onClick={onClose} className="close-button">Close</button>
                </div>
                </form>
         </div>
        </div>
    ) : null;
};
export default Modal4;

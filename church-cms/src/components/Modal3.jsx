import React, { useState } from 'react';
import './modal.css';

const Modal3 = ({ show, onClose, onSubmit, title, currentData }) => {
    const [formData, setFormData] = useState({
        title: currentData?.title || '',
        time: currentData?.time || '',
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
                <label>Title</label>
                <input name="title" value={formData.title} onChange={handleChange} className="modal-input"/>
                
                <label>Time</label>
                <input name="time" value={formData.time} onChange={handleChange} className="modal-input" />
                
               
                <div className="modal-actions">

                    <button type="button" onClick={handleSubmit}className="submit-button">Submit</button>
                   
                    <button onClick={onClose} className="close-button">Close</button>
                </div>
                </form>
         </div>
        </div>
    ) : null;
};
export default Modal3;

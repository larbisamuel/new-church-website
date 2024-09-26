import React, { useState, useEffect } from 'react';
import './modal.css';

const Modal2 = ({ show, onClose, onSubmit, title, currentData }) => {
    const [formData, setFormData] = useState({
        occasion_title: currentData?.occasion_title || '',
        theme_title: currentData?.theme_title || '',
        preacher_title: currentData?.preacher_title || '',
        bible_reading_1: currentData?.bible_reading_1 || '',
        bible_reading_2: currentData?.bible_reading_2 || '',
        bible_reading_3: currentData?.bible_reading_3 || '',
        suggested_hymns: currentData?.suggested_hymns || ''
    });

 useEffect(() => {
   if(currentData)  {
    setFormData(currentData || '');
   }
 }, [currentData]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        onSubmit(formData); // Pass form data to handleSubmitNextWeekService
    };

    return show ? (
        <div className="modal">
          <div className="modal-content">

            <h2>{title}</h2>
            <form onSubmit={e => e.preventDefault()}>
                <label>Occasion Title:</label>
                <input name="occasion_title" value={formData.occasion_title} onChange={handleChange} className="modal-input"/>
                
                <label>Theme Title:</label>
                <input name="theme_title" value={formData.theme_title} onChange={handleChange} className="modal-input" />
                
                <label>Preacher Title:</label>
                <input name="preacher_title" value={formData.preacher_title} onChange={handleChange} className="modal-input" />
                
                <label>1st Bible Reading:</label>
                <input name="bible_reading_1" value={formData.bible_reading_1} onChange={handleChange} className="modal-input" />
                
                <label>2nd Bible Reading:</label>
                <input name="bible_reading_2" value={formData.bible_reading_2} onChange={handleChange}className="modal-input" />
                
                <label>3rd Bible Reading:</label>
                <input name="bible_reading_3" value={formData.bible_reading_3} onChange={handleChange} className="modal-input" />
                
                <label>Suggested Hymns:</label>
                <input name="suggested_hymns" value={formData.suggested_hymns} onChange={handleChange} className="modal-input" />
               
                <div className="modal-actions">

                    <button type="button" onClick={handleSubmit}className="submit-button">Submit</button>
                   
                    <button onClick={onClose} className="close-button">Close</button>
                </div>
                </form>
         </div>
        </div>
    ) : null;
};
export default Modal2;

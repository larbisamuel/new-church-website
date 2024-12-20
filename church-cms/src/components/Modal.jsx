import React, { useState, useEffect } from 'react';
import './modal.css';
import Axios from 'axios';  

const Modal = ({ show, onClose, onSubmit, title, currentData }) => {
    const [titleInput, setTitleInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const [imageFile, setImageFile] = useState(null); // To store the actual file
    const [imagePreview, setImagePreview] = useState(''); // Base64 for preview

    const getFullImageUrl = (imageUrl) => {
        return imageUrl ? `http://localhost:3000${imageUrl}` : '';
    };

    // Use useEffect to update the form fields when currentData changes
    useEffect(() => {
        if (currentData) {
            setTitleInput(currentData.title || '');
            setDescriptionInput(currentData.description || '');
            // setImagePreview(currentData.image_url || '');
            if (currentData.image_url) {
                setImagePreview(getFullImageUrl(currentData.image_url));  // Use the helper to get full path
            } else {
                setImagePreview('');  // Reset preview if no image
            }
        }
    }, [currentData]);
    
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file); // Store the file object
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // Set the image as a base64 string for preview
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit =  (e) => {
        e.preventDefault();  // Prevent the default form submission
    
       
    
        // Submit the form data to the parent component
        onSubmit({ title: titleInput, description: descriptionInput, image: imageFile, image_url: currentData?.image_url});
    
        // Reset form and close modal after submission
        setTitleInput('');
        setDescriptionInput('');
        setImageFile(null);
        setImagePreview('');
        onClose();
    };
    


    if (!show) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{title}</h2>
                
                    <input
                        type="text"
                        placeholder="Title"
                        value={titleInput}
                        onChange={(e) => setTitleInput(e.target.value)}
                        className="modal-input"
                    />
                    <textarea
                        placeholder="Description"
                        value={descriptionInput}
                        onChange={(e) => setDescriptionInput(e.target.value)}
                        className="modal-textarea"
                    />
                    <div className="image-upload">
                        <label className="upload-label">
                            Upload Image
                            <input type="file" accept="image/*" onChange={handleImageChange} className="file-input" />
                        </label>
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="image-preview"
                                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                            />
                        )}
                    </div>
                    <div className="modal-actions">
                    <button onClick={handleSubmit} className="submit-button">Submit</button>
                        <button onClick={onClose} className="close-button">Close</button>
                        {/* <button className="submit-button" onSubmit={handleSubmit}>
                            Submit
                        </button>
                        <button type="button" className="close-button" onClick={onClose}>
                            Close
                        </button> */}
                    </div>
                
            </div>
        </div>
    );
};

export default Modal;


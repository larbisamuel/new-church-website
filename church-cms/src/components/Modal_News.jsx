import React, { useState, useEffect } from 'react';
import './modal.css';
import Axios from 'axios';  

const Modal_News = ({ show, onClose, onSubmit, title, currentData, defaultTitle }) => {
    const [titleInput, setTitleInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const [imageFile, setImageFile] = useState(null); // To store the actual file
    const [imagePreview, setImagePreview] = useState(''); // Base64 for preview

    // Use useEffect to update the form fields when currentData or defaultTitle changes
    useEffect(() => {
        if (currentData) {
            // If editing existing data, fill the form with the currentData
            setTitleInput(currentData.title || '');
            setDescriptionInput(currentData.description || '');
            setImagePreview(currentData.image || '');
        } else if (defaultTitle) {
            // If adding a new item, use the defaultTitle for the title field
            setTitleInput(defaultTitle);
        } else {
            // Reset the form when no data is provided
            setTitleInput('');
            setDescriptionInput('');
            setImagePreview('');
        }
    }, [currentData, defaultTitle]);
    
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

    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent the default form submission
    
        const formData = new FormData();
        formData.append('title', titleInput);
        formData.append('description', descriptionInput);
        if (imageFile) {
            formData.append('image', imageFile);  // Send the actual file object
        }
    
        // Submit the form data to the parent component
        onSubmit({ title: titleInput, description: descriptionInput, image: imageFile });
    
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
                <form onSubmit={handleSubmit}>
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
                        <button type="submit" className="submit-button">
                            Submit
                        </button>
                        <button type="button" className="close-button" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal_News;

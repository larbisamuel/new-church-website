import React, { useState, useEffect } from 'react';
import './modal.css';
import Axios from 'axios';  

const Modal = ({ show, onClose, onSubmit, title, currentData }) => {
    // const [titleInput, setTitleInput] = useState(currentData ? currentData.title : '');
    // const [descriptionInput, setDescriptionInput] = useState(currentData ? currentData.description : '');
    // const [imageFile, setImageFile] = useState(null); // To store the actual file
    // const [imagePreview, setImagePreview] = useState(currentData ? currentData.image : ''); // Base64 for preview


    const [titleInput, setTitleInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const [imageFile, setImageFile] = useState(null); // To store the actual file
    const [imagePreview, setImagePreview] = useState(''); // Base64 for preview

    // Use useEffect to update the form fields when currentData changes
    useEffect(() => {
        if (currentData) {
            setTitleInput(currentData.title || '');
            setDescriptionInput(currentData.description || '');
            setImagePreview(currentData.image || '');
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

export default Modal;


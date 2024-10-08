import React, { useState } from 'react';
import './modal.css';

const Modal_News = ({ show, onClose, onSubmit, currentData }) => {
    const [title, setTitle] = useState(currentData ? currentData.title : '');
    const [mainDescription, setMainDescription] = useState(currentData ? currentData.description : '');
    const [mainImage, setMainImage] = useState(null);
    const [additionalImages, setAdditionalImages] = useState([]);
    const [additionalDescriptions, setAdditionalDescriptions] = useState([]);

    const handleMainImageChange = (e) => {
        setMainImage(e.target.files[0]);
    };

    const handleAdditionalImageChange = (e, index) => {
        const files = e.target.files[0];
        const newAdditionalImages = [...additionalImages];
        newAdditionalImages[index] = files;
        setAdditionalImages(newAdditionalImages);
    };

    const handleDescriptionChange = (e, index) => {
        const newDescriptions = [...additionalDescriptions];
        newDescriptions[index] = e.target.value;
        setAdditionalDescriptions(newDescriptions);
    };

    const addAdditionalImageField = () => {
        setAdditionalImages([...additionalImages, null]);
        setAdditionalDescriptions([...additionalDescriptions, '']);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const formData = {
            title,
            description: mainDescription,
            image: mainImage,
            additionalImages,
            additionalDescriptions
        };
    
        onSubmit(formData); // Pass the form data to the parent component
        console.log("form data:", formData)

        resetForm();
        onClose();
    };
    

    const resetForm = () => {
        setTitle('');
        setMainDescription('');
        setMainImage(null);
        setAdditionalImages([]);
        setAdditionalDescriptions([]);
    };

    return (
        show && (  // Ensure modal only renders if 'show' is true
            <div className={`modal ${show ? 'show' : ''}`}>
                <div className="modal-content">
                    <span className="close" onClick={onClose}>&times;</span>
                    <h2>{currentData ? "Edit Item" : "Add New Item"}</h2>

                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="modal-input"
                    />

                    <input
                        type="file"
                        accept="image/*"  // Accept only images
                        onChange={handleMainImageChange}
                        className="modal-input"
                    />

                    {mainImage && <img src={URL.createObjectURL(mainImage)} alt="Main Preview" className="main-image-preview" />}

                    <textarea
                        placeholder="Description"
                        value={mainDescription}
                        onChange={(e) => setMainDescription(e.target.value)}
                        className="modal-textarea"
                    />

                    <h3>Additional Images</h3>
                    {additionalImages.map((_, index) => (
                        <div key={index} className="additional-image-section">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleAdditionalImageChange(e, index)}
                                className="modal-input"
                            />
                            {additionalImages[index] && (
                                <img src={URL.createObjectURL(additionalImages[index])} alt={`Additional Preview ${index + 1}`} className="additional-image-preview" />
                            )}
                            <textarea
                                placeholder="Image Description"
                                value={additionalDescriptions[index] || ''}
                                onChange={(e) => handleDescriptionChange(e, index)}
                                className="modal-textarea"
                            />
                        </div>
                    ))}

                    <button type="button" onClick={addAdditionalImageField}>
                        Add Another Image
                    </button>

                    <div className="modal-actions">
                        <button onClick={handleSubmit} className="submit-button">Submit</button>
                        <button onClick={onClose} className="close-button">Close</button>
                    </div>
                </div>
            </div>
        )
    );
};

export default Modal_News;

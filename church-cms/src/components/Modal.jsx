import React, { useState } from 'react';
import './modal.css';

const Modal = ({ show, onClose, onSubmit, title, currentData }) => {
    const [titleInput, setTitleInput] = useState(currentData ? currentData.title : '');
    const [descriptionInput, setDescriptionInput] = useState(currentData ? currentData.description : '');
    const [imageFile, setImageFile] = useState(currentData ? currentData.image : '');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageFile(reader.result); // Set the image as a base64 string
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        const newData = {
            title: titleInput,
            description: descriptionInput,
            image: imageFile,
        };
        onSubmit(newData);
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
                    {imageFile && <img src={imageFile} alt="Preview" className="image-preview" />}
                </div>
                <div className="modal-actions">
                    <button className="submit-button" onClick={handleSubmit}>Submit</button>
                    <button className="close-button" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;


// import React, { useState, useEffect } from 'react';
// import './Modal.css';

// const Modal = ({ show, onClose, onSubmit, title, currentData = {} }) => {
//     const [formData, setFormData] = useState({
//         title: '',
//         description: '',
//         image: '',
//     });

//     // Update formData when editing an existing item
//     useEffect(() => {
//         if (currentData) {
//             setFormData({
//                 title: currentData.title || '',
//                 description: currentData.description || '',
//                 image: currentData.image || '',
//             });
//         }
//     }, [currentData]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = () => {
//         // Ensure data is passed back correctly
//         onSubmit(formData);
//         onClose();
//     };

//     if (!show) return null;

//     return (
//         <div className="modal">
//             <div className="modal-content">
//                 <h2>{title}</h2>
//                 <input 
//                     type="text" 
//                     name="title" 
//                     value={formData.title} 
//                     onChange={handleChange} 
//                     placeholder="Title" 
//                 />
//                 <textarea 
//                     name="description" 
//                     value={formData.description} 
//                     onChange={handleChange} 
//                     placeholder="Description" 
//                 />
//                 <input 
//                     type="text" 
//                     name="image" 
//                     value={formData.image} 
//                     onChange={handleChange} 
//                     placeholder="Image URL" 
//                 />
//                 <button onClick={handleSubmit}>Submit</button>
//                 <button onClick={onClose}>Close</button>
//             </div>
//         </div>
//     );
// };

// export default Modal;

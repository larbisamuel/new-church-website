import React, { useState } from 'react';
import './modal.css';
import Axios from 'axios';  

const Modal = ({ show, onClose, onSubmit, title, currentData }) => {
    const [titleInput, setTitleInput] = useState(currentData ? currentData.title : '');
    const [descriptionInput, setDescriptionInput] = useState(currentData ? currentData.description : '');
    const [imageFile, setImageFile] = useState(null); // To store the actual file
    const [imagePreview, setImagePreview] = useState(currentData ? currentData.image : ''); // Base64 for preview



    
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


// import React, { useState } from 'react';
// import './modal.css';
// import Axios from 'axios';

// const Modal = ({ show, onClose, onSubmit, title, currentData }) => {
//     const [titleInput, setTitleInput] = useState(currentData ? currentData.title : '');
//     const [descriptionInput, setDescriptionInput] = useState(currentData ? currentData.description : '');
//     const [imageFile, setImageFile] = useState(currentData ? currentData.image : '');

//     const handleImageChange = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setImageFile(reader.result); // Set the image as a base64 string
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleSubmit = async () => {
//         const formData = new FormData();
//         formData.append('title', titleInput);
//         formData.append('description', descriptionInput);
//         if (imageFile) {
//             formData.append('image', imageFile);
//         }
    
//         // Now submit the formData to your backend using Axios
//         try {
//             await Axios.post('http://localhost:3000/api/latest-news', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });
//         } catch (error) {
//             console.error('Error uploading the news item:', error);
//         }
//     };
    

//     // const handleSubmit = () => {
//     //     const newData = {
//     //         title: titleInput,
//     //         description: descriptionInput,
//     //         image: imageFile,
//     //     };
//     //     onSubmit(newData);
//     //     onClose();
//     // };

//     if (!show) return null;

//     return (
//         <div className="modal">
//             <div className="modal-content">
//                 <h2>{title}</h2>
//                 <input
//                     type="text"
//                     placeholder="Title"
//                     value={titleInput}
//                     onChange={(e) => setTitleInput(e.target.value)}
//                     className="modal-input"
//                 />
//                 <textarea
//                     placeholder="Description"
//                     value={descriptionInput}
//                     onChange={(e) => setDescriptionInput(e.target.value)}
//                     className="modal-textarea"
//                 />
//                 <div className="image-upload">
//                     <label className="upload-label">
//                         Upload Image
//                         <input type="file" accept="image/*" onChange={handleImageChange} className="file-input" />
//                     </label>
//                     {imageFile && <img src={imageFile} alt="Preview" className="image-preview" style={{ width: "200px", height: "200px", objectFit: "cover" }} />}
//                 </div>
//                 <div className="modal-actions">
//                     <button className="submit-button" onClick={handleSubmit}>Submit</button>
//                     <button className="close-button" onClick={onClose}>Close</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Modal;


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

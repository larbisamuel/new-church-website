import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import "./allPages.css";
import Axios from 'axios';


const Gallery = () => {
    
    const [gallery, setGallery] = useState([]);
    const [loadingGallery, setLoadingGallery] = useState(true);
    const [errorGallery, setErrorGallery] = useState(null);
    const [modalOpenGallery, setModalOpenGallery] = useState(false);
    const [currentEditGallery, setCurrentEditGallery] = useState(null);


     // Fetch Gallery
     useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = await Axios.get('http://localhost:3000/api/gallery');
                setGallery(response.data);
                setLoadingGallery(false);
            } catch (error) {
                setErrorGallery('Failed to fetch latest news.');
                setLoadingGallery(false);
            }
        };
        fetchGallery();
    }, []);
    
    const handleAddGallery = () => {
        setCurrentEditGallery(null);
        setModalOpenGallery(true);
    };

    const handleEditGallery = (item) => {
        setCurrentEditGallery(item);
        setModalOpenGallery(true);
    };

    const handleDeleteGallery = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this gallery item?');
        if (confirmed) {
            try {
                await Axios.delete(`http://localhost:3000/api/gallery/${id}`);
                setGallery(gallery.filter(item => item.id !== id));
            } catch (error) {
                console.error('Error deleting gallery item:', error);
            }
        }  
        alert("Item sucessfully deleted!");

    };

    const handleSubmitGallery = async (newData) => {
            const formData = new FormData();
            formData.append('title', newData.title);
            formData.append('description', newData.description);
            if (newData.image) {
            formData.append('image', newData.image);
            }else if  (currentEditGallery && currentEditGallery.image_url) {
                // Preserve the existing image URL if no new image is uploaded
                formData.append('image_url', currentEditGallery.image_url);
            }

            try {
                if (currentEditGallery) {
                    // Update gallery
                    const response = await Axios.put(`http://localhost:3000/api/gallery/${currentEditGallery.id}`, formData);
                    setGallery(gallery.map(item => item.id === currentEditGallery.id ? response.data : item));
                } else {
                    // Create gallery
                    const response = await Axios.post('http://localhost:3000/api/gallery', formData);
                    setGallery([...gallery, response.data]);
                }
            } catch (error) {
                console.error('Error submitting news item:', error);
            }
            setModalOpenGallery(false);
            alert("Image sucessfully added!");

        };
    

    return (
        <div className="home-page">
            <h1>Gallery</h1>
            <button className="add-button" onClick={handleAddGallery}>Add New Image</button>
            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {gallery.map(item => (
                        <tr key={item.id}>
                            <td><img src={`http://localhost:3000${item.image_url}`} alt="Thumbnail" className='table-image' /></td>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>
                                <button onClick={() => handleEditGallery(item)}>Edit</button>
                                <button onClick={() => handleDeleteGallery(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                show={modalOpenGallery}
                onClose={() => setModalOpenGallery(false)}
                onSubmit={handleSubmitGallery}
                title={currentEditGallery ? "Edit Image" : "Add New Image"}
                currentData={currentEditGallery}
            />
        </div>
    );
};

export default Gallery;

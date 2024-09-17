// src/pages/Gallery.js
import React, { useState } from 'react';
import Modal from '../components/Modal';
import "./allPages.css"

const Gallery = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [currentEditData, setCurrentEditData] = useState(null);
    const [galleryItems, setGalleryItems] = useState([
        { id: 1, title: "Gallery 1", description: "Gallery Description 1", image: "gallery1.jpg" },
        { id: 2, title: "Gallery 2", description: "Gallery Description 2", image: "gallery2.jpg" },
    ]);

    const handleAddNew = () => {
        setCurrentEditData(null);
        setModalOpen(true);
    };

    const handleEdit = (galleryItem) => {
        setCurrentEditData(galleryItem);
        setModalOpen(true);
    };

    const handleDelete = (id) => {
        setGalleryItems(galleryItems.filter(galleryItem => galleryItem.id !== id));
    };

    const handleSubmit = (newData) => {
        if (currentEditData) {
            setGalleryItems(galleryItems.map(galleryItem => (galleryItem.id === currentEditData.id ? { ...galleryItem, ...newData } : galleryItem)));
        } else {
            const newGalleryItem = { ...newData, id: galleryItems.length + 1 };
            setGalleryItems([...galleryItems, newGalleryItem]);
        }
    };

    return (
        <div className="gallery-page">
            <h1>Gallery</h1>
            <button className="add-button" onClick={handleAddNew}>Add New Image</button>
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
                    {galleryItems.map(galleryItem => (
                        <tr key={galleryItem.id}>
                            <td><img src={galleryItem.image} alt="Thumbnail" width="50" /></td>
                            <td>{galleryItem.title}</td>
                            <td>{galleryItem.description}</td>
                            <td>
                                <button onClick={() => handleEdit(galleryItem)}>Edit</button>
                                <button onClick={() => handleDelete(galleryItem.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                show={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
                title={currentEditData ? "Edit Image" : "Add New Image"}
                currentData={currentEditData}
            />
        </div>
    );
};

export default Gallery;

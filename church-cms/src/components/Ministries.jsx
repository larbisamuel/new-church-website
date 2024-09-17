// src/pages/Ministries.js
import React, { useState } from 'react';
import Modal from '../components/Modal';
import "./allPages.css"

const Ministries = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [currentEditData, setCurrentEditData] = useState(null);
    const [ministries, setMinistries] = useState([
        { id: 1, title: "Ministry 1", description: "Description 1", image: "ministry1.jpg" },
        { id: 2, title: "Ministry 2", description: "Description 2", image: "ministry2.jpg" },
    ]);

    const handleAddNew = () => {
        setCurrentEditData(null);
        setModalOpen(true);
    };

    const handleEdit = (ministry) => {
        setCurrentEditData(ministry);
        setModalOpen(true);
    };

    const handleDelete = (id) => {
        setMinistries(ministries.filter(ministry => ministry.id !== id));
    };

    const handleSubmit = (newData) => {
        if (currentEditData) {
            setMinistries(ministries.map(ministry => (ministry.id === currentEditData.id ? { ...ministry, ...newData } : ministry)));
        } else {
            const newMinistry = { ...newData, id: ministries.length + 1 };
            setMinistries([...ministries, newMinistry]);
        }
    };

    return (
        <div className="ministries-page">
            <h1>Ministries</h1>
            <button className="add-button" onClick={handleAddNew}>Add New Ministry</button>
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
                    {ministries.map(ministry => (
                        <tr key={ministry.id}>
                            <td><img src={ministry.image} alt="Thumbnail" width="50" /></td>
                            <td>{ministry.title}</td>
                            <td>{ministry.description}</td>
                            <td>
                                <button onClick={() => handleEdit(ministry)}>Edit</button>
                                <button onClick={() => handleDelete(ministry.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                show={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
                title={currentEditData ? "Edit Ministry" : "Add New Ministry"}
                currentData={currentEditData}
            />
        </div>
    );
};

export default Ministries;

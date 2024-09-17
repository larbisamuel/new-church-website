// src/pages/AboutUs.js
import React, { useState } from 'react';
import Modal from '../components/Modal';
import "./allPages.css"

const AboutUs = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [currentEditData, setCurrentEditData] = useState(null);
    const [leaders, setLeaders] = useState([
        { id: 1, title: "Minister 1", description: "Leader 1", image: "leader1.jpg" },
        { id: 2, title: "Catechist 1", description: "Leader 2", image: "leader2.jpg" },
    ]);

    const handleAddNew = () => {
        setCurrentEditData(null);
        setModalOpen(true);
    };

    const handleEdit = (leader) => {
        setCurrentEditData(leader);
        setModalOpen(true);
    };

    const handleDelete = (id) => {
        setLeaders(leaders.filter(leader => leader.id !== id));
    };

    const handleSubmit = (newData) => {
        if (currentEditData) {
            setLeaders(leaders.map(leader => (leader.id === currentEditData.id ? { ...leader, ...newData } : leader)));
        } else {
            const newLeader = { ...newData, id: leaders.length + 1 };
            setLeaders([...leaders, newLeader]);
        }
    };

    return (
        <div className="about-page">
            <h1>Our Leaders</h1>
            <button className="add-button" onClick={handleAddNew}>Add New Leader</button>
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
                    {leaders.map(leader => (
                        <tr key={leader.id}>
                            <td><img src={leader.image} alt="Thumbnail" width="50" /></td>
                            <td>{leader.title}</td>
                            <td>{leader.description}</td>
                            <td>
                                <button onClick={() => handleEdit(leader)}>Edit</button>
                                <button onClick={() => handleDelete(leader.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                show={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
                title={currentEditData ? "Edit Leader" : "Add New Leader"}
                currentData={currentEditData}
            />
        </div>
    );
};

export default AboutUs;



/*import React from 'react';
import "../components/Modal"
import "./allPages.css"

const AboutUs = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [currentEditData, setCurrentEditData] = useState(null);
    const [items, setItems] = useState([
        { id: 1, name: "Leader 1", role: "Pastor", image: "leader1.jpg" },
        { id: 2, name: "Leader 2", role: "Elder", image: "leader2.jpg" },
    ]);
    

    const handleAddNew = () => {
        setCurrentEditData(null);
        setModalOpen(true);
    };

    const handleEdit = (item) => {
        setCurrentEditData(item);
        setModalOpen(true);
    };

    const handleDelete = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    const handleSubmit = (newData) => {
        if (currentEditData) {
            setItems(items.map(item => item.id === currentEditData.id ? newData : item));
        } else {
            setItems([...items, { ...newData, id: items.length + 1 }]);
        }
    };
    return (
        <div className="about-page">
            <h1>Ministers and Leaders</h1>
            <button className="add-button" onClick={handleAddNew}>Add New</button>
            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                 {items.map(item => (
                    <tr key={item.id}>
                        <td><img src={item.image} alt="Leader" width="50" /></td>
                        <td>{item.name}</td>
                        <td>{item.role}</td>

                        <td>
                            <button onClick={() => handleEdit(item)}>Edit</button>
                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                show={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
                title={currentEditData ? "Edit Leader" : "Add New Leader"}
                currentData={currentEditData}
            />

        </div>
    );
};

export default AboutUs;
 */
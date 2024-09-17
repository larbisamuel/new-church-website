import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Modal from '../components/Modal';
import './allPages.css';

const Home = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [currentEditData, setCurrentEditData] = useState(null);
    const [items, setItems] = useState([]);

    // Fetch news items on component mount
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await Axios.get('/api/latest-news'); // Adjust the endpoint as necessary
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchItems();
    }, []);

    const handleAddNew = () => {
        setCurrentEditData(null);
        setModalOpen(true);
    };

    const handleEdit = (item) => {
        setCurrentEditData(item);
        setModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await Axios.delete(`/api/latest-news/${id}`); // Adjust the endpoint as necessary
            setItems(items.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleSubmit = async (newData) => {
        if (currentEditData) {
            // Update existing item
            try {
                const response = await Axios.put(`/api/latest-news/${currentEditData.id}`, newData); // Adjust the endpoint
                setItems(items.map(item => item.id === currentEditData.id ? response.data : item));
            } catch (error) {
                console.error('Error updating item:', error);
            }
        } else {
            // Add new item
            try {
                const response = await Axios.post('/api/latest-news', newData); // Adjust the endpoint
                setItems([...items, response.data]);
            } catch (error) {
                console.error('Error adding new item:', error);
            }
        }
        setModalOpen(false);
    };

    return (
        <div className="home-page">
            <h1>Latest News</h1>
            <button className="add-button" onClick={handleAddNew}>Add New</button>
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
                    {items.map(item => (
                        <tr key={item.id}>
                            <td><img src={item.image_url} alt="Thumbnail" width="50" /></td>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
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
                title={currentEditData ? "Edit News" : "Add New News"}
                currentData={currentEditData}
            />
        </div>
    );
};

export default Home;

// src/pages/News.js
import React, { useState } from 'react';
import Modal from '../components/Modal';
import "./allPages.css"

const News = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [currentEditData, setCurrentEditData] = useState(null);
    const [newsItems, setNewsItems] = useState([
        { id: 1, title: "News 1", description: "News Description 1", image: "news1.jpg" },
        { id: 2, title: "News 2", description: "News Description 2", image: "news2.jpg" },
    ]);

    const handleAddNew = () => {
        setCurrentEditData(null);
        setModalOpen(true);
    };

    const handleEdit = (newsItem) => {
        setCurrentEditData(newsItem);
        setModalOpen(true);
    };

    const handleDelete = (id) => {
        setNewsItems(newsItems.filter(newsItem => newsItem.id !== id));
    };

    const handleSubmit = (newData) => {
        if (currentEditData) {
            setNewsItems(newsItems.map(newsItem => (newsItem.id === currentEditData.id ? { ...newsItem, ...newData } : newsItem)));
        } else {
            const newNewsItem = { ...newData, id: newsItems.length + 1 };
            setNewsItems([...newsItems, newNewsItem]);
        }
    };

    return (
        <div className="news-page">
            <h1>News</h1>
            <button className="add-button" onClick={handleAddNew}>Add New News</button>
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
                    {newsItems.map(newsItem => (
                        <tr key={newsItem.id}>
                            <td><img src={newsItem.image} alt="Thumbnail" width="50" /></td>
                            <td>{newsItem.title}</td>
                            <td>{newsItem.description}</td>
                            <td>
                                <button onClick={() => handleEdit(newsItem)}>Edit</button>
                                <button onClick={() => handleDelete(newsItem.id)}>Delete</button>
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

export default News;

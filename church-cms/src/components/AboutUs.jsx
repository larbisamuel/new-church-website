// src/pages/AboutUs.js
import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import "./allPages.css"
import Axios from 'axios';

const AboutUs = () => {
   // State for Leader 
   const [leader, setLeader] = useState([]);
   const [loadingLeader, setLoadingLeader] = useState(true);
   const [errorLeader, setErrorLeader] = useState(null);
   const [modalOpenLeader, setModalOpenLeader] = useState(false);
   const [currentEditLeader, setCurrentEditLeader] = useState(null);

    //state for Catechists
   const [catechist, setCatechist] = useState([]);
   const [loadingCatechist, setLoadingCatechist] = useState(true);
   const [errorCatechist, setErrorcatechist] = useState(null);
   const [modalOpenCatechist, setModalOpenCatechist] = useState(false);
   const [currentEditCatechist, setCurrentEditCatechist] = useState(null);

     // Fetch leaders
     useEffect(() => {
        const fetchLeaders = async () => {
            try {
                const response = await Axios.get('http://localhost:3000/api/ministers');
                setLeader(response.data);
                setLoadingLeader(false);
            } catch (error) {
                setErrorLeader('Failed to fetch latest leader.');
                setLoadingLeader(false);
            }
        };
        fetchLeaders();
    }, []);

     // Fetch catechists
     useEffect(() => {
        const fetchCatechists = async () => {
            try {
                const response = await Axios.get('http://localhost:3000/api/catechists');
                setCatechist(response.data);
                setLoadingCatechist(false);
            } catch (error) {
                setErrorcatechist('Failed to fetch latest catechist.');
                setLoadingCatechist(false);
            }
        };
        fetchCatechists();
    }, []);

    //handlers for Leaders
    const handleAddNewLeader = () => {
        setCurrentEditLeader(null);
        setModalOpenLeader(true);
    };

    const handleEditLeader = (item) => {
        setCurrentEditLeader(item);
        setModalOpenLeader(true);
    };

    const handleDeleteLeader = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this leader item?');
        if (confirmed) {
            try {
                await Axios.delete(`http://localhost:3000/api/ministers/${id}`);
                setLeader(leader.filter(item => item.id !== id));
            } catch (error) {
                console.error('Error deleting ministers item:', error);
            }
        }
    };

    const handleSubmitLeader = async (newData) => {
        const formData = new FormData();
        formData.append('title', newData.title);
        formData.append('description', newData.description);
        if (newData.image) formData.append('image', newData.image);

        try {
            if (currentEditLeader) {
                // Update leader
                const response = await Axios.put(`http://localhost:3000/api/ministers/${currentEditLeader.id}`, formData);
                setLeader(leader.map(item => item.id === currentEditLeader.id ? response.data : item));
            } else {
                // Create News
                const response = await Axios.post('http://localhost:3000/api/ministers', formData);
                setLeader([...leader, response.data]);
            }
        } catch (error) {
            console.error('Error submitting leader item:', error);
        }
        setModalOpenLeader(false);
    };


        //handlers for catechists
        const handleAddNewCatechist = () => {
            setCurrentEditCatechist(null);
            setModalOpenCatechist(true);
        };
    
        const handleEditCatechist = (item) => {
            setCurrentEditCatechist(item);
            setModalOpenCatechist(true);
        };
    
        const handleDeleteCatechist = async (id) => {
            const confirmed = window.confirm('Are you sure you want to delete this catechist item?');
            if (confirmed) {
                try {
                    await Axios.delete(`http://localhost:3000/api/catechists/${id}`);
                    setCatechist(catechist.filter(item => item.id !== id));
                } catch (error) {
                    console.error('Error deleting catechists item:', error);
                }
            }
        };
    
        const handleSubmitCatechist = async (newData) => {
            const formData = new FormData();
            formData.append('title', newData.title);
            formData.append('description', newData.description);
            if (newData.image) formData.append('image', newData.image);
    
            try {
                if (currentEditCatechist) {
                    // Update catechist
                    const response = await Axios.put(`http://localhost:3000/api/catechists/${currentEditCatechist.id}`, formData);
                    setCatechist(catechist.map(item => item.id === currentEditCatechist.id ? response.data : item));
                } else {
                    // Create catechist
                    const response = await Axios.post('http://localhost:3000/api/catechists', formData);
                    setCatechist([...catechist, response.data]);
                }
            } catch (error) {
                console.error('Error submitting catechist item:', error);
            }
            setModalOpenCatechist(false);
        };
    

    return (
        <div className="about-page">
            <h1>Ministers</h1>
            <button className="add-button" onClick={handleAddNewLeader}>Add New Minister</button>
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
                    {leader.map(item => (
                        <tr key={item.id}>
                            <td><img src={`http://localhost:3000${item.image_url}`} alt="Thumbnail" className='table-image' /></td>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>
                                <button onClick={() => handleEditLeader(item)}>Edit</button>
                                <button onClick={() => handleDeleteLeader(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h1>catechists</h1>
            <button className="add-button" onClick={handleAddNewCatechist}>Add New Minister</button>
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
                    {catechist.map(item => (
                        <tr key={item.id}>
                            <td><img src={`http://localhost:3000${item.image_url}`} alt="Thumbnail" className='table-image' /></td>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>
                                <button onClick={() => handleEditCatechist(item)}>Edit</button>
                                <button onClick={() => handleDeleteCatechist(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                show={modalOpenLeader}
                onClose={() => setModalOpenLeader(false)}
                onSubmit={handleSubmitLeader}
                title={currentEditLeader ? "Edit Leader" : "Add New Leader"}
                currentData={currentEditLeader}
            />

            <Modal
                show={modalOpenCatechist}
                onClose={() => setModalOpenCatechist(false)}
                onSubmit={handleSubmitCatechist}
                title={currentEditCatechist ? "Edit catechist" : "Add New catechist"}
                currentData={currentEditCatechist}
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
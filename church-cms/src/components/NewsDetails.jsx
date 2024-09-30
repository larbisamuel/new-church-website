import React, { useState, useEffect } from 'react';
import Modal_News from './Modal_News';
import "./allPages.css";
import Axios from 'axios';


const NewsDetails = () => {
    
    const [newsDetails, setNewsDetails] = useState([]);
    const [loadingNewsDetails, setLoadingNewsDetails] = useState(true);
    const [errorNewsDetails, setErrorNewsDetails] = useState(null);
    const [modalOpenNewsDetails, setModalOpenNewsDetails] = useState(false);
    const [currentEditNewsDetails, setCurrentEditNewsDetails] = useState(null);
    const [defaultTitle, setDefaultTitle] = useState(''); // New state to hold the default title

    const [newsDetails2, setnewsDetails2] = useState([]);
    const [loadingnewsDetails2, setLoadingnewsDetails2] = useState(true);
    const [errornewsDetails2, setErrornewsDetails2] = useState(null);
    const [modalOpennewsDetails2, setModalOpennewsDetails2] = useState(false);
    const [currentEditnewsDetails2, setCurrentEditnewsDetails2] = useState(null);
    const [defaultTitle2, setDefaultTitle2] = useState(''); // New state to hold the default title

     // Fetch newsDetails
     useEffect(() => {
        const fetchNewsDetails = async () => {
            try {
                const response = await Axios.get('http://localhost:3000/api/news');
                setNewsDetails(response.data);
                setLoadingNewsDetails(false);
            } catch (error) {
                setErrorNewsDetails('Failed to fetch news.');
                setLoadingNewsDetails(false);
            }
        };
        fetchNewsDetails();
    }, []);
    

    // Fetch newsDetails2
    useEffect(() => {
        const fetchnewsDetails2 = async () => {
            try {
                const response = await Axios.get('http://localhost:3000/api/news2');
                setnewsDetails2(response.data);
                setLoadingnewsDetails2(false);
            } catch (error) {
                setErrornewsDetails2('Failed to fetch news.');
                setLoadingnewsDetails2(false);
            }
        };
        fetchnewsDetails2();
    }, []);

   //handlers for news details-1
    const handleAddNewsDetails = () => {
        // Set the title of the first news item as the default title when adding a new item
        if (newsDetails.length > 0) {
            setDefaultTitle(newsDetails[0].title); // Copy the first news title
        } else {
            setDefaultTitle(''); // No title if no news is available
        }

        setCurrentEditNewsDetails(null);
        setModalOpenNewsDetails(true);
    };

  

    const handleEditNewsDetails = (item) => {
        setCurrentEditNewsDetails(item);
        setModalOpenNewsDetails(true);
    };


   

    const handleDeleteNewsDetails = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this newsDetails item?');
        if (confirmed) {
            try {
                await Axios.delete(`http://localhost:3000/api/news/${id}`);
                setNewsDetails(newsDetails.filter(item => item.id !== id));
            } catch (error) {
                console.error('Error deleting newsDetails item:', error);
            }
        }    
    };

  
    const handleSubmitNewsDetails = async (newData) => {
            const formData = new FormData();
            formData.append('title', newData.title);
            formData.append('description', newData.description);
            if (newData.image) formData.append('image', newData.image);
    
            try {
                if (currentEditNewsDetails) {
                    // Update newsDetails
                    const response = await Axios.put(`http://localhost:3000/api/news/${currentEditNewsDetails.id}`, formData);
                    setNewsDetails(newsDetails.map(item => item.id === currentEditNewsDetails.id ? response.data : item));
                } else {
                    // Create newsDetails
                    const response = await Axios.post('http://localhost:3000/api/news', formData);
                    setNewsDetails([...newsDetails, response.data]);
                }
            } catch (error) {
                console.error('Error submitting news item:', error);
            }
            setModalOpenNewsDetails(false);
        };


        //handlers for news details-2
        const handleAddNewsDetails2 = () => {
            // Set the title of the first news item as the default title when adding a new item
            if (newsDetails2.length > 0) {
                setDefaultTitle2(newsDetails2[0].title); // Copy the first news title
            } else {
                setDefaultTitle2(''); // No title if no news is available
            }
    
            setCurrentEditnewsDetails2(null);
            setModalOpennewsDetails2(true);
        };

        const handleEditnewsDetails2 = (item) => {
            setCurrentEditnewsDetails2(item);
            setModalOpennewsDetails2(true);
        };
    
        const handleDeletenewsDetails2 = async (id) => {
            const confirmed = window.confirm('Are you sure you want to delete this newsDetails2 item?');
            if (confirmed) {
                try {
                    await Axios.delete(`http://localhost:3000/api/news2/${id}`);
                    setnewsDetails2(newsDetails2.filter(item => item.id !== id));
                } catch (error) {
                    console.error('Error deleting newsDetails2 item:', error);
                }
            }    
        };
    
    

        const handleSubmitnewsDetails2 = async (newData) => {
            const formData = new FormData();
            formData.append('title', newData.title);
            formData.append('description', newData.description);
            if (newData.image) formData.append('image', newData.image);
    
            try {
                if (currentEditnewsDetails2) {
                    // Update newsDetails2
                    const response = await Axios.put(`http://localhost:3000/api/news2/${currentEditnewsDetails2.id}`, formData);
                    setnewsDetails2(newsDetails2.map(item => item.id === currentEditnewsDetails2.id ? response.data : item));
                } else {
                    // Create newsDetails2
                    const response = await Axios.post('http://localhost:3000/api/news2', formData);
                    setnewsDetails2([...newsDetails2, response.data]);
                }
            } catch (error) {
                console.error('Error submitting news item:', error);
            }
            setModalOpennewsDetails2(false);
        };
    
    

    return (
        <div className="newsDetails-page">
            <h1>News Details</h1>
            <h2>Latest news section-1</h2>
            <button className="add-button" onClick={handleAddNewsDetails}>Add New Item</button>
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
                    {newsDetails.map(item => (
                        <tr key={item.id}>
                            <td><img src={`http://localhost:3000${item.image_url}`} alt="Thumbnail" className='table-image' /></td>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>
                                <button onClick={() => handleEditNewsDetails(item)}>Edit</button>
                                <button onClick={() => handleDeleteNewsDetails(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Latest news section-2</h2>
            <button className="add-button" onClick={handleAddNewsDetails2}>Add New Item</button>
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
                    {newsDetails2.map(item => (
                        <tr key={item.id}>
                            <td><img src={`http://localhost:3000${item.image_url}`} alt="Thumbnail" className='table-image' /></td>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>
                                <button onClick={() => handleEditnewsDetails2(item)}>Edit</button>
                                <button onClick={() => handleDeletenewsDetails2(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal_News
                show={modalOpenNewsDetails}
                onClose={() => setModalOpenNewsDetails(false)}
                onSubmit={handleSubmitNewsDetails}
                title={currentEditNewsDetails ? "Edit Item" : "Add New Item"}
                currentData={currentEditNewsDetails}
                defaultTitle={defaultTitle}
            />

            <Modal_News
                show={modalOpennewsDetails2}
                onClose={() => setModalOpennewsDetails2(false)}
                onSubmit={handleSubmitnewsDetails2}
                title={currentEditnewsDetails2 ? "Edit Item" : "Add New Item"}
                currentData={currentEditnewsDetails2}
                defaultTitle={defaultTitle2}
            />
        </div>
    );
};

export default NewsDetails;

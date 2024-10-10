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
    // const [defaultTitle, setDefaultTitle] = useState(''); // New state to hold the default title

    
    const [newsDetails2, setnewsDetails2] = useState([]);
    const [loadingnewsDetails2, setLoadingnewsDetails2] = useState(true);
    const [errornewsDetails2, setErrornewsDetails2] = useState(null);
    const [modalOpennewsDetails2, setModalOpennewsDetails2] = useState(false);
    const [currentEditnewsDetails2, setCurrentEditnewsDetails2] = useState(null);
    // const [defaultTitle2, setdefaultTitle2] = useState('');


     // Fetch newsDetails
     useEffect(() => {
        const fetchNewsDetails = async () => {
            try {
                const response = await Axios.get('http://localhost:3000/api/news');
                console.log("response data",response.data); 
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
                const response = await Axios.get('http://localhost:3000/api/upcoming-events');
                console.log("response data",response.data); 
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
    
        // Append additional images and descriptions
        newData.additionalImages.forEach((image, index) => {
            formData.append('additionalImages', image);
            formData.append('additionalDescriptions[]', newData.additionalDescriptions[index]);
        });
    
        try {
            if (currentEditNewsDetails) {
                // Update news details
                const response = await Axios.put(`http://localhost:3000/api/news/${currentEditNewsDetails.id}`, formData);
                setNewsDetails(newsDetails.map(item => item.id === currentEditNewsDetails.id ? response.data : item));
            } else {
                // Create new news item
                const response = await Axios.post('http://localhost:3000/api/news/upload-news', formData);
                setNewsDetails([...newsDetails, response.data]);
            }
    
           
            
        } catch (error) {
            console.error('Error submitting news item:', error);
        }
        setModalOpenNewsDetails(false);
    };
    
  
    
      //handlers for news details-2
      const handleAddnewsDetails2 = () => {
       
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
                await Axios.delete(`http://localhost:3000/api/upcoming-events/${id}`);
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
    
        // Append additional images and descriptions
        newData.additionalImages.forEach((image, index) => {
            formData.append('additionalImages', image);
            formData.append('additionalDescriptions[]', newData.additionalDescriptions[index]);
        });
    
        try {
            if (currentEditnewsDetails2) {
                // Update news details
                const response = await Axios.put(`http://localhost:3000/api/upcoming-events/${currentEditnewsDetails2.id}`, formData);
                setnewsDetails2(newsDetails2.map(item => item.id === currentEditnewsDetails2.id ? response.data : item));
            } else {
                // Create new news item
                const uploadResponse = await Axios.post('http://localhost:3000/api/upcoming-events/upload-u-news', formData);
                setnewsDetails2([...newsDetails2, uploadResponse.data]);
                console.log("event additional img:", uploadResponse);
            }
            
    
            // Refetch the updated list of news after successful submission
            // const updatedResponse = await Axios.get(`http://localhost:3000/api/upcoming-events/${id}`);
            // setnewsDetails2(updatedResponse.data);
            
        } catch (error) {
            console.error('Error submitting event item:', error);
        }
        setModalOpennewsDetails2(false);
    };



       
    

    return (
        <div className="newsDetails-page">
            <h1>News Details</h1>
            <h2>Latest news </h2>
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
            <td>
                {/* Display main image */}
                <img src={`http://localhost:3000${item.image_url}`} alt="Thumbnail" className="table-image" />
                
                {/* Display additional images */}
                {item.additional_images && item.additional_images.length > 0 && (
                    <div className="additional-images-section">
                        {item.additional_images.map((imageUrl, index) => (
                            <img
                                key={index}
                                src={`http://localhost:3000${imageUrl}`}
                                alt={`Additional Thumbnail ${index + 1}`}
                                className="table-additional-image"
                            />
                            
                        ))}
                    </div>
                )}
            </td>
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

<h2>Upcoming events </h2>
            <button className="add-button" onClick={handleAddnewsDetails2}>Add New Item</button>
            
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
    {newsDetails2.map(item2 => (
        <tr key={item2.id}>
            <td>
                {/* Display main image */}
                <img src={`http://localhost:3000${item2.image_url}`} alt="Thumbnail" className="table-image" />
                
                {/* Display additional images */}
                {item2.additional_images && item2.additional_images.length > 0 && (
                    <div className="additional-images-section">
                        {item2.additional_images.map((imageUrl, index) => (
                            <img
                                key={index}
                                src={`http://localhost:3000${imageUrl}`}
                                alt={`Additional Thumbnail ${index + 1}`}
                                className="table-additional-image"
                            />
                        ))}
                    </div>
                )}
            </td>
            <td>{item2.title}</td>
            <td>{item2.description}</td>
            <td>
                <button onClick={() => handleEditnewsDetails2(item2)}>Edit</button>
                <button onClick={() => handleDeletenewsDetails2(item2.id)}>Delete</button>
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
                // defaultTitle={defaultTitle}
            />

            <Modal_News
                show={modalOpennewsDetails2}
                onClose={() => setModalOpennewsDetails2(false)}
                onSubmit={handleSubmitnewsDetails2}
                title={currentEditnewsDetails2 ? "Edit Item" : "Add New Item"}
                currentData={currentEditnewsDetails2}
                // defaultTitle={defaultTitle2}
            />
            

           
        </div>
    );
};

export default NewsDetails;

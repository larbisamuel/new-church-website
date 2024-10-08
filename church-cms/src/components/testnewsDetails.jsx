import React, { useState, useEffect } from 'react';
import Modal_News from './Modal_News';
import "./allPages.css";
import Axios from 'axios';


const newsDetails2 = () => {
    
    const [newsDetails2, setnewsDetails2] = useState([]);
    const [loadingnewsDetails2, setLoadingnewsDetails2] = useState(true);
    const [errornewsDetails2, setErrornewsDetails2] = useState(null);
    const [modalOpennewsDetails2, setModalOpennewsDetails2] = useState(false);
    const [currentEditnewsDetails2, setCurrentEditnewsDetails2] = useState(null);
    const [defaultTitle2, setdefaultTitle2] = useState(''); // New state to hold the default title

    

     // Fetch newsDetails2
     useEffect(() => {
        const fetchnewsDetails2 = async () => {
            try {
                const response = await Axios.get('http://localhost:3000/api/upcoming-events/top3-u');
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
    const handleAddnewsDetails2 = () => {
        // Set the title of the first news item as the default title when adding a new item
        if (newsDetails2.length > 0) {
            setdefaultTitle2(newsDetails2[0].title); // Copy the first news title
        } else {
            setdefaultTitle2(''); // No title if no news is available
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
            formData.append('additionalDescriptions', newData.additionalDescriptions[index]);
        });
    
        try {
            if (currentEditnewsDetails2) {
                // Update news details
                const response = await Axios.put(`http://localhost:3000/api/upcoming-events/${currentEditnewsDetails2.id}`, formData);
                setnewsDetails2(newsDetails2.map(item => item.id === currentEditnewsDetails2.id ? response.data : item));
            } else {
                // Create new news item
                await Axios.post('http://localhost:3000/api/news/upload-u-news', formData);
            }
    
            // Refetch the updated list of news after successful submission
            const updatedResponse = await Axios.get(`http://localhost:3000/api/upcoming-events/${id}`);
            setnewsDetails2(updatedResponse.data);
            
        } catch (error) {
            console.error('Error submitting news item:', error);
        }
        setModalOpennewsDetails2(false);
    };
    
  
    



       
    

    return (
        <div className="newsDetails2-page">
            <h1>News Details</h1>
            <h2>Latest news </h2>
            <button className="add-button" onClick={handleAddnewsDetails2}>Add New Item</button>
            {/* <table>
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
            </table> */}
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
                <button onClick={() => handleEditnewsDetails2(item)}>Edit</button>
                <button onClick={() => handleDeletenewsDetails2(item.id)}>Delete</button>
            </td>
        </tr>
    ))}
</tbody>
</table>

            

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

export default newsDetails2;

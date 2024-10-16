import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import Modal2 from './Modal2';
import Modal3 from './Modal3';
import Modal4 from './Modal4';


import Axios from 'axios';
import './allPages.css';

const Home = () => {
    


    //State for birthdays
    const [birthday, setBirthday] = useState([]);
    const [loadingBirthday, setLoadingBirthday] = useState(true);
    const [errorBirhtday, setErrorBirthday] = useState(null);
    const [modalOpenBirthday, setModalOpenBirthday] = useState(false);
    const [currentEditBirthday, setCurrentEditBirthday] = useState(null);

    //State for birthdays
    const [weddings, setWeddings] = useState([]);
    const [loadingWeddings, setLoadingWeddings] = useState(true);
    const [errorWeddings, setErrorWeddings] = useState(null);
    const [modalOpenWeddings, setModalOpenWeddings] = useState(false);
    const [currentEditWeddings, setCurrentEditWeddings] = useState(null);

    //State for next week service
    const [nextWeekService, setNextWeekService] = useState([]);
    const [loadingNextWeekService, setLoadingNextWeekService] = useState(true);
    const [errorNextWeekService, setErrorNextWeekService] = useState(null);
    const [modalOpenNextWeekService, setModalOpenNextWeekService] = useState(false);
    const [currentEditNextWeekService, setCurrentEditNextWeekService] = useState(null);

    //State for next week service
    const [churchActivity, setchurchActivity] = useState([]);
    const [loadingChurchActivity, setLoadingChurchActivity] = useState(true);
    const [errorChurchActivity, setErrorChurchActivity] = useState(null);
    const [modalOpenChurchActivity, setModalOpenChurchActivity] = useState(false);
    const [currentEditChurchActivity, setCurrentEditChurchActivity] = useState(null);

     //State for monthly activity
     const [monthlyActivity, setMonthlyActivity] = useState([]);
     const [loadingMonthlyActivity, setLoadingMonthlyActivity] = useState(true);
     const [errorMonthlyActivity, setErrorMonthlyActivity] = useState(null);
     const [modalOpenMonthlyActivity, setModalOpenMonthlyActivity] = useState(false);
     const [currentEditMonthlyActivity, setCurrentEditMonthlyActivity] = useState(null);
 

  

    // Fetch birthdays
    useEffect(() => {
        const fetchBirthday = async () => {
            try {
                const response = await Axios.get('http://localhost:3000/api/birthdays');
                setBirthday(response.data);
                setLoadingBirthday(false);
            } catch (error) {
                setErrorBirthday('Failed to fetch birthday.');
                setLoadingBirthday(false);
            }
        };
        fetchBirthday();
    }, []);

     // Fetch WEDDINGS
     useEffect(() => {
        const fetchWeddings = async () => {
            try {
                const response = await Axios.get('http://localhost:3000/api/weddings');
                setWeddings(response.data);
                setLoadingWeddings(false);
            } catch (error) {
                setErrorWeddings('Failed to fetch weddings.');
                setLoadingWeddings(false);
            }
        };
        fetchWeddings();
    }, []);

    // Fetch nextweekservice
    useEffect(() => {
        const fetchNextWeekService = async () => {
            try {
                const response = await Axios.get('http://localhost:3000/api/next-week-service');
                setNextWeekService(response.data);
                setLoadingNextWeekService(false);
            } catch (error) {
                setErrorNextWeekService('Failed to fetch next week service.');
                setLoadingNextWeekService(false);
            }
        };
        fetchNextWeekService();
    }, []);

    useEffect(() => {
        const fetchChurchActivity = async () => {
            try {
                const response = await Axios.get('http://localhost:3000/api/church-activities');
                setchurchActivity(response.data);
                setLoadingChurchActivity(false);
            } catch (error) {
                setErrorChurchActivity('Failed to fetch church activity.');
                setLoadingChurchActivity(false);
            }
        };
        fetchChurchActivity();
    }, []);

    useEffect(() => {
        const fetchMonthlyActivity = async () => {
            try {
                const response = await Axios.get('http://localhost:3000/api/event-table');
                setMonthlyActivity(response.data);
                setLoadingMonthlyActivity(false);
            } catch (error) {
                setErrorMonthlyActivity('Failed to fetch monthly activity.');
                setLoadingMonthlyActivity(false);
            }
        };
        fetchMonthlyActivity();
    }, []);



      // Handlers for birthdays
      const handleAddBirthday = () => {
        setCurrentEditBirthday(null);
        setModalOpenBirthday(true);
    };

    const handleEditBirthday = (item) => {
        setCurrentEditBirthday(item);
        setModalOpenBirthday(true);
    };

    const handleDeleteBirthday = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this event?');
        if (confirmed) {
            try {
                await Axios.delete(`http://localhost:3000/api/birthdays/${id}`);
                setBirthday(birthday.filter(item => item.id !== id));
            } catch (error) {
                console.error('Error deleting event:', error);
            }
        }
        alert("Image sucessfully deleted!");

    };

    const handleSubmitBirthday = async (newData) => {
        const formData = new FormData();
        formData.append('title', newData.title);
        formData.append('description', newData.description);
        if (newData.image) formData.append('image', newData.image);

        try {
            if (currentEditBirthday) {
                // Update Event
                const response = await Axios.put(`http://localhost:3000/api/birthdays/${currentEditBirthday.id}`, formData);
                setBirthday(birthday.map(item => item.id === currentEditBirthday.id ? response.data : item));
            } else {
                // Create Event
                const response = await Axios.post('http://localhost:3000/api/birthdays', formData);
                setBirthday([...birthday, response.data]);
            }
        } catch (error) {
            console.error('Error submitting birthday:', error);
        }
        setModalOpenBirthday(false);
        alert("Image sucessfully uploaded!");
    };

       // Handlers for weddings
       const handleAddWeddings = () => {
        setCurrentEditWeddings(null);
        setModalOpenWeddings(true);
    };

    const handleEditWeddings = (item) => {
        setCurrentEditWeddings(item);
        setModalOpenWeddings(true);
    };

    const handleDeleteWeddings = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this wedding?');
        if (confirmed) {
            try {
                await Axios.delete(`http://localhost:3000/api/weddings/${id}`);
                setWeddings(weddings.filter(item => item.id !== id));
            } catch (error) {
                console.error('Error deleting event:', error);
            }
        }
        alert("Image sucessfully deleted!");

    };

    const handleSubmitWeddings = async (newData) => {
        console.log("Submitting new wedding data:", newData);

        const formData = new FormData();
        formData.append('title', newData.title);
        formData.append('description', newData.description);
        if (newData.image) formData.append('image', newData.image);

        try {
            if (currentEditWeddings) {
                // Update wedding
                const response = await Axios.put(`http://localhost:3000/api/weddings/${currentEditWeddings.id}`, formData);
                setWeddings(weddings.map(item => item.id === currentEditWeddings.id ? response.data : item));
            } else {
                // Create wedding
                const response = await Axios.post('http://localhost:3000/api/weddings', formData);
                setWeddings([...weddings, response.data]);
            }
        } catch (error) {
            console.error('Error submitting birthday:', error);
        }
        setModalOpenWeddings(false);
        alert("Image sucessfully uploaded!");

    };

        // Handlers for next week service
        const handleAddNewNextWeekService = () => {
            setCurrentEditNextWeekService(null);
            setModalOpenNextWeekService(true);
        };
    
        const handleEditNextWeekService = (item) => {
            setCurrentEditNextWeekService(item);
            setModalOpenNextWeekService(true);
        };
    
        const handleDeleteNextWeekService = async (id) => {
            const confirmed = window.confirm('Are you sure you want to delete this service item?');
            if (confirmed) {
                try {
                    await Axios.delete(`http://localhost:3000/api/next-week-service/${id}`);
                    setNextWeekService(nextWeekService.filter(item => item.id !== id));
                } catch (error) {
                    console.error('Error deleting news item:', error);
                }
            }
            alert("Item sucessfully deleted!");

        };
    
    
        const handleSubmitNextWeekService = async (newData) => {
            console.log('New Data:', newData);  // Log form data here
           
            const serviceData = {
                occasion_title: newData.occasion_title,
                theme_title: newData.theme_title,
                preacher_title: newData.preacher_title,
                bible_reading_1: newData.bible_reading_1,
                bible_reading_2: newData.bible_reading_2,
                bible_reading_3: newData.bible_reading_3,
                suggested_hymns: newData.suggested_hymns
            };
            
        
            try {
                if (currentEditNextWeekService) {
                    // Update service
                    const response = await Axios.put(`http://localhost:3000/api/next-week-service/${currentEditNextWeekService.id}`, serviceData);
                    setNextWeekService(nextWeekService.map(item => item.id === currentEditNextWeekService.id ? response.data : item));
                } else {
                    // Create service
                    const response = await Axios.post('http://localhost:3000/api/next-week-service', serviceData);
                    setNextWeekService([...nextWeekService, response.data]);
                    console.log("data submitted:", serviceData);
                }
            } catch (error) {
                console.error('Error submitting service item:', error);
            }
            setModalOpenNextWeekService(false);
            alert("Item sucessfully added!");

        };
        

      // Handlers for church activity
      const handleAddNewChurchActivity = () => {
        setCurrentEditChurchActivity(null);
        setModalOpenChurchActivity(true);
    };

    const handleEditChurchActivity = (item) => {
        setCurrentEditChurchActivity(item);
        setModalOpenChurchActivity(true);
    };

    const handleDeleteChurchActivity = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this church activity?');
        if (confirmed) {
            try {
                await Axios.delete(`http://localhost:3000/api/church-activities/${id}`);
                setchurchActivity(churchActivity.filter(item => item.id !== id));
            } catch (error) {
                console.error('Error deleting news item:', error);
            }
        }
        alert("Item sucessfully deleted!");

    };

    const handleSubmitChurchActivity = async (newData) => {
        console.log('New Data:', newData);  
       
        const serviceData = {
            title: newData.title,
            time: newData.time,
        };
        
    
        try {
            if (currentEditChurchActivity) {
                // Update activity
                const response = await Axios.put(`http://localhost:3000/api/church-activities/${currentEditChurchActivity.id}`, serviceData);
                setchurchActivity(churchActivity.map(item => item.id === currentEditChurchActivity.id ? response.data : item));
            } else {
                // Create activity
                const response = await Axios.post('http://localhost:3000/api/church-activities', serviceData);
                setchurchActivity([...churchActivity, response.data]);
                console.log("data submitted:", serviceData);
            }
        } catch (error) {
            console.error('Error submitting service item:', error);
        }
        setModalOpenChurchActivity(false);
        alert("Activity sucessfully added!");

    };


    // Handlers for monthly activity activity
    const handleAddNewMonthlyActivity = () => {
        setCurrentEditMonthlyActivity(null);
        setModalOpenMonthlyActivity(true);
    };

    const handleEditMonthlyActivity = (item) => {
        setCurrentEditMonthlyActivity(item);
        setModalOpenMonthlyActivity(true);
    };

    const handleDeleteMonthlyActivity = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this monthly activity?');
        if (confirmed) {
            try {
                await Axios.delete(`http://localhost:3000/api/event-table/${id}`);
                setMonthlyActivity(monthlyActivity.filter(item => item.id !== id));
            } catch (error) {
                console.error('Error deleting news item:', error);
            }
        }
        alert("Activity sucessfully deleted!");

    };

    const handleSubmitMonthlyActivity = async (newData) => {
        console.log('New Data:', newData);  
       
        const serviceData = {
            date: newData.date,
            activity: newData.activity,
        };
        
    
        try {
            if (currentEditMonthlyActivity) {
                // Update activity
                const response = await Axios.put(`http://localhost:3000/api/event-table/${currentEditMonthlyActivity.id}`, serviceData);
                setMonthlyActivity(monthlyActivity.map(item => item.id === currentEditMonthlyActivity.id ? response.data : item));
            } else {
                // Create activity
                const response = await Axios.post('http://localhost:3000/api/event-table', serviceData);
                setMonthlyActivity([...monthlyActivity, response.data]);
                console.log("data submitted:", serviceData);
            }
        } catch (error) {
            console.error('Error submitting service item:', error);
        }
        setModalOpenMonthlyActivity(false);
        alert("Activity sucessfully added!");

    };



    return (
        <div className="home-page">
           

            <h1>Birthday</h1>
            <button className="add-button" onClick={handleAddBirthday}>Add New Event</button>
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
                    {birthday.map(item => (
                        <tr key={item.id}>
                            <td><img src={`http://localhost:3000${item.image_url}`} alt="Thumbnail" className='table-image' /></td>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>
                                <button onClick={() => handleEditBirthday(item)}>Edit</button>
                                <button onClick={() => handleDeleteBirthday(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h1>Weddings</h1>
            <button className="add-button" onClick={handleAddWeddings}>Add New Event</button>
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
                    {weddings.map(item => (
                        <tr key={item.id}>
                            <td><img src={`http://localhost:3000${item.image_url}`} alt="Thumbnail" className='table-image' /></td>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>
                                <button onClick={() => handleEditWeddings(item)}>Edit</button>
                                <button onClick={() => handleDeleteWeddings(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h1>Next Week Service</h1>
            <button className="add-button" onClick={handleAddNewNextWeekService}>Add New Service</button>
            <table>
                <thead>
                    <tr>
                        <th>Occasion</th>
                        <th>Theme</th>
                        <th>Preacher</th>
                        <th>1st Bible Reading</th>
                        <th>2nd Bible Reading</th>
                        <th>3rd Bible Reading</th>
                        <th>Suggested hymns</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {nextWeekService.map(item => (
                        <tr key={item.id}>
                            <td>{item.occasion_title}</td>
                            <td>{item.theme_title}</td>
                            <td>{item.preacher_title}</td>
                            <td>{item.bible_reading_1}</td>
                            <td>{item.bible_reading_2}</td>
                            <td>{item.bible_reading_3}</td>
                            <td>{item.suggested_hymns}</td>
                            <td>
                                <button onClick={() => handleEditNextWeekService(item)}>Edit</button>
                                <button onClick={() => handleDeleteNextWeekService(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h1>Church Activity</h1>
            <button className="add-button" onClick={handleAddNewChurchActivity}>Add New Activity</button>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Time</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {churchActivity.map(item => (
                        <tr key={item.id}>
                            <td>{item.title}</td>
                            <td>{item.time}</td>
                            <td>
                                <button onClick={() => handleEditChurchActivity(item)}>Edit</button>
                                <button onClick={() => handleDeleteChurchActivity(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h1>Event Table</h1>
            <button className="add-button" onClick={handleAddNewMonthlyActivity}>Add New Event</button>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Activity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {monthlyActivity.map(item => (
                        <tr key={item.id}>
                            <td>{item.date}</td>
                            <td>{item.activity}</td>
                            <td>
                                <button onClick={() => handleEditMonthlyActivity(item)}>Edit</button>
                                <button onClick={() => handleDeleteMonthlyActivity(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

         
            <Modal
                show={modalOpenBirthday}
                onClose={() => setModalOpenBirthday(false)}
                onSubmit={handleSubmitBirthday}
                title={currentEditBirthday ? "Edit Birthday" : "Add New Birthday"}
                currentData={currentEditBirthday}
            />
            <Modal
                show={modalOpenWeddings}
                onClose={() => setModalOpenWeddings(false)}
                onSubmit={handleSubmitWeddings}
                title={currentEditWeddings ? "Edit weddings" : "Add New weddings"}
                currentData={currentEditWeddings}
            />
            <Modal2
                show={modalOpenNextWeekService}
                onClose={() => setModalOpenNextWeekService(false)}
                onSubmit={handleSubmitNextWeekService}
                title={currentEditNextWeekService ? "Edit service" : "Add New service"}
                currentData={currentEditNextWeekService}
            />
            <Modal3
                show={modalOpenChurchActivity}
                onClose={() => setModalOpenChurchActivity(false)}
                onSubmit={handleSubmitChurchActivity}
                title={currentEditChurchActivity ? "Edit activity" : "Add New activity"}
                currentData={currentEditChurchActivity}
            />
            <Modal4
                show={modalOpenMonthlyActivity}
                onClose={() => setModalOpenMonthlyActivity(false)}
                onSubmit={handleSubmitMonthlyActivity}
                title={currentEditMonthlyActivity ? "Edit activity" : "Add New activity"}
                currentData={currentEditMonthlyActivity}
            />
        </div>
    );
};

export default Home;


import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import Modal2 from './Modal2';
import Modal3 from './Modal3';
import Modal4 from './Modal4';


import Axios from 'axios';
import './allPages.css';

const Home = () => {
    // State for Latest News
    const [latestNews, setLatestNews] = useState([]);
    const [loadingNews, setLoadingNews] = useState(true);
    const [errorNews, setErrorNews] = useState(null);
    const [modalOpenNews, setModalOpenNews] = useState(false);
    const [currentEditNews, setCurrentEditNews] = useState(null);
    
    // State for Upcoming Events
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [loadingEvents, setLoadingEvents] = useState(true);
    const [errorEvents, setErrorEvents] = useState(null);
    const [modalOpenEvents, setModalOpenEvents] = useState(false);
    const [currentEditEvents, setCurrentEditEvents] = useState(null);


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
 

    // Fetch Latest News
    useEffect(() => {
        const fetchLatestNews = async () => {
            try {
                const response = await Axios.get('http://localhost:3000/api/latest-news');
                setLatestNews(response.data);
                setLoadingNews(false);
            } catch (error) {
                setErrorNews('Failed to fetch latest news.');
                setLoadingNews(false);
            }
        };
        fetchLatestNews();
    }, []);

    // Fetch Upcoming Events
    useEffect(() => {
        const fetchUpcomingEvents = async () => {
            try {
                const response = await Axios.get('http://localhost:3000/api/upcoming-events');
                setUpcomingEvents(response.data);
                setLoadingEvents(false);
            } catch (error) {
                setErrorEvents('Failed to fetch upcoming events.');
                setLoadingEvents(false);
            }
        };
        fetchUpcomingEvents();
    }, []);

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


    // Handlers for Latest News
    const handleAddNewNews = () => {
        setCurrentEditNews(null);
        setModalOpenNews(true);
    };

    const handleEditNews = (item) => {
        setCurrentEditNews(item);
        setModalOpenNews(true);
    };

    const handleDeleteNews = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this news item?');
        if (confirmed) {
            try {
                await Axios.delete(`http://localhost:3000/api/latest-news/${id}`);
                setLatestNews(latestNews.filter(item => item.id !== id));
            } catch (error) {
                console.error('Error deleting news item:', error);
            }
        }
    };

    const handleSubmitNews = async (newData) => {
        const formData = new FormData();
        formData.append('title', newData.title);
        formData.append('description', newData.description);
        if (newData.image) formData.append('image', newData.image);

        try {
            if (currentEditNews) {
                // Update News
                const response = await Axios.put(`http://localhost:3000/api/latest-news/${currentEditNews.id}`, formData);
                setLatestNews(latestNews.map(item => item.id === currentEditNews.id ? response.data : item));
            } else {
                // Create News
                const response = await Axios.post('http://localhost:3000/api/latest-news', formData);
                setLatestNews([...latestNews, response.data]);
            }
        } catch (error) {
            console.error('Error submitting news item:', error);
        }
        setModalOpenNews(false);
    };

    // Handlers for Upcoming Events
    const handleAddNewEvent = () => {
        setCurrentEditEvents(null);
        setModalOpenEvents(true);
    };

    const handleEditEvent = (item) => {
        setCurrentEditEvents(item);
        setModalOpenEvents(true);
    };

    const handleDeleteEvent = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this event?');
        if (confirmed) {
            try {
                await Axios.delete(`http://localhost:3000/api/upcoming-events/${id}`);
                setUpcomingEvents(upcomingEvents.filter(item => item.id !== id));
            } catch (error) {
                console.error('Error deleting event:', error);
            }
        }
    };

    const handleSubmitEvent = async (newData) => {
        console.log("Submitting new event data:", newData);

        const formData = new FormData();
        formData.append('title', newData.title);
        formData.append('description', newData.description);
        if (newData.image) formData.append('image', newData.image);

        try {
            if (currentEditEvents) {
                // Update Event
                const response = await Axios.put(`http://localhost:3000/api/upcoming-events/${currentEditEvents.id}`, formData);
                setUpcomingEvents(upcomingEvents.map(item => item.id === currentEditEvents.id ? response.data : item));
            } else {
                // Create Event
                const response = await Axios.post('http://localhost:3000/api/upcoming-events', formData);
                setUpcomingEvents([...upcomingEvents, response.data]);
            }
        } catch (error) {
            console.error('Error submitting event:', error);
        }
        setModalOpenEvents(false);
    };

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
                setBirthday(upcomingEvents.filter(item => item.id !== id));
            } catch (error) {
                console.error('Error deleting event:', error);
            }
        }
    };

    const handleSubmitBirthday = async (newData) => {
        console.log("Submitting new birthday data:", newData);

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
    };



    return (
        <div className="home-page">
            {/* Latest News Section */}
            <h1>Latest News</h1>
            <button className="add-button" onClick={handleAddNewNews}>Add New News</button>
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
                    {latestNews.map(item => (
                        <tr key={item.id}>
                            <td><img src={`http://localhost:3000${item.image_url}`} alt="Thumbnail" className='table-image' /></td>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>
                                <button onClick={() => handleEditNews(item)}>Edit</button>
                                <button onClick={() => handleDeleteNews(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Upcoming Events Section */}
            <h1>Upcoming Events</h1>
            <button className="add-button" onClick={handleAddNewEvent}>Add New Event</button>
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
                    {upcomingEvents.map(item => (
                        <tr key={item.id}>
                            <td><img src={`http://localhost:3000${item.image_url}`} alt="Thumbnail" className='table-image' /></td>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>
                                <button onClick={() => handleEditEvent(item)}>Edit</button>
                                <button onClick={() => handleDeleteEvent(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

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

            {/* Modals for both News and Events */}
            <Modal
                show={modalOpenNews}
                onClose={() => setModalOpenNews(false)}
                onSubmit={handleSubmitNews}
                title={currentEditNews ? "Edit News" : "Add New News"}
                currentData={currentEditNews}
            />
            <Modal
                show={modalOpenEvents}
                onClose={() => setModalOpenEvents(false)}
                onSubmit={handleSubmitEvent}
                title={currentEditEvents ? "Edit Event" : "Add New Event"}
                currentData={currentEditEvents}
            />
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


// import React, { useState, useEffect } from 'react';
// import Modal from '../components/Modal';
// import Axios from 'axios';
// import './allPages.css';

// const Home = () => {
//     // Latest News
//     const [newsModalOpen, setNewsModalOpen] = useState(false);
//     const [currentNewsData, setCurrentNewsData] = useState(null);
//     const [newsItems, setNewsItems] = useState([]);
//     const [newsLoading, setNewsLoading] = useState(true);
//     const [newsError, setNewsError] = useState(null);

//     // Upcoming Events
//     const [eventsModalOpen, setEventsModalOpen] = useState(false);
//     const [currentEventData, setCurrentEventData] = useState(null);
//     const [eventsItems, setEventsItems] = useState([]);
//     const [eventsLoading, setEventsLoading] = useState(true);
//     const [eventsError, setEventsError] = useState(null);

//     // Birthdays
//     const [birthdaysModalOpen, setBirthdaysModalOpen] = useState(false);
//     const [currentBirthdayData, setCurrentBirthdayData] = useState(null);
//     const [birthdaysItems, setBirthdaysItems] = useState([]);
//     const [birthdaysLoading, setBirthdaysLoading] = useState(true);
//     const [birthdaysError, setBirthdaysError] = useState(null);

//     // Fetch Latest News Items
//     useEffect(() => {
//         const fetchNewsItems = async () => {
//             try {
//                 const response = await Axios.get('http://localhost:3000/api/latest-news');
//                 setNewsItems(response.data);
//                 setNewsLoading(false);
//             } catch (error) {
//                 console.error('Error fetching news:', error);
//                 setNewsError('Failed to fetch news.');
//                 setNewsLoading(false);
//             }
//         };
//         fetchNewsItems();
//     }, []);

//     // Fetch Upcoming Events
//     useEffect(() => {
//         const fetchEventsItems = async () => {
//             try {
//                 const response = await Axios.get('http://localhost:3000/api/upcoming-events');
//                 setEventsItems(response.data);
//                 setEventsLoading(false);
//             } catch (error) {
//                 console.error('Error fetching events:', error);
//                 setEventsError('Failed to fetch events.');
//                 setEventsLoading(false);
//             }
//         };
//         fetchEventsItems();
//     }, []);

//     // Fetch Birthdays
//     useEffect(() => {
//         const fetchBirthdaysItems = async () => {
//             try {
//                 const response = await Axios.get('http://localhost:3000/api/birthdays');
//                 setBirthdaysItems(response.data);
//                 setBirthdaysLoading(false);
//             } catch (error) {
//                 console.error('Error fetching birthdays:', error);
//                 setBirthdaysError('Failed to fetch birthdays.');
//                 setBirthdaysLoading(false);
//             }
//         };
//         fetchBirthdaysItems();
//     }, []);

//     // Functions for handling each section's data:
//     const handleAddNews = () => {
//         setCurrentNewsData(null);
//         setNewsModalOpen(true);
//     };

//     const handleAddEvent = () => {
//         setCurrentEventData(null);
//         setEventsModalOpen(true);
//     };

//     const handleAddBirthday = () => {
//         setCurrentBirthdayData(null);
//         setBirthdaysModalOpen(true);
//     };


//     const handleSubmit = async (newData, section) => {
//         const formData = new FormData();
//         formData.append('title', newData.title);
//         formData.append('description', newData.description);
//         if (newData.image) {
//             formData.append('image', newData.image);
//         }

//         try {
//             if (currentEditData) {
//                 const response = await Axios.put(`http://localhost:3000/api/${section}/${currentEditData.id}`, formData, {
//                     headers: { 'Content-Type': 'multipart/form-data' }
//                 });
//                 if (section === 'latest-news') {
//                     setLatestNews(latestNews.map(item => item.id === currentEditData.id ? response.data : item));
//                 } else if (section === 'upcoming-events') {
//                     setUpcomingEvents(upcomingEvents.map(item => item.id === currentEditData.id ? response.data : item));
//                 }
//             } else {
//                 const response = await Axios.post(`http://localhost:3000/api/${section}`, formData, {
//                     headers: { 'Content-Type': 'multipart/form-data' }
//                 });
//                 if (section === 'latest-news') {
//                     setLatestNews([...latestNews, response.data]);
//                 } else if (section === 'upcoming-events') {
//                     setUpcomingEvents([...upcomingEvents, response.data]);
//                 }
//             }
//         } catch (error) {
//             console.error('Error adding/updating item:', error);
//         }

//         setModalOpen(false);
//     };

//     // Similar edit and delete handlers for each section can be created
//     // ...

//     return (
//         <div className="home-page">
//             <h1>Latest News</h1>
//             <button className="add-button" onClick={handleAddNews}>Add New</button>
//             {/* Render Latest News Table */}
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Image</th>
//                         <th>Title</th>
//                         <th>Description</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {newsItems.map(item => (
//                         <tr key={item.id}>
//                             <td><img src={`http://localhost:3000${item.image_url}`} alt="Thumbnail" className='table-image'></img></td>
//                             <td>{item.title}</td>
//                             <td>{item.description}</td>
//                             <td>
//                                 {/* Add edit and delete buttons */}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             <h1>Upcoming Events</h1>
//             <button className="add-button" onClick={handleAddEvent}>Add New</button>
//             {/* Render Upcoming Events Table */}
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Image</th>
//                         <th>Title</th>
//                         <th>Description</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {eventsItems.map(item => (
//                         <tr key={item.id}>
//                             <td><img src={`http://localhost:3000${item.image_url}`} alt="Thumbnail" className='table-image'></img></td>
//                             <td>{item.title}</td>
//                             <td>{item.description}</td>
//                             <td>
//                                 {/* Add edit and delete buttons */}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             <h1>Birthdays</h1>
//             <button className="add-button" onClick={handleAddBirthday}>Add New</button>
//             {/* Render Birthdays Table */}
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Image</th>
//                         <th>Title</th>
//                         <th>Description</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {birthdaysItems.map(item => (
//                         <tr key={item.id}>
//                             <td><img src={`http://localhost:3000${item.image_url}`} alt="Thumbnail" className='table-image'></img></td>
//                             <td>{item.title}</td>
//                             <td>{item.description}</td>
//                             <td>
//                                 {/* Add edit and delete buttons */}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {/* Add separate modals for each section */}
//             <Modal
//                 show={newsModalOpen}
//                 onClose={() => setNewsModalOpen(false)}
//                 onSubmit={handleSubmit}
//                 title={currentNewsData ? "Edit News" : "Add New News"}
//                 currentData={currentNewsData}
//             />

//             <Modal
//                 show={eventsModalOpen}
//                 onClose={() => setEventsModalOpen(false)}
//                 onSubmit={handleSubmit}
//                 title={currentEventData ? "Edit Event" : "Add New Event"}
//                 currentData={currentEventData}
//             />

//             <Modal
//                 show={birthdaysModalOpen}
//                 onClose={() => setBirthdaysModalOpen(false)}
//                 onSubmit={handleSubmit}
//                 title={currentBirthdayData ? "Edit Birthday" : "Add New Birthday"}
//                 currentData={currentBirthdayData}
//             />
//         </div>
//     );
// };

// export default Home;



// import React, { useState, useEffect } from 'react';
// import Modal from '../components/Modal';
// import Axios  from 'axios';
// import "./allPages.css"

// const Home = () => {
//     // Latest News
//     const [newsModalOpen, setNewsModalOpen] = useState(false);
//     const [currentNewsData, setCurrentNewsData] = useState(null);
//     const [newsItems, setNewsItems] = useState([]);
//     const [newsLoading, setNewsLoading] = useState(true);
//     const [newsError, setNewsError] = useState(null);

//     // Upcoming Events
//     const [eventsModalOpen, setEventsModalOpen] = useState(false);
//     const [currentEventData, setCurrentEventData] = useState(null);
//     const [eventsItems, setEventsItems] = useState([]);
//     const [eventsLoading, setEventsLoading] = useState(true);
//     const [eventsError, setEventsError] = useState(null);

//     // Birthdays
//     const [birthdaysModalOpen, setBirthdaysModalOpen] = useState(false);
//     const [currentBirthdayData, setCurrentBirthdayData] = useState(null);
//     const [birthdaysItems, setBirthdaysItems] = useState([]);
//     const [birthdaysLoading, setBirthdaysLoading] = useState(true);
//     const [birthdaysError, setBirthdaysError] = useState(null);

//     useEffect(() => {
//         const fetchLatestNews = async () => {
//             try {
//                 const response = await Axios.get('http://localhost:3000/api/latest-news'); 
//                 setItems(response.data);
//                 setLoading(false); 
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//                 setError('Failed to fetch items.'); 
//                 setLoading(false); 
//             }
//         };
//         fetchLatestNews();
//     }, []);

//     // Fetch Upcoming Events
//     useEffect(() => {
//         const fetchUpcomingEvents = async () => {
//             try {
//                 const response = await Axios.get('http://localhost:3000/api/upcoming-events');
//                 setUpcomingEvents(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching Upcoming Events:', error);
//                 setError('Failed to fetch Upcoming Events.');
//                 setLoading(false);
//             }
//         };
//         fetchUpcomingEvents();
//     }, []);

//      // Fetch Birthdays
//      useEffect(() => {
//         const fetchBirthdaysItems = async () => {
//             try {
//                 const response = await Axios.get('http://localhost:3000/api/birthdays');
//                 setBirthdaysItems(response.data);
//                 setBirthdaysLoading(false);
//             } catch (error) {
//                 console.error('Error fetching birthdays:', error);
//                 setBirthdaysError('Failed to fetch birthdays.');
//                 setBirthdaysLoading(false);
//             }
//         };
//         fetchBirthdaysItems();
//     }, []);


//     // Functions for handling each section's data:
//     const handleAddNews = () => {
//         setCurrentNewsData(null);
//         setNewsModalOpen(true);
//     };

//     const handleAddEvent = () => {
//         setCurrentEventData(null);
//         setEventsModalOpen(true);
//     };

//     const handleAddBirthday = () => {
//         setCurrentBirthdayData(null);
//         setBirthdaysModalOpen(true);
//     };

//     //Functions for handling each section's edit
   

//     // const handleEdit = (item) => {
//     //     setCurrentEditData(item);
//     //     setModalOpen(true);
//     // };

//     const handleEditNews = async (newsItem) => {
//         const { id, title, description, image } = newsItem;
//         const formData = new FormData();
//         formData.append('title', title);
//         formData.append('description', description);
//         if (image) {
//             formData.append('image', image); // Append image if provided
//         }
    
//         try {
//             const response = await Axios.put(`http://localhost:3000/api/latest-news/${id}`, formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' }
//             });
//             setItems(items.map(item => item.id === id ? response.data : item)); // Update the item in the list
//         } catch (error) {
//             console.error('Error updating news item:', error);
//         }
//     };

//     const handleEditEvent = async (eventItem) => {
//         const { id, title, description, image } = eventItem;
//         const formData = new FormData();
//         formData.append('title', title);
//         formData.append('description', description);
//         if (image) {
//             formData.append('image', image);
//         }
    
//         try {
//             const response = await Axios.put(`http://localhost:3000/api/upcoming-events/${id}`, formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' }
//             });
//             setItems(items.map(item => item.id === id ? response.data : item));
//         } catch (error) {
//             console.error('Error updating event:', error);
//         }
//     };

//     const handleEditBirthday = async (birthdayItem) => {
//         const { id, title, description, image } = birthdayItem;
//         const formData = new FormData();
//         formData.append('title', title);
//         formData.append('description', description);
//         if (image) {
//             formData.append('image', image);
//         }
    
//         try {
//             const response = await Axios.put(`http://localhost:3000/api/birthdays/${id}`, formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' }
//             });
//             setItems(items.map(item => item.id === id ? response.data : item));
//         } catch (error) {
//             console.error('Error updating birthday item:', error);
//         }
//     };
    
//     const handleDelete = async (id, section) => {
//         const confirmed = window.confirm('Are you sure you want to delete?');
//         if (confirmed) {
//             try {
//                 await Axios.delete(`http://localhost:3000/api/${section}/${id}`);
    
//                 // Dynamically update the corresponding section's state
//                 switch (section) {
//                     case 'latest-news':
//                         setLatestNews(latestNews.filter(item => item.id !== id));
//                         break;
//                     case 'upcoming-events':
//                         setUpcomingEvents(upcomingEvents.filter(item => item.id !== id));
//                         break;
//                     // Add cases for other sections
//                     case 'birthdays':
//                         setBirthdays(birthdays.filter(item => item.id !== id));
//                         break;
//                     case 'weddings':
//                         setWeddings(weddings.filter(item => item.id !== id));
//                         break;
//                     default:
//                         console.warn(`Unknown section: ${section}`);
//                 }
//             } catch (error) {
//                 console.error('Error deleting item:', error);
//             }
//         }
//     };
    
    

    

    // const handleSubmit = async (newData, section) => {
    //     const formData = new FormData();
    //     formData.append('title', newData.title);
    //     formData.append('description', newData.description);
    //     if (newData.image) {
    //         formData.append('image', newData.image);
    //     }

    //     try {
    //         if (currentEditData) {
    //             const response = await Axios.put(`http://localhost:3000/api/${section}/${currentEditData.id}`, formData, {
    //                 headers: { 'Content-Type': 'multipart/form-data' }
    //             });
    //             if (section === 'latest-news') {
    //                 setLatestNews(latestNews.map(item => item.id === currentEditData.id ? response.data : item));
    //             } else if (section === 'upcoming-events') {
    //                 setUpcomingEvents(upcomingEvents.map(item => item.id === currentEditData.id ? response.data : item));
    //             }
    //         } else {
    //             const response = await Axios.post(`http://localhost:3000/api/${section}`, formData, {
    //                 headers: { 'Content-Type': 'multipart/form-data' }
    //             });
    //             if (section === 'latest-news') {
    //                 setLatestNews([...latestNews, response.data]);
    //             } else if (section === 'upcoming-events') {
    //                 setUpcomingEvents([...upcomingEvents, response.data]);
    //             }
    //         }
    //     } catch (error) {
    //         console.error('Error adding/updating item:', error);
    //     }

    //     setModalOpen(false);
    // };
    

    // return (
    //     <div className="home-page">
    //         <h1>Latest News</h1>
    //         <button className="add-button" onClick={handleAddNews}>Add New</button>
           
    //         <table>
    //             <thead>
    //                 <tr>
    //                     <th>Image</th>
    //                     <th>Title</th>
    //                     <th>Description</th>
    //                     <th>Actions</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {newsItems.map(item => (
    //                     <tr key={item.id}>
    //                         <td><img src={`http://localhost:3000${item.image_url}`} alt="Thumbnail" className='table-image'></img></td>
    //                         <td>{item.title}</td>
    //                         <td>{item.description}</td>
    //                         <td>
    //                             <button onClick={() => handleEdit(item)}>Edit</button>
    //                             <button onClick={() => handleDelete(item.id)}>Delete</button>
    //                         </td>
    //                     </tr>
    //                 ))}
    //             </tbody>
    //         </table>

    //         <h1>Upcoming Events</h1>
    //         <button className="add-button" onClick={handleAddEvent}>Add New</button>
            
    //         <table>
    //             <thead>
    //                 <th>Image</th>
    //                 <th>Title</th>
    //                 <th>Description</th>
    //                 <th>Actions</th>
    //             </thead>
    //             <tbody>
    //                 {eventsItems.map(item => (
    //                     <tr key={item.id}>
    //                         <td><img src={`http://localhost:3000${item.image_url}`} alt="Thumbnail" className='table-image'></img></td>
    //                         <td>{item.title}</td>
    //                         <td>{item.description}</td>
    //                         <td>
    //                             <button onClick={() => handleEdit(item)}>Edit</button>
    //                             <button onClick={() => handleDelete(item.id)}>Delete</button>
    //                         </td>
    //                     </tr>
    //                 ))}
    //             </tbody>
    //         </table>

    //         <h1>Birthdays</h1>
    //         <button className="add-button" onClick={handleAddBirthday}>Add New</button>
            
    //         <table>
    //             <thead>
    //                 <th>Image</th>
    //                 <th>Title</th>
    //                 <th>Description</th>
    //                 <th>Actions</th>
    //             </thead>
    //             <tbody>
    //                 {birthdaysItems.map(item => (
    //                     <tr key={item.id}>
    //                         <td><img src={`http://localhost:3000${item.image_url}`} alt="Thumbnail" className='table-image'></img></td>
    //                         <td>{item.title}</td>
    //                         <td>{item.description}</td>
    //                         <td>
    //                             <button onClick={() => handleEdit(item)}>Edit</button>
    //                             <button onClick={() => handleDelete(item.id)}>Delete</button>
    //                         </td>
    //                     </tr>
    //                 ))}
    //             </tbody>
    //         </table>

    //         <h1>Weddings</h1>
    //         <button className="add-button" onClick={handleAddNew}>Add New</button>
            
    //         <table>
    //             <thead>
    //                 <th>Image</th>
    //                 <th>Title</th>
    //                 <th>Description</th>
    //                 <th>Actions</th>
    //             </thead>
    //             <tbody>
    //                 {items.map(item => (
    //                     <tr key={item.id}>
    //                         <td><img src={`http://localhost:3000${item.image_url}`} alt="Thumbnail" className='table-image'></img></td>
    //                         <td>{item.title}</td>
    //                         <td>{item.description}</td>
    //                         <td>
    //                             <button onClick={() => handleEdit(item)}>Edit</button>
    //                             <button onClick={() => handleDelete(item.id)}>Delete</button>
    //                         </td>
    //                     </tr>
    //                 ))}
    //             </tbody>
    //         </table>

    //         <h1>Next Week Service</h1>
    //         <button className="add-button" onClick={handleAddNew}>Add New</button>
            
    //         <table>
    //             <thead>
    //                 <th>Occasion</th>
    //                 <th>Theme</th>
    //                 <th>Preacher</th>
    //                 <th>1st Bible Reading</th>
    //                 <th>2nd Bible Reading</th>
    //                 <th>3rd Bible Reading</th>
    //                 <th>Suggested hymns</th>
    //                 <th>Actions</th>
    //             </thead>
    //             <tbody>
    //                 {items.map(item => (
    //                     <tr key={item.id}>
    //                         <td>{item.occasion}</td>
    //                         <td>{item.theme}</td>
    //                         <td>{item.preacher}</td>
    //                         <td>{item.first_bible_reading}</td>
    //                         <td>{item.second_bible_reading}</td>
    //                         <td>{item.third_bible_reading}</td>
    //                         <td>{item.suggested_hymns}</td>
    //                         <td>
    //                             <button onClick={() => handleEdit(item)}>Edit</button>
    //                             <button onClick={() => handleDelete(item.id)}>Delete</button>
    //                         </td>
    //                     </tr>
    //                 ))}
    //             </tbody>
    //         </table>

    //         <h1>Church Activities</h1>
    //         <button className="add-button" onClick={handleAddNew}>Add New</button>
            
    //         <table>
    //             <thead>
    //                 <th>Title</th>
    //                 <th>Time</th>
    //                 <th>Actions</th>
    //             </thead>
    //             <tbody>
    //                 {items.map(item => (
    //                     <tr key={item.id}>
    //                         <td>{item.title}</td>
    //                         <td>{item.time}</td>
    //                         <td>
    //                             <button onClick={() => handleEdit(item)}>Edit</button>
    //                             <button onClick={() => handleDelete(item.id)}>Delete</button>
    //                         </td>
    //                     </tr>
    //                 ))}
    //             </tbody>
    //         </table>

    //         <h1>Event Table</h1>
    //         <button className="add-button" onClick={handleAddNew}>Add New</button>
            
    //         <table>
    //             <thead>
    //                 <th>Date</th>
    //                 <th>Activity</th>
    //                 <th>Actions</th>
    //             </thead>
    //             <tbody>
    //                 {items.map(item => (
    //                     <tr key={item.id}>
    //                         <td>{item.date}</td>
    //                         <td>{item.activity}</td>
    //                         <td>
    //                             <button onClick={() => handleEdit(item)}>Edit</button>
    //                             <button onClick={() => handleDelete(item.id)}>Delete</button>
    //                         </td>
    //                     </tr>
    //                 ))}
    //             </tbody>
    //         </table>

    //         {/* <Modal
    //             show={modalOpen}
    //             onClose={() => setModalOpen(false)}
    //             onSubmit={handleSubmit}
    //             title={currentEditData ? "Edit News" : "Add New News"}
    //             currentData={currentEditData}
    //         /> */}
    //          <Modal
    //             show={modalOpen}
    //             onClose={() => setModalOpen(false)}
    //             onSubmit={(newData) => handleSubmit(newData, 'latest-news')}
    //             title={currentEditData ? "Edit News" : "Add New News"}
    //             currentData={currentEditData}
    //         />
    //     </div>
    // );
// };

// export default Home;

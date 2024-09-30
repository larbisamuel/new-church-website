import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import NewsDetails from './components/NewsDetails';
import Gallery from './components/Gallery';
import Login from './components/Login';
// import Ministries from './components/Ministries';
import ContactUs from './components/ContactUs';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <Router>
            <div className="App">
               <Navbar />
                <Routes>
                    {/* <Route path="/" element={<Login />} /> */}
                   
                    <Route path="/" element={<Home />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/news-details" element={<NewsDetails />} />
                    <Route path="/gallery" element={<Gallery />} />
                    {/* <Route path="/ministries" element={<Ministries />} /> */}
                    <Route path="/contact-us" element={<ContactUs />} />
                   

                </Routes> 
                 
            </div>
        </Router>
    );
}

export default App;

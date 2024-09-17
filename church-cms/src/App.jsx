import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import News from './components/News';
import Gallery from './components/Gallery';
import Ministries from './components/Ministries';
import ContactUs from './components/ContactUs';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/ministries" element={<Ministries />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

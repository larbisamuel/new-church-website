import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import NewsDetails from './components/NewsDetails';
import Gallery from './components/Gallery';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public route for login */}
          <Route path="/login" element={<Login />} />

          {/* Protected routes wrapped with Layout */}
          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/news-details" element={<NewsDetails />} />
              <Route path="/gallery" element={<Gallery />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

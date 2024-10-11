import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('authToken');

  return (
    <>
      {/* Render the Navbar only if the user is authenticated and not on the login page */}
      {isAuthenticated && location.pathname !== '/login' && <Navbar />}
      {/* Outlet is used here to render the nested routes */}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;


import React from 'react';
import {  Navigate, Outlet } from 'react-router-dom'; 
import { isAuthenticated } from './authService';

const PrivateRoute = ({  element: Element, ...rest }) => {
  
    return (
          isAuthenticated() ? <Outlet/> : <Navigate to="/"/>
    );
  };

export default PrivateRoute;


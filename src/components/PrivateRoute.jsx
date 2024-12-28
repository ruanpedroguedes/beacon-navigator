import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, roles }) => {
  const token = localStorage.getItem('token');
  const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : null;

  if (!token || (roles && !roles.includes(userRole))) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
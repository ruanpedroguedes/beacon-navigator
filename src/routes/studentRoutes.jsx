import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import StudentDashboard from '../pages/student/Dashboard';
import StudentLocation from '../pages/student/Location'

const studentRoutes = [
  <Route key="student-dashboard" path="/student/dashboard" element={<PrivateRoute roles={['student']}><StudentDashboard /></PrivateRoute>} />,
  <Route key="student-location" path="/student/location" element={<PrivateRoute roles={['student']}><StudentLocation /></PrivateRoute>} />
];

export default studentRoutes;
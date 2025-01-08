import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import StudentDashboard from '../pages/student/Dashboard';
import StudentLocation from '../pages/student/Location';
import TurmasAvisos from '../pages/student/StudentClassAvisos';

const studentRoutes = [
  <Route key="student-dashboard" path="/student/dashboard" element={<PrivateRoute roles={['student']}><StudentDashboard /></PrivateRoute>} />,
  <Route key="student-location" path="/student/location" element={<PrivateRoute roles={['student']}><StudentLocation /></PrivateRoute>} />,
  <Route key="student-classavisos" path="/student/turmaavisos/:classId" element={<PrivateRoute roles={['student']}><TurmasAvisos /></PrivateRoute>} />
];

export default studentRoutes;
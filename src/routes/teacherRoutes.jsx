import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import TeacherDashboard from '../pages/teacher/Dashboard';
import TeacherLocation from '../pages/teacher/Location';
import AvisosPage from '../pages/teacher/Avisos';

const teacherRoutes = [
  <Route key="teacher-dashboard" path="/teacher/dashboard" element={<PrivateRoute roles={['teacher']}><TeacherDashboard /></PrivateRoute>} />,
  <Route key="teacher-location" path="/teacher/location" element={<PrivateRoute roles={['teacher']}><TeacherLocation /></PrivateRoute>} />,
  <Route key="teacher-avisos" path="/teacher/avisos/:classId" element={<PrivateRoute roles={['teacher']}><AvisosPage /></PrivateRoute>} />
];

export default teacherRoutes;
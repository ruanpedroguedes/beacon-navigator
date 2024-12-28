import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import TeacherDashboard from '../pages/teacher/Dashboard';

const teacherRoutes = [
  <Route key="teacher-dashboard" path="/teacher/dashboard" element={<PrivateRoute roles={['teacher']}><TeacherDashboard /></PrivateRoute>} />,
  // Adicione mais rotas de professor aqui
];

export default teacherRoutes;
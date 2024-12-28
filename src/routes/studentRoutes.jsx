import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import StudentDashboard from '../pages/student/Dashboard';

const studentRoutes = [
  <Route key="student-dashboard" path="/student/dashboard" element={<PrivateRoute roles={['student']}><StudentDashboard /></PrivateRoute>} />,
  // Adicione mais rotas de aluno aqui
];

export default studentRoutes;
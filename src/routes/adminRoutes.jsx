import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import AdminDashboard from '../pages/admin/Dashboard';
import AdminUsers from '../pages/admin/Users';
import AdminTurmas from '../pages/admin/TurmasDetalhes';
import AdminLocation from '../pages/admin/Location'; // Importando o componente AdminLocation
import TurmaDetalhes from '../components/TurmaDetalhes/TurmaDetalhes';
import InformePageAdmin from '../pages/admin/Informe';

const adminRoutes = [
  <Route key="admin-dashboard" path="/admin/dashboard" element={<PrivateRoute roles={['admin']}><AdminDashboard /></PrivateRoute>} />,
  <Route key="admin-users" path="/admin/users" element={<PrivateRoute roles={['admin']}><AdminUsers /></PrivateRoute>} />,
  <Route key="admin-turmas" path="/admin/turmas-detalhes" element={<PrivateRoute roles={['admin']}><AdminTurmas /></PrivateRoute>} />,
  <Route key="turma-detalhes" path="/admin/turmas-detalhes/:id" element={<PrivateRoute roles={['admin']}><TurmaDetalhes /></PrivateRoute>} />,
  <Route key="admin-location" path="/admin/location" element={<PrivateRoute roles={['admin']}><AdminLocation /></PrivateRoute>} />,
  <Route key="admin-informe" path="/admin/informe" element={<PrivateRoute roles={['admin']}><InformePageAdmin /></PrivateRoute>} /> // Nova rota para AdminLocation
];

export default adminRoutes;

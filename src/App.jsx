// App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Cadastro from './pages/cadastro.jsx';
import NotFound from "./components/Notfound/Notfound.jsx";
import Login from "./pages/login.jsx";
import Admin from './pages/admin'; // Página do Admin
import Teacher from './pages/teacher'; // Atualize o caminho para o componente correto
import Student from "./pages/student";
import Usuario from './pages/usuario'; // Página do Usuário
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<PrivateRoute roles={['admin']}><Admin /></PrivateRoute>} />
        <Route path="/teacher" element={<PrivateRoute roles={['teacher']}><Teacher /></PrivateRoute>} />
        <Route path="/student" element={<PrivateRoute roles={['student']}><Student /></PrivateRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
// App.js

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Cadastro from './pages/cadastro.jsx';
import NotFound from "./components/Notfound/Notfound.jsx";
import Login from "./pages/login.jsx";
import Admin from './pages/admin'; // Página do Admin
import Usuario from './pages/usuario'; // Página do Usuário

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path='/cadastro' element={<Cadastro />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin' element={<Admin />} /> {/* Tela de Admin */}
          <Route path='/usuario' element={<Usuario />} /> {/* Tela de Usuário */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

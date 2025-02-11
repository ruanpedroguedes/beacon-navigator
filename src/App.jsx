import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Cadastro from './pages/Cadastro';
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Beacon from "./pages/BeaconConect";
import allRoutes from './routes';
import HomePage from "./pages/HomePage";
import InformesBeacon from "./pages/InformeGlobal"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/informesBeacon" element={<InformesBeacon />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/beacon" element={<Beacon/>} />
        <Route path="/login" element={<Login />} />
        {allRoutes}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
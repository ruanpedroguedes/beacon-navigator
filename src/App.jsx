import React from "react"
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Cadastro from './pages/cadastro.jsx'
import NotFound from "./components/Notfound/Notfound.jsx"

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/cadastro" />} />
        <Route path='/cadastro' element={<Cadastro/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App

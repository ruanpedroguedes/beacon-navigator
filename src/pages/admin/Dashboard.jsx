import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CriarTurma from '../../components/CriarTurma/CriarTurma'

const AdminDashboard = () => {
  return (
    <>
    <Header/>
    <main>
      <h1>Turmas</h1>
      <CriarTurma/>
    </main>
    <Footer/>
    </>
  );
};

export default AdminDashboard;
import React from 'react';
import Header from '../../components/Header/Header';
import FooterAdmin from '../../components/FooterAdmin/FooterAdmin'
import CriarTurma from '../../components/CriarTurma/CriarTurma'

const AdminDashboard = () => {
  return (
    <>
    <Header/>
    <main>
      <h1>Turmas</h1>
      <CriarTurma/>
    </main>
    <FooterAdmin/>
    </>
  );
};

export default AdminDashboard;
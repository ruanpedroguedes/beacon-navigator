import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import TurmaDetalhes from '../../components/TurmaDetalhes/TurmaDetalhes';

const AdminTurmas = () => {
  return (
    <>
    <Header/>
    <main>
      <TurmaDetalhes/>
    </main>
    <Footer/>
    </>
  );
};

export default AdminTurmas;
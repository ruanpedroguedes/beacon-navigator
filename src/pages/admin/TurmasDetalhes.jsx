import React from 'react';
import Header from '../../components/Header/Header';
import FooterAdmin from '../../components/FooterAdmin/FooterAdmin'
import TurmaDetalhes from '../../components/TurmaDetalhes/TurmaDetalhes';

const AdminTurmas = () => {
  return (
    <>
    <Header/>
    <main>
      <TurmaDetalhes/>
    </main>
    <FooterAdmin/>
    </>
  );
};

export default AdminTurmas;
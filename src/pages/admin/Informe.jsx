import React from 'react';
import Header from '../../components/Header/Header';
import FooterAdmin from '../../components/FooterAdmin/FooterAdmin'
import InformeAdmin from '../../components/InformeAdmin/InformeAdmin'

const InformePageAdmin = () => {
  return (
    <>
    <Header/>
    <main>
      <h1>Informes</h1>
      <InformeAdmin/>
    </main>
    <FooterAdmin/>
    </>
  );
};

export default InformePageAdmin;
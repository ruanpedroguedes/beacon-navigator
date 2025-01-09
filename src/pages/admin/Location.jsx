import React from 'react';
import Header from '../../components/Header/Header';
import FooterAdmin from '../../components/FooterAdmin/FooterAdmin'
import Location from '../../components/Location/Location';

const Localiza = () => {
    return (
      <>
      <Header/>
      <main>
        <Location/>
      </main>
      <FooterAdmin/>
      </>
    );
  };
  
  export default Localiza;
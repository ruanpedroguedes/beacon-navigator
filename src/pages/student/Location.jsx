import React from 'react';
import Header from '../../components/Header/Header';
import FooterStudent from '../../components/FooterStudent/FooterStudent'
import Location from '../../components/Location/Location';

const Localiza = () => {
    return (
      <>
      <Header/>
      <main>
        <Location/>
      </main>
      <FooterStudent/>
      </>
    );
  };
  
  export default Localiza;
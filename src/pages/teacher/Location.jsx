import React from 'react';
import Header from '../../components/Header/Header';
import FooterTeacher from '../../components/FooterTeacher/FooterTeacher'
import Location from '../../components/Location/Location';

const Localiza = () => {
    return (
      <>
      <Header/>
      <main>
        <Location/>
      </main>
      <FooterTeacher/>
      </>
    );
  };
  
  export default Localiza;